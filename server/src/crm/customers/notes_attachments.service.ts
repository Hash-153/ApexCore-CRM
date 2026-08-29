/**
 * ApexCore Enterprise CRM - Customer Notes & Document Attachments Service
 * Provides rich markdown note keeping, note pinning, and document repository
 * metadata tracking for Contracts, Proposals, NDAs, and Security Reviews.
 */

import crypto from 'node:crypto';
import type { CRMDatabase } from '../database/crm_database.ts';
import type { CustomerNote, CustomerAttachment } from '../domain/types.ts';
import { AttachmentCategory, UserRole } from '../domain/enums.ts';

export class NotesAndAttachmentsService {
  private db: CRMDatabase;

  constructor(db: CRMDatabase) {
    this.db = db;
  }

  /**
   * Adds a markdown note to a customer record.
   */
  public addNote(
    customerId: string,
    data: {
      userId: string;
      authorName: string;
      authorRole?: UserRole;
      title: string;
      content: string;
      isPinned?: boolean;
      tags?: string[];
    },
    actorId: string = 'system'
  ): CustomerNote {
    const customer = this.db.customers.get(customerId);
    if (!customer) {
      throw new Error(`Customer not found with ID: ${customerId}`);
    }

    const now = new Date().toISOString();
    const noteId = `note_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    const note: CustomerNote = {
      id: noteId,
      tenantId: customer.tenantId,
      customerId,
      userId: data.userId,
      authorName: data.authorName,
      authorRole: data.authorRole || UserRole.SALES_REPRESENTATIVE,
      title: data.title,
      content: data.content,
      isPinned: !!data.isPinned,
      tags: data.tags || ['Customer Note'],
      createdAt: now,
      updatedAt: now,
      createdBy: actorId,
      updatedBy: actorId
    };

    this.db.indexNote(note);
    return note;
  }

  /**
   * Toggles the pinned status of a note.
   */
  public togglePinNote(noteId: string, actorId: string = 'system'): CustomerNote {
    const note = this.db.notes.get(noteId);
    if (!note) {
      throw new Error(`Note not found with ID: ${noteId}`);
    }

    note.isPinned = !note.isPinned;
    note.updatedAt = new Date().toISOString();
    note.updatedBy = actorId;

    this.db.indexNote(note);
    return note;
  }

  /**
   * Deletes a note.
   */
  public deleteNote(noteId: string, actorId: string = 'system'): boolean {
    const note = this.db.notes.get(noteId);
    if (!note) {
      throw new Error(`Note not found with ID: ${noteId}`);
    }

    note.isDeleted = true;
    note.updatedAt = new Date().toISOString();
    note.updatedBy = actorId;
    this.db.indexNote(note);
    return true;
  }

  /**
   * Registers a document attachment for a customer.
   */
  public addAttachment(
    customerId: string,
    data: {
      fileName: string;
      fileSize: number;
      mimeType: string;
      category?: AttachmentCategory;
      downloadUrl?: string;
      uploadedBy: string;
      uploaderName: string;
      version?: string;
    },
    actorId: string = 'system'
  ): CustomerAttachment {
    const customer = this.db.customers.get(customerId);
    if (!customer) {
      throw new Error(`Customer not found with ID: ${customerId}`);
    }

    const now = new Date().toISOString();
    const attachmentId = `att_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    const attachment: CustomerAttachment = {
      id: attachmentId,
      tenantId: customer.tenantId,
      customerId,
      fileName: data.fileName,
      fileSize: data.fileSize,
      mimeType: data.mimeType,
      category: data.category || AttachmentCategory.CONTRACT,
      downloadUrl: data.downloadUrl || `/api/crm/customers/${customerId}/attachments/${attachmentId}/download`,
      uploadedBy: data.uploadedBy,
      uploaderName: data.uploaderName,
      version: data.version || 'v1.0',
      checksumSha256: crypto.createHash('sha256').update(data.fileName + now).digest('hex'),
      createdAt: now,
      updatedAt: now,
      createdBy: actorId,
      updatedBy: actorId
    };

    this.db.indexAttachment(attachment);
    return attachment;
  }

  /**
   * Deletes an attachment.
   */
  public deleteAttachment(attachmentId: string, actorId: string = 'system'): boolean {
    const attachment = this.db.attachments.get(attachmentId);
    if (!attachment) {
      throw new Error(`Attachment not found with ID: ${attachmentId}`);
    }

    attachment.isDeleted = true;
    attachment.updatedAt = new Date().toISOString();
    attachment.updatedBy = actorId;
    this.db.indexAttachment(attachment);
    return true;
  }
}
