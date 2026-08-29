import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { CRMDatabase } from '../../src/crm/database/crm_database.ts';
import { seedCRMDatabase } from '../../src/crm/database/seed_data.ts';
import { CustomerService } from '../../src/crm/customers/customer.service.ts';
import { InteractionService } from '../../src/crm/customers/interaction.service.ts';
import { NotesAndAttachmentsService } from '../../src/crm/customers/notes_attachments.service.ts';
import { CustomerStatus, CustomerTier, CustomerLifecycleStage, InteractionType, AttachmentCategory } from '../../src/crm/domain/enums.ts';

describe('Customer Management & Customer 360 Subsystems', () => {
  let db: CRMDatabase;
  let customerService: CustomerService;
  let interactionService: InteractionService;
  let notesService: NotesAndAttachmentsService;

  beforeEach(() => {
    db = CRMDatabase.getInstance();
    seedCRMDatabase(db);
    customerService = new CustomerService(db);
    interactionService = new InteractionService(db);
    notesService = new NotesAndAttachmentsService(db);
  });

  it('should register a new customer with auto-generated customer number and initial health index', () => {
    const newCustomer = customerService.createCustomer({
      name: 'Apex Quantum Cloud Systems',
      domain: 'apexquantum.example.com',
      status: CustomerStatus.PROSPECT,
      tier: CustomerTier.TIER_2_KEY,
      industry: 'Enterprise Software',
      annualRevenue: 50000000,
      employeeCount: 400,
      ownerId: 'usr_marcus_vance',
      ownerName: 'Marcus Vance',
      phone: '+1 (555) 888-9999',
      email: 'contact@apexquantum.example.com',
      website: 'https://apexquantum.example.com'
    }, 'usr_marcus_vance');

    assert.ok(newCustomer.id.startsWith('cust_'));
    assert.ok(newCustomer.customerNumber.startsWith('CUST-2026-'));
    assert.equal(newCustomer.name, 'Apex Quantum Cloud Systems');
    assert.equal(newCustomer.status, CustomerStatus.PROSPECT);
    assert.equal(newCustomer.healthScore, 85);
  });

  it('should update customer details and manage status lifecycle transitions', () => {
    const updated = customerService.updateCustomer('acc_horizon_health', {
      annualRevenue: 520000000,
      employeeCount: 5000
    }, 'usr_marcus_vance');

    assert.equal(updated.annualRevenue, 520000000);
    assert.equal(updated.employeeCount, 5000);

    // Transition status to SUSPENDED
    const suspended = customerService.setCustomerStatus('acc_horizon_health', CustomerStatus.SUSPENDED, 'usr_admin_root');
    assert.equal(suspended.status, CustomerStatus.SUSPENDED);

    // Soft delete / deactivate
    customerService.deleteCustomer('acc_horizon_health', 'usr_admin_root');
    const cust = db.customers.get('acc_horizon_health')!;
    assert.equal(cust.isDeleted, true);
    assert.equal(cust.status, CustomerStatus.INACTIVE);
  });

  it('should aggregate full Customer 360 profile with contacts, deals, tickets, and notes', () => {
    const profile = customerService.getCustomerProfile('acc_vanguard_fintech');

    assert.equal(profile.customer.name, 'Vanguard FinTech Systems Corp');
    assert.ok(profile.contacts.length >= 1);
    assert.ok(profile.opportunities.length >= 1);
    assert.ok(Array.isArray(profile.interactions));
    assert.ok(Array.isArray(profile.notes));
    assert.ok(Array.isArray(profile.attachments));
  });

  it('should log customer interactions across multiple channels and update timeline', () => {
    const interaction = interactionService.logInteraction({
      customerId: 'acc_horizon_health',
      contactId: 'cnt_dr_rachel_stern',
      contactName: 'Dr. Rachel Stern',
      userId: 'usr_marcus_vance',
      userName: 'Marcus Vance',
      type: InteractionType.MEETING,
      subject: 'Annual Executive Contract Renewal Negotiation',
      description: 'Discussed 3-year term commitment with 15% tiered volume discount.',
      channel: 'ZOOM',
      durationMinutes: 45,
      sentiment: 'POSITIVE',
      outcome: 'Verbal commitment secured for 450 enterprise seats.'
    }, 'usr_marcus_vance');

    assert.ok(interaction.id.startsWith('int_'));
    assert.equal(interaction.subject, 'Annual Executive Contract Renewal Negotiation');

    const timeline = interactionService.getCustomerInteractions('acc_horizon_health');
    assert.ok(timeline.some(i => i.id === interaction.id));
  });

  it('should manage customer notes and document attachments with metadata', () => {
    // Add Note
    const note = notesService.addNote('acc_horizon_health', {
      userId: 'usr_marcus_vance',
      authorName: 'Marcus Vance',
      title: 'Executive Legal Review Notes',
      content: 'General Counsel reviewed standard NDA terms and approved indemnification clause.',
      isPinned: true
    }, 'usr_marcus_vance');

    assert.ok(note.id.startsWith('note_'));
    assert.equal(note.isPinned, true);

    // Toggle Pin
    notesService.togglePinNote(note.id, 'usr_marcus_vance');
    const toggled = db.notes.get(note.id)!;
    assert.equal(toggled.isPinned, false);

    // Add Attachment
    const att = notesService.addAttachment('acc_horizon_health', {
      fileName: 'Signed_Enterprise_Master_Agreement_2026.pdf',
      fileSize: 3200000,
      mimeType: 'application/pdf',
      category: AttachmentCategory.CONTRACT,
      uploadedBy: 'usr_marcus_vance',
      uploaderName: 'Marcus Vance'
    }, 'usr_marcus_vance');

    assert.ok(att.id.startsWith('att_'));
    assert.equal(att.fileName, 'Signed_Enterprise_Master_Agreement_2026.pdf');
    assert.ok(att.checksumSha256?.length === 64);
  });
});
