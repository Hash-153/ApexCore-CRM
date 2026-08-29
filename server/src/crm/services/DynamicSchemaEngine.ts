/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Dynamic Schema & Runtime Entity Customizer
 *
 * Enables dynamic custom field registration, type validation (Text, Currency, Picklists),
 * dropdown enumeration enforcement, and layout metadata management.
 */

import { CRMDatabase } from '../database/crm_database.ts';
import { FieldDataType } from '../domain/enums.ts';
import type { CustomFieldDefinition, CustomFieldValues } from '../domain/types.ts';

export interface FieldValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValues: CustomFieldValues;
}

export class DynamicSchemaEngine {
  private db: CRMDatabase;

  constructor(db?: CRMDatabase) {
    this.db = db || CRMDatabase.getInstance();
  }

  /**
   * Registers a new custom field definition at runtime without database migrations.
   */
  public registerCustomField(params: {
    tenantId: string;
    targetEntity: 'LEAD' | 'ACCOUNT' | 'CONTACT' | 'OPPORTUNITY' | 'TICKET';
    fieldName: string;
    fieldKey: string;
    dataType: FieldDataType;
    isRequired?: boolean;
    defaultValue?: string | number | boolean;
    dropdownOptions?: string[];
    helpText?: string;
    actorId: string;
  }): CustomFieldDefinition {
    const id = `cf_${params.targetEntity.toLowerCase()}_${params.fieldKey}`;
    const now = new Date().toISOString();

    const definition: CustomFieldDefinition = {
      id,
      tenantId: params.tenantId,
      targetEntity: params.targetEntity,
      fieldName: params.fieldName,
      fieldKey: params.fieldKey,
      dataType: params.dataType,
      isRequired: params.isRequired || false,
      defaultValue: params.defaultValue,
      dropdownOptions: params.dropdownOptions,
      helpText: params.helpText,
      orderIndex: this.db.customFields.size + 1,
      createdAt: now,
      updatedAt: now,
      createdBy: params.actorId,
      updatedBy: params.actorId
    };

    this.db.customFields.set(definition.id, definition);
    return definition;
  }

  /**
   * Validates custom field inputs against registered schema rules.
   */
  public validateCustomFields(
    targetEntity: 'LEAD' | 'ACCOUNT' | 'CONTACT' | 'OPPORTUNITY' | 'TICKET',
    tenantId: string,
    rawValues: CustomFieldValues
  ): FieldValidationResult {
    const errors: string[] = [];
    const sanitizedValues: CustomFieldValues = {};

    const definitions = Array.from(this.db.customFields.values()).filter(
      d => d.tenantId === tenantId && d.targetEntity === targetEntity
    );

    for (const def of definitions) {
      const val = rawValues[def.fieldKey] !== undefined ? rawValues[def.fieldKey] : def.defaultValue;

      if (def.isRequired && (val === undefined || val === null || val === '')) {
        errors.push(`Custom field "${def.fieldName}" (${def.fieldKey}) is required.`);
        continue;
      }

      if (val === undefined || val === null) continue;

      switch (def.dataType) {
        case FieldDataType.NUMBER:
        case FieldDataType.CURRENCY:
        case FieldDataType.PERCENTAGE: {
          const num = Number(val);
          if (isNaN(num)) {
            errors.push(`Field "${def.fieldName}" must be a valid number.`);
          } else {
            sanitizedValues[def.fieldKey] = num;
          }
          break;
        }

        case FieldDataType.BOOLEAN: {
          sanitizedValues[def.fieldKey] = Boolean(val);
          break;
        }

        case FieldDataType.ENUM_DROPDOWN: {
          if (def.dropdownOptions && def.dropdownOptions.length > 0) {
            if (!def.dropdownOptions.includes(String(val))) {
              errors.push(`Value "${val}" is not allowed for "${def.fieldName}". Allowed: ${def.dropdownOptions.join(', ')}`);
            } else {
              sanitizedValues[def.fieldKey] = String(val);
            }
          } else {
            sanitizedValues[def.fieldKey] = String(val);
          }
          break;
        }

        default:
          sanitizedValues[def.fieldKey] = String(val);
          break;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      sanitizedValues
    };
  }
}
