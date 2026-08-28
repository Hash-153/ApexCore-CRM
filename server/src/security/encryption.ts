/**
 * Cryptographic helpers and PHI masking utilities
 */

import crypto from 'crypto';
import { config } from '../config/index.ts';

export class EncryptionService {
  private static algorithm = 'aes-256-gcm';

  /**
   * Mask Social Security Number (displays only last 4 digits)
   */
  public static maskSSN(ssn?: string): string {
    if (!ssn) return '***-**-****';
    const digits = ssn.replace(/\D/g, '');
    if (digits.length < 4) return '***-**-****';
    return `***-**-${digits.slice(-4)}`;
  }

  /**
   * Mask Phone Number (displays only last 4 digits)
   */
  public static maskPhone(phone?: string): string {
    if (!phone) return '(***) ***-****';
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 4) return '(***) ***-****';
    return `(***) ***-${digits.slice(-4)}`;
  }

  /**
   * Mask Email Address (e.g. j***e@domain.com)
   */
  public static maskEmail(email?: string): string {
    if (!email || !email.includes('@')) return '***@***.***';
    const [local, domain] = email.split('@');
    if (local.length <= 2) {
      return `${local[0]}*@${domain}`;
    }
    return `${local[0]}${'*'.repeat(local.length - 2)}${local.slice(-1)}@${domain}`;
  }

  /**
   * Mask Medical Record Number (MRN)
   */
  public static maskMRN(mrn?: string): string {
    if (!mrn) return 'MRN-******';
    if (mrn.length <= 4) return 'MRN-****';
    return `MRN-***${mrn.slice(-4)}`;
  }

  /**
   * Encrypt sensitive string payload using AES-256-GCM
   */
  public static encrypt(text: string): { iv: string; content: string; tag: string } {
    const iv = crypto.randomBytes(16);
    const key = crypto.scryptSync(config.security.phiEncryptionKey, 'medicore_salt', 32);
    const cipher = crypto.createCipheriv(this.algorithm, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = cipher.getAuthTag().toString('hex');

    return {
      iv: iv.toString('hex'),
      content: encrypted,
      tag,
    };
  }

  /**
   * Decrypt sensitive string payload using AES-256-GCM
   */
  public static decrypt(encrypted: { iv: string; content: string; tag: string }): string {
    const iv = Buffer.from(encrypted.iv, 'hex');
    const tag = Buffer.from(encrypted.tag, 'hex');
    const key = crypto.scryptSync(config.security.phiEncryptionKey, 'medicore_salt', 32);
    const decipher = crypto.createDecipheriv(this.algorithm, key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encrypted.content, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
