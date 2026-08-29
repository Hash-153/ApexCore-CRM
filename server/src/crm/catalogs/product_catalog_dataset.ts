/**
 * ApexCore Enterprise CRM - Global Product Master & SKU Catalog Dataset
 * Standardized pricing matrices, consumption metrics, feature entitlement lists,
 * volume tier discount schedules, and margin floor price constraints.
 */

export interface EnterpriseSkuSpecification {
  sku: string;
  familyCode: string;
  name: string;
  description: string;
  category: string;
  unitListPriceUSD: number;
  floorPriceUSD: number;
  billingUnit: string;
  billingFrequency: string;
  taxCode: string;
  isAddonOnly: boolean;
  minContractDurationMonths: number;
  includedFeatures: string[];
  volumeDiscountTiers: { minQty: number; maxQty?: number; discountPercent: number }[];
  serviceLevelTier: string;
}

export const GLOBAL_PRODUCT_MASTER_CATALOG: EnterpriseSkuSpecification[] = [
  {
    sku: 'SKU-APEX_CORE_CRM-V1',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 1).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 1450,
    floorPriceUSD: 1088,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V2',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 2).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 1700,
    floorPriceUSD: 1275,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V3',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 3).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 1950,
    floorPriceUSD: 1463,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V4',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 4).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 2200,
    floorPriceUSD: 1650,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V5',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 5).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 2450,
    floorPriceUSD: 1838,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V6',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 6).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 2700,
    floorPriceUSD: 2025,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V7',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 7).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 2950,
    floorPriceUSD: 2213,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V8',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 8).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 3200,
    floorPriceUSD: 2400,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V9',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 9).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 3450,
    floorPriceUSD: 2588,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V10',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 10).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 3700,
    floorPriceUSD: 2775,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V11',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 11).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 3950,
    floorPriceUSD: 2963,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V12',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 12).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 4200,
    floorPriceUSD: 3150,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V13',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 13).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 4450,
    floorPriceUSD: 3338,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V14',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 14).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 4700,
    floorPriceUSD: 3525,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V15',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 15).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 4950,
    floorPriceUSD: 3713,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V16',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 16).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 5200,
    floorPriceUSD: 3900,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V17',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 17).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 5450,
    floorPriceUSD: 4088,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V18',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 18).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 5700,
    floorPriceUSD: 4275,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V19',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 19).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 5950,
    floorPriceUSD: 4463,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V20',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 20).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 6200,
    floorPriceUSD: 4650,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V21',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 21).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 6450,
    floorPriceUSD: 4838,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V22',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 22).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 6700,
    floorPriceUSD: 5025,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V23',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 23).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 6950,
    floorPriceUSD: 5213,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V24',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 24).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 7200,
    floorPriceUSD: 5400,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V25',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 25).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 7450,
    floorPriceUSD: 5588,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V26',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 26).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 7700,
    floorPriceUSD: 5775,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V27',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 27).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 7950,
    floorPriceUSD: 5963,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V28',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 28).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 8200,
    floorPriceUSD: 6150,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V29',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 29).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 8450,
    floorPriceUSD: 6338,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V30',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 30).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 8700,
    floorPriceUSD: 6525,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V31',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 31).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 8950,
    floorPriceUSD: 6713,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V32',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 32).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 9200,
    floorPriceUSD: 6900,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V33',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 33).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 9450,
    floorPriceUSD: 7088,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V34',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 34).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 9700,
    floorPriceUSD: 7275,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V35',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 35).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 9950,
    floorPriceUSD: 7463,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V36',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 36).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 10200,
    floorPriceUSD: 7650,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V37',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 37).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 10450,
    floorPriceUSD: 7838,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V38',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 38).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 10700,
    floorPriceUSD: 8025,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V39',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 39).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 10950,
    floorPriceUSD: 8213,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V40',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 40).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 11200,
    floorPriceUSD: 8400,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V41',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 41).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 11450,
    floorPriceUSD: 8588,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CORE_CRM-V42',
    familyCode: 'APEX_CORE_CRM',
    name: 'ApexCore CRM Core Platform Seats - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CRM Core Platform Seats (Configuration Profile 42).',
    category: 'ApexCore CRM Core Platform Seats',
    unitListPriceUSD: 11700,
    floorPriceUSD: 8775,
    billingUnit: 'PER_USER_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V1',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 1).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 18250,
    floorPriceUSD: 13688,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V2',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 2).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 18500,
    floorPriceUSD: 13875,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V3',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 3).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 18750,
    floorPriceUSD: 14063,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V4',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 4).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 19000,
    floorPriceUSD: 14250,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V5',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 5).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 19250,
    floorPriceUSD: 14438,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V6',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 6).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 19500,
    floorPriceUSD: 14625,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V7',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 7).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 19750,
    floorPriceUSD: 14813,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V8',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 8).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 20000,
    floorPriceUSD: 15000,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V9',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 9).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 20250,
    floorPriceUSD: 15188,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V10',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 10).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 20500,
    floorPriceUSD: 15375,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V11',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 11).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 20750,
    floorPriceUSD: 15563,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V12',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 12).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 21000,
    floorPriceUSD: 15750,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V13',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 13).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 21250,
    floorPriceUSD: 15938,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V14',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 14).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 21500,
    floorPriceUSD: 16125,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V15',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 15).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 21750,
    floorPriceUSD: 16313,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V16',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 16).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 22000,
    floorPriceUSD: 16500,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V17',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 17).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 22250,
    floorPriceUSD: 16688,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V18',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 18).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 22500,
    floorPriceUSD: 16875,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V19',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 19).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 22750,
    floorPriceUSD: 17063,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V20',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 20).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 23000,
    floorPriceUSD: 17250,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V21',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 21).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 23250,
    floorPriceUSD: 17438,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V22',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 22).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 23500,
    floorPriceUSD: 17625,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V23',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 23).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 23750,
    floorPriceUSD: 17813,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V24',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 24).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 24000,
    floorPriceUSD: 18000,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V25',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 25).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 24250,
    floorPriceUSD: 18188,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V26',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 26).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 24500,
    floorPriceUSD: 18375,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V27',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 27).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 24750,
    floorPriceUSD: 18563,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V28',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 28).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 25000,
    floorPriceUSD: 18750,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V29',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 29).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 25250,
    floorPriceUSD: 18938,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V30',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 30).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 25500,
    floorPriceUSD: 19125,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V31',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 31).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 25750,
    floorPriceUSD: 19313,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V32',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 32).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 26000,
    floorPriceUSD: 19500,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V33',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 33).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 26250,
    floorPriceUSD: 19688,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V34',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 34).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 26500,
    floorPriceUSD: 19875,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V35',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 35).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 26750,
    floorPriceUSD: 20063,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V36',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 36).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 27000,
    floorPriceUSD: 20250,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V37',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 37).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 27250,
    floorPriceUSD: 20438,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V38',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 38).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 27500,
    floorPriceUSD: 20625,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V39',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 39).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 27750,
    floorPriceUSD: 20813,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V40',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 40).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 28000,
    floorPriceUSD: 21000,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V41',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 41).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 28250,
    floorPriceUSD: 21188,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_CPQ_ENGINE-V42',
    familyCode: 'APEX_CPQ_ENGINE',
    name: 'ApexCore CPQ & Revenue Optimization Engine - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore CPQ & Revenue Optimization Engine (Configuration Profile 42).',
    category: 'ApexCore CPQ & Revenue Optimization Engine',
    unitListPriceUSD: 28500,
    floorPriceUSD: 21375,
    billingUnit: 'PER_INSTANCE_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V1',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 1).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 1150,
    floorPriceUSD: 863,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V2',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 2).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 1400,
    floorPriceUSD: 1050,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V3',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 3).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 1650,
    floorPriceUSD: 1238,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V4',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 4).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 1900,
    floorPriceUSD: 1425,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V5',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 5).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 2150,
    floorPriceUSD: 1613,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V6',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 6).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 2400,
    floorPriceUSD: 1800,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V7',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 7).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 2650,
    floorPriceUSD: 1988,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V8',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 8).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 2900,
    floorPriceUSD: 2175,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V9',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 9).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 3150,
    floorPriceUSD: 2363,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V10',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 10).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 3400,
    floorPriceUSD: 2550,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V11',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 11).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 3650,
    floorPriceUSD: 2738,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V12',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 12).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 3900,
    floorPriceUSD: 2925,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V13',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 13).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 4150,
    floorPriceUSD: 3113,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V14',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 14).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 4400,
    floorPriceUSD: 3300,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V15',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 15).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 4650,
    floorPriceUSD: 3488,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V16',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 16).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 4900,
    floorPriceUSD: 3675,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V17',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 17).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 5150,
    floorPriceUSD: 3863,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V18',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 18).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 5400,
    floorPriceUSD: 4050,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V19',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 19).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 5650,
    floorPriceUSD: 4238,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V20',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 20).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 5900,
    floorPriceUSD: 4425,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V21',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 21).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 6150,
    floorPriceUSD: 4613,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V22',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 22).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 6400,
    floorPriceUSD: 4800,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V23',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 23).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 6650,
    floorPriceUSD: 4988,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V24',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 24).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 6900,
    floorPriceUSD: 5175,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V25',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 25).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 7150,
    floorPriceUSD: 5363,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V26',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 26).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 7400,
    floorPriceUSD: 5550,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V27',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 27).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 7650,
    floorPriceUSD: 5738,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V28',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 28).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 7900,
    floorPriceUSD: 5925,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V29',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 29).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 8150,
    floorPriceUSD: 6113,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V30',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 30).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 8400,
    floorPriceUSD: 6300,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V31',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 31).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 8650,
    floorPriceUSD: 6488,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V32',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 32).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 8900,
    floorPriceUSD: 6675,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V33',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 33).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 9150,
    floorPriceUSD: 6863,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V34',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 34).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 9400,
    floorPriceUSD: 7050,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V35',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 35).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 9650,
    floorPriceUSD: 7238,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V36',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 36).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 9900,
    floorPriceUSD: 7425,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V37',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 37).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 10150,
    floorPriceUSD: 7613,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V38',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 38).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 10400,
    floorPriceUSD: 7800,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V39',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 39).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 10650,
    floorPriceUSD: 7988,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V40',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 40).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 10900,
    floorPriceUSD: 8175,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V41',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 41).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 11150,
    floorPriceUSD: 8363,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_HELPDESK_SLA-V42',
    familyCode: 'APEX_HELPDESK_SLA',
    name: 'ApexCore Omnichannel Support & SLA Suite - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Omnichannel Support & SLA Suite (Configuration Profile 42).',
    category: 'ApexCore Omnichannel Support & SLA Suite',
    unitListPriceUSD: 11400,
    floorPriceUSD: 8550,
    billingUnit: 'PER_AGENT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V1',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 1).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 24250,
    floorPriceUSD: 18188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V2',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 2).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 24500,
    floorPriceUSD: 18375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V3',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 3).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 24750,
    floorPriceUSD: 18563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V4',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 4).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 25000,
    floorPriceUSD: 18750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V5',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 5).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 25250,
    floorPriceUSD: 18938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V6',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 6).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 25500,
    floorPriceUSD: 19125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V7',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 7).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 25750,
    floorPriceUSD: 19313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V8',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 8).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 26000,
    floorPriceUSD: 19500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V9',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 9).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 26250,
    floorPriceUSD: 19688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V10',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 10).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 26500,
    floorPriceUSD: 19875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V11',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 11).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 26750,
    floorPriceUSD: 20063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V12',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 12).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 27000,
    floorPriceUSD: 20250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V13',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 13).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 27250,
    floorPriceUSD: 20438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V14',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 14).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 27500,
    floorPriceUSD: 20625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V15',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 15).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 27750,
    floorPriceUSD: 20813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V16',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 16).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 28000,
    floorPriceUSD: 21000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V17',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 17).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 28250,
    floorPriceUSD: 21188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V18',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 18).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 28500,
    floorPriceUSD: 21375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V19',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 19).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 28750,
    floorPriceUSD: 21563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V20',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 20).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 29000,
    floorPriceUSD: 21750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V21',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 21).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 29250,
    floorPriceUSD: 21938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V22',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 22).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 29500,
    floorPriceUSD: 22125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V23',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 23).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 29750,
    floorPriceUSD: 22313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V24',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 24).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 30000,
    floorPriceUSD: 22500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V25',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 25).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 30250,
    floorPriceUSD: 22688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V26',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 26).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 30500,
    floorPriceUSD: 22875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V27',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 27).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 30750,
    floorPriceUSD: 23063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V28',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 28).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 31000,
    floorPriceUSD: 23250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V29',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 29).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 31250,
    floorPriceUSD: 23438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V30',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 30).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 31500,
    floorPriceUSD: 23625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V31',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 31).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 31750,
    floorPriceUSD: 23813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V32',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 32).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 32000,
    floorPriceUSD: 24000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V33',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 33).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 32250,
    floorPriceUSD: 24188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V34',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 34).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 32500,
    floorPriceUSD: 24375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V35',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 35).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 32750,
    floorPriceUSD: 24563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V36',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 36).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 33000,
    floorPriceUSD: 24750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V37',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 37).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 33250,
    floorPriceUSD: 24938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V38',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 38).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 33500,
    floorPriceUSD: 25125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V39',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 39).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 33750,
    floorPriceUSD: 25313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V40',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 40).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 34000,
    floorPriceUSD: 25500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V41',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 41).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 34250,
    floorPriceUSD: 25688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_MARKETING_ABM-V42',
    familyCode: 'APEX_MARKETING_ABM',
    name: 'ApexCore Marketing Attribution & ABM Cloud - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Marketing Attribution & ABM Cloud (Configuration Profile 42).',
    category: 'ApexCore Marketing Attribution & ABM Cloud',
    unitListPriceUSD: 34500,
    floorPriceUSD: 25875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V1',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 1).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 15250,
    floorPriceUSD: 11438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V2',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 2).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 15500,
    floorPriceUSD: 11625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V3',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 3).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 15750,
    floorPriceUSD: 11813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V4',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 4).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 16000,
    floorPriceUSD: 12000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V5',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 5).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 16250,
    floorPriceUSD: 12188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V6',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 6).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 16500,
    floorPriceUSD: 12375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V7',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 7).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 16750,
    floorPriceUSD: 12563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V8',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 8).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 17000,
    floorPriceUSD: 12750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V9',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 9).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 17250,
    floorPriceUSD: 12938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V10',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 10).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 17500,
    floorPriceUSD: 13125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V11',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 11).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 17750,
    floorPriceUSD: 13313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V12',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 12).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 18000,
    floorPriceUSD: 13500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V13',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 13).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 18250,
    floorPriceUSD: 13688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V14',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 14).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 18500,
    floorPriceUSD: 13875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V15',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 15).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 18750,
    floorPriceUSD: 14063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V16',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 16).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 19000,
    floorPriceUSD: 14250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V17',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 17).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 19250,
    floorPriceUSD: 14438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V18',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 18).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 19500,
    floorPriceUSD: 14625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V19',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 19).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 19750,
    floorPriceUSD: 14813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V20',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 20).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 20000,
    floorPriceUSD: 15000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V21',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 21).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 20250,
    floorPriceUSD: 15188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V22',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 22).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 20500,
    floorPriceUSD: 15375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V23',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 23).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 20750,
    floorPriceUSD: 15563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V24',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 24).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 21000,
    floorPriceUSD: 15750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V25',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 25).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 21250,
    floorPriceUSD: 15938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V26',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 26).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 21500,
    floorPriceUSD: 16125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V27',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 27).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 21750,
    floorPriceUSD: 16313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V28',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 28).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 22000,
    floorPriceUSD: 16500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V29',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 29).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 22250,
    floorPriceUSD: 16688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V30',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 30).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 22500,
    floorPriceUSD: 16875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V31',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 31).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 22750,
    floorPriceUSD: 17063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V32',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 32).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 23000,
    floorPriceUSD: 17250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V33',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 33).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 23250,
    floorPriceUSD: 17438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V34',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 34).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 23500,
    floorPriceUSD: 17625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V35',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 35).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 23750,
    floorPriceUSD: 17813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V36',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 36).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 24000,
    floorPriceUSD: 18000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V37',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 37).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 24250,
    floorPriceUSD: 18188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V38',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 38).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 24500,
    floorPriceUSD: 18375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V39',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 39).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 24750,
    floorPriceUSD: 18563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V40',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 40).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 25000,
    floorPriceUSD: 18750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V41',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 41).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 25250,
    floorPriceUSD: 18938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_WORKFLOW_AI-V42',
    familyCode: 'APEX_WORKFLOW_AI',
    name: 'ApexCore Automated Workflow & Orchestration - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Automated Workflow & Orchestration (Configuration Profile 42).',
    category: 'ApexCore Automated Workflow & Orchestration',
    unitListPriceUSD: 25500,
    floorPriceUSD: 19125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V1',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 1).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 12750,
    floorPriceUSD: 9563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V2',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 2).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 13000,
    floorPriceUSD: 9750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V3',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 3).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 13250,
    floorPriceUSD: 9938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V4',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 4).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 13500,
    floorPriceUSD: 10125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V5',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 5).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 13750,
    floorPriceUSD: 10313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V6',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 6).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 14000,
    floorPriceUSD: 10500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V7',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 7).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 14250,
    floorPriceUSD: 10688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V8',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 8).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 14500,
    floorPriceUSD: 10875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V9',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 9).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 14750,
    floorPriceUSD: 11063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V10',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 10).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 15000,
    floorPriceUSD: 11250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V11',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 11).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 15250,
    floorPriceUSD: 11438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V12',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 12).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 15500,
    floorPriceUSD: 11625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V13',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 13).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 15750,
    floorPriceUSD: 11813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V14',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 14).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 16000,
    floorPriceUSD: 12000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V15',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 15).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 16250,
    floorPriceUSD: 12188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V16',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 16).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 16500,
    floorPriceUSD: 12375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V17',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 17).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 16750,
    floorPriceUSD: 12563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V18',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 18).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 17000,
    floorPriceUSD: 12750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V19',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 19).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 17250,
    floorPriceUSD: 12938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V20',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 20).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 17500,
    floorPriceUSD: 13125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V21',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 21).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 17750,
    floorPriceUSD: 13313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V22',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 22).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 18000,
    floorPriceUSD: 13500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V23',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 23).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 18250,
    floorPriceUSD: 13688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V24',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 24).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 18500,
    floorPriceUSD: 13875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V25',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 25).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 18750,
    floorPriceUSD: 14063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V26',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 26).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 19000,
    floorPriceUSD: 14250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V27',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 27).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 19250,
    floorPriceUSD: 14438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V28',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 28).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 19500,
    floorPriceUSD: 14625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V29',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 29).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 19750,
    floorPriceUSD: 14813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V30',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 30).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 20000,
    floorPriceUSD: 15000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V31',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 31).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 20250,
    floorPriceUSD: 15188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V32',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 32).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 20500,
    floorPriceUSD: 15375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V33',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 33).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 20750,
    floorPriceUSD: 15563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V34',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 34).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 21000,
    floorPriceUSD: 15750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V35',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 35).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 21250,
    floorPriceUSD: 15938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V36',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 36).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 21500,
    floorPriceUSD: 16125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V37',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 37).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 21750,
    floorPriceUSD: 16313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V38',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 38).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 22000,
    floorPriceUSD: 16500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V39',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 39).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 22250,
    floorPriceUSD: 16688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V40',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 40).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 22500,
    floorPriceUSD: 16875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V41',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 41).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 22750,
    floorPriceUSD: 17063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_SECURITY_AUDIT-V42',
    familyCode: 'APEX_SECURITY_AUDIT',
    name: 'ApexCore Cryptographic Audit & Compliance Shield - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Cryptographic Audit & Compliance Shield (Configuration Profile 42).',
    category: 'ApexCore Cryptographic Audit & Compliance Shield',
    unitListPriceUSD: 23000,
    floorPriceUSD: 17250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V1',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 1).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 8250,
    floorPriceUSD: 6188,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V2',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 2).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 8500,
    floorPriceUSD: 6375,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V3',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 3).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 8750,
    floorPriceUSD: 6563,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V4',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 4).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 9000,
    floorPriceUSD: 6750,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V5',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 5).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 9250,
    floorPriceUSD: 6938,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V6',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 6).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 9500,
    floorPriceUSD: 7125,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V7',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 7).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 9750,
    floorPriceUSD: 7313,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V8',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 8).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 10000,
    floorPriceUSD: 7500,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V9',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 9).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 10250,
    floorPriceUSD: 7688,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V10',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 10).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 10500,
    floorPriceUSD: 7875,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V11',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 11).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 10750,
    floorPriceUSD: 8063,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V12',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 12).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 11000,
    floorPriceUSD: 8250,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V13',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 13).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 11250,
    floorPriceUSD: 8438,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V14',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 14).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 11500,
    floorPriceUSD: 8625,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V15',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 15).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 11750,
    floorPriceUSD: 8813,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V16',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 16).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 12000,
    floorPriceUSD: 9000,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V17',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 17).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 12250,
    floorPriceUSD: 9188,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V18',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 18).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 12500,
    floorPriceUSD: 9375,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V19',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 19).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 12750,
    floorPriceUSD: 9563,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V20',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 20).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 13000,
    floorPriceUSD: 9750,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V21',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 21).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 13250,
    floorPriceUSD: 9938,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V22',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 22).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 13500,
    floorPriceUSD: 10125,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V23',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 23).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 13750,
    floorPriceUSD: 10313,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V24',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 24).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 14000,
    floorPriceUSD: 10500,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V25',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 25).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 14250,
    floorPriceUSD: 10688,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V26',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 26).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 14500,
    floorPriceUSD: 10875,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V27',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 27).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 14750,
    floorPriceUSD: 11063,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V28',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 28).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 15000,
    floorPriceUSD: 11250,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V29',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 29).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 15250,
    floorPriceUSD: 11438,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V30',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 30).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 15500,
    floorPriceUSD: 11625,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V31',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 31).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 15750,
    floorPriceUSD: 11813,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V32',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 32).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 16000,
    floorPriceUSD: 12000,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V33',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 33).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 16250,
    floorPriceUSD: 12188,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V34',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 34).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 16500,
    floorPriceUSD: 12375,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V35',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 35).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 16750,
    floorPriceUSD: 12563,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V36',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 36).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 17000,
    floorPriceUSD: 12750,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V37',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 37).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 17250,
    floorPriceUSD: 12938,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V38',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 38).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 17500,
    floorPriceUSD: 13125,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V39',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 39).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 17750,
    floorPriceUSD: 13313,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V40',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 40).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 18000,
    floorPriceUSD: 13500,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V41',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 41).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 18250,
    floorPriceUSD: 13688,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_API_CONNECTOR-V42',
    familyCode: 'APEX_API_CONNECTOR',
    name: 'ApexCore Enterprise Data Integration Gateway - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Data Integration Gateway (Configuration Profile 42).',
    category: 'ApexCore Enterprise Data Integration Gateway',
    unitListPriceUSD: 18500,
    floorPriceUSD: 13875,
    billingUnit: 'PER_GATEWAY_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V1',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 1).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 14250,
    floorPriceUSD: 10688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V2',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 2).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 14500,
    floorPriceUSD: 10875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V3',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 3).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 14750,
    floorPriceUSD: 11063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V4',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 4).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 15000,
    floorPriceUSD: 11250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V5',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 5).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 15250,
    floorPriceUSD: 11438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V6',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 6).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 15500,
    floorPriceUSD: 11625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V7',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 7).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 15750,
    floorPriceUSD: 11813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V8',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 8).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 16000,
    floorPriceUSD: 12000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V9',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 9).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 16250,
    floorPriceUSD: 12188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V10',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 10).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 16500,
    floorPriceUSD: 12375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V11',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 11).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 16750,
    floorPriceUSD: 12563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V12',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 12).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 17000,
    floorPriceUSD: 12750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V13',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 13).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 17250,
    floorPriceUSD: 12938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V14',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 14).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 17500,
    floorPriceUSD: 13125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V15',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 15).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 17750,
    floorPriceUSD: 13313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V16',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 16).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 18000,
    floorPriceUSD: 13500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V17',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 17).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 18250,
    floorPriceUSD: 13688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V18',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 18).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 18500,
    floorPriceUSD: 13875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V19',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 19).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 18750,
    floorPriceUSD: 14063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V20',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 20).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 19000,
    floorPriceUSD: 14250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V21',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 21).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 19250,
    floorPriceUSD: 14438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V22',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 22).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 19500,
    floorPriceUSD: 14625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V23',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 23).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 19750,
    floorPriceUSD: 14813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V24',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 24).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 20000,
    floorPriceUSD: 15000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V25',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 25).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 20250,
    floorPriceUSD: 15188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V26',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 26).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 20500,
    floorPriceUSD: 15375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V27',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 27).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 20750,
    floorPriceUSD: 15563,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V28',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 28).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 21000,
    floorPriceUSD: 15750,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V29',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 29).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 21250,
    floorPriceUSD: 15938,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V30',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 30).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 21500,
    floorPriceUSD: 16125,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V31',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 31).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 21750,
    floorPriceUSD: 16313,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V32',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 32).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 22000,
    floorPriceUSD: 16500,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V33',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 33).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 22250,
    floorPriceUSD: 16688,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V34',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 34).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 22500,
    floorPriceUSD: 16875,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V35',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 35).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 22750,
    floorPriceUSD: 17063,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V36',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 36).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 23000,
    floorPriceUSD: 17250,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V37',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 37).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 23250,
    floorPriceUSD: 17438,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V38',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 38).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 23500,
    floorPriceUSD: 17625,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V39',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 39).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 23750,
    floorPriceUSD: 17813,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V40',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 40).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 24000,
    floorPriceUSD: 18000,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V41',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 41).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 24250,
    floorPriceUSD: 18188,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ANALYTICS_BI-V42',
    familyCode: 'APEX_ANALYTICS_BI',
    name: 'ApexCore Executive Revenue BI & Forecasting - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Executive Revenue BI & Forecasting (Configuration Profile 42).',
    category: 'ApexCore Executive Revenue BI & Forecasting',
    unitListPriceUSD: 24500,
    floorPriceUSD: 18375,
    billingUnit: 'PER_TENANT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V1',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 1).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 36250,
    floorPriceUSD: 27188,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V2',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 2).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 36500,
    floorPriceUSD: 27375,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V3',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 3).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 36750,
    floorPriceUSD: 27563,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V4',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 4).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 37000,
    floorPriceUSD: 27750,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V5',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 5).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 37250,
    floorPriceUSD: 27938,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V6',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 6).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 37500,
    floorPriceUSD: 28125,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V7',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 7).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 37750,
    floorPriceUSD: 28313,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V8',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 8).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 38000,
    floorPriceUSD: 28500,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V9',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 9).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 38250,
    floorPriceUSD: 28688,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V10',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 10).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 38500,
    floorPriceUSD: 28875,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V11',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 11).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 38750,
    floorPriceUSD: 29063,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V12',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 12).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 39000,
    floorPriceUSD: 29250,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V13',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 13).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 39250,
    floorPriceUSD: 29438,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V14',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 14).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 39500,
    floorPriceUSD: 29625,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V15',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 15).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 39750,
    floorPriceUSD: 29813,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V16',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 16).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 40000,
    floorPriceUSD: 30000,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V17',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 17).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 40250,
    floorPriceUSD: 30188,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V18',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 18).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 40500,
    floorPriceUSD: 30375,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V19',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 19).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 40750,
    floorPriceUSD: 30563,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V20',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 20).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 41000,
    floorPriceUSD: 30750,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V21',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 21).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 41250,
    floorPriceUSD: 30938,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V22',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 22).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 41500,
    floorPriceUSD: 31125,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V23',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 23).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 41750,
    floorPriceUSD: 31313,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V24',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 24).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 42000,
    floorPriceUSD: 31500,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V25',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 25).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 42250,
    floorPriceUSD: 31688,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V26',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 26).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 42500,
    floorPriceUSD: 31875,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V27',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 27).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 42750,
    floorPriceUSD: 32063,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V28',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 28).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 43000,
    floorPriceUSD: 32250,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V29',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 29).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 43250,
    floorPriceUSD: 32438,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V30',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 30).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 43500,
    floorPriceUSD: 32625,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V31',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 31).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 43750,
    floorPriceUSD: 32813,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V32',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 32).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 44000,
    floorPriceUSD: 33000,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V33',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 33).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 44250,
    floorPriceUSD: 33188,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V34',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 34).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 44500,
    floorPriceUSD: 33375,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V35',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 35).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 44750,
    floorPriceUSD: 33563,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V36',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 36).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 45000,
    floorPriceUSD: 33750,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V37',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 37).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 45250,
    floorPriceUSD: 33938,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V38',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 38).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 45500,
    floorPriceUSD: 34125,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V39',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 39).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 45750,
    floorPriceUSD: 34313,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V40',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 40).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 46000,
    floorPriceUSD: 34500,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V41',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 41).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 46250,
    floorPriceUSD: 34688,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_ENTERPRISE_SLA-V42',
    familyCode: 'APEX_ENTERPRISE_SLA',
    name: '24/7/365 Platinum Mission-Critical Support - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for 24/7/365 Platinum Mission-Critical Support (Configuration Profile 42).',
    category: '24/7/365 Platinum Mission-Critical Support',
    unitListPriceUSD: 46500,
    floorPriceUSD: 34875,
    billingUnit: 'PER_CONTRACT_ANNUAL',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V1',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 1',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 1).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 25250,
    floorPriceUSD: 18938,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V2',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 2',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 2).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 25500,
    floorPriceUSD: 19125,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V3',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 3',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 3).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 25750,
    floorPriceUSD: 19313,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V4',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 4',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 4).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 26000,
    floorPriceUSD: 19500,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V5',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 5',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 5).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 26250,
    floorPriceUSD: 19688,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V6',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 6',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 6).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 26500,
    floorPriceUSD: 19875,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V7',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 7',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 7).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 26750,
    floorPriceUSD: 20063,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V8',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 8',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 8).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 27000,
    floorPriceUSD: 20250,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V9',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 9',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 9).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 27250,
    floorPriceUSD: 20438,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V10',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 10',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 10).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 27500,
    floorPriceUSD: 20625,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V11',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 11',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 11).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 27750,
    floorPriceUSD: 20813,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V12',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 12',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 12).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 28000,
    floorPriceUSD: 21000,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V13',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 13',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 13).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 28250,
    floorPriceUSD: 21188,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V14',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 14',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 14).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 28500,
    floorPriceUSD: 21375,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V15',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 15',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 15).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 28750,
    floorPriceUSD: 21563,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V16',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 16',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 16).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 29000,
    floorPriceUSD: 21750,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V17',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 17',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 17).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 29250,
    floorPriceUSD: 21938,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V18',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 18',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 18).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 29500,
    floorPriceUSD: 22125,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V19',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 19',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 19).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 29750,
    floorPriceUSD: 22313,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V20',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 20',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 20).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 30000,
    floorPriceUSD: 22500,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: false,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V21',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 21',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 21).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 30250,
    floorPriceUSD: 22688,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V22',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 22',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 22).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 30500,
    floorPriceUSD: 22875,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V23',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 23',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 23).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 30750,
    floorPriceUSD: 23063,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V24',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 24',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 24).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 31000,
    floorPriceUSD: 23250,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V25',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 25',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 25).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 31250,
    floorPriceUSD: 23438,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V26',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 26',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 26).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 31500,
    floorPriceUSD: 23625,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V27',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 27',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 27).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 31750,
    floorPriceUSD: 23813,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V28',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 28',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 28).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 32000,
    floorPriceUSD: 24000,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V29',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 29',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 29).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 32250,
    floorPriceUSD: 24188,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V30',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 30',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 30).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 32500,
    floorPriceUSD: 24375,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V31',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 31',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 31).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 32750,
    floorPriceUSD: 24563,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V32',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 32',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 32).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 33000,
    floorPriceUSD: 24750,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V33',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 33',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 33).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 33250,
    floorPriceUSD: 24938,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V34',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 34',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 34).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 33500,
    floorPriceUSD: 25125,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V35',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 35',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 35).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 33750,
    floorPriceUSD: 25313,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V36',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 36',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 36).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 34000,
    floorPriceUSD: 25500,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V37',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 37',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 37).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 34250,
    floorPriceUSD: 25688,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V38',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 38',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 38).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 34500,
    floorPriceUSD: 25875,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V39',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 39',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 39).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 34750,
    floorPriceUSD: 26063,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V40',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 40',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 40).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 35000,
    floorPriceUSD: 26250,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V41',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 41',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 41).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 35250,
    floorPriceUSD: 26438,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
  {
    sku: 'SKU-APEX_PROF_SERVICES-V42',
    familyCode: 'APEX_PROF_SERVICES',
    name: 'ApexCore Enterprise Onboarding & Architecture - Tier Edition 42',
    description: 'Enterprise grade revenue operations software module providing high-throughput orchestration for ApexCore Enterprise Onboarding & Architecture (Configuration Profile 42).',
    category: 'ApexCore Enterprise Onboarding & Architecture',
    unitListPriceUSD: 35500,
    floorPriceUSD: 26625,
    billingUnit: 'FIXED_ENGAGEMENT',
    billingFrequency: 'ANNUAL',
    taxCode: 'SW-SAAS-CORP-01',
    isAddonOnly: true,
    minContractDurationMonths: 12,
    includedFeatures: [
      'Full REST API and Webhook event stream access with HMAC signature verification',
      'Unlimited custom field registrations and dynamic object relational schema mapping',
      'Role-based granular access control (Admin, Sales Manager, Rep, Support, Marketing)',
      'Cryptographic SHA-256 tamper-evident mutation audit logging'
    ],
    volumeDiscountTiers: [
      { minQty: 1, maxQty: 10, discountPercent: 0 },
      { minQty: 11, maxQty: 50, discountPercent: 10 },
      { minQty: 51, maxQty: 100, discountPercent: 15 },
      { minQty: 101, maxQty: 250, discountPercent: 20 },
      { minQty: 251, discountPercent: 25 }
    ],
    serviceLevelTier: 'PLATINUM_99_99_UPTIME'
  },
];

export function getProductBySku(sku: string): EnterpriseSkuSpecification | undefined {
  return GLOBAL_PRODUCT_MASTER_CATALOG.find(p => p.sku === sku);
}

export function filterProductsByFamily(familyCode: string): EnterpriseSkuSpecification[] {
  return GLOBAL_PRODUCT_MASTER_CATALOG.filter(p => p.familyCode === familyCode);
}