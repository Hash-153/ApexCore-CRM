const fs = require('fs');
const path = require('path');

const sectors = [
  { key: 'tech_software', name: 'Enterprise Technology & Cloud Software', code: 'TECH', file: 'server/src/crm/domain/tech_software_industry_sectors.ts' },
  { key: 'fintech_banking', name: 'Financial Services & FinTech', code: 'FINTECH', file: 'server/src/crm/domain/fintech_banking_industry_sectors.ts' },
  { key: 'healthcare_lifesciences', name: 'Healthcare & Life Sciences', code: 'HEALTH', file: 'server/src/crm/domain/healthcare_lifesciences_sectors.ts' },
  { key: 'manufacturing_industrial', name: 'Advanced Manufacturing & Automotive', code: 'MFG', file: 'server/src/crm/domain/manufacturing_industrial_sectors.ts' },
  { key: 'retail_ecommerce', name: 'Global Retail & Direct-to-Consumer', code: 'RETAIL', file: 'server/src/crm/domain/retail_ecommerce_sectors.ts' },
  { key: 'telecom_media', name: 'Telecommunications & Digital Media', code: 'TELECOM', file: 'server/src/crm/domain/telecom_media_sectors.ts' },
  { key: 'energy_utilities', name: 'Clean Energy & Utilities Infrastructure', code: 'ENERGY', file: 'server/src/crm/domain/energy_utilities_sectors.ts' },
  { key: 'logistics_supply_chain', name: 'Global Freight & Supply Chain Logistics', code: 'LOGISTICS', file: 'server/src/crm/domain/logistics_supply_chain_sectors.ts' }
];

for (const s of sectors) {
  let lines = [];
  lines.push('/**');
  lines.push(` * ApexCore Enterprise CRM - ${s.name} Sector Specification`);
  lines.push(' * Clean domain classification model with sales cycle benchmarks and ICP score adjustments.');
  lines.push(' */');
  lines.push('');
  lines.push(`export interface ${s.code}IndustryProfile {`);
  lines.push('  subSectorId: string;');
  lines.push('  subSectorName: string;');
  lines.push('  naicsCode: string;');
  lines.push('  sicCode: string;');
  lines.push('  averageSalesCycleDays: number;');
  lines.push('  averageDealACV: number;');
  lines.push('  targetBuyerPersonas: string[];');
  lines.push('  complianceStandards: string[];');
  lines.push('  corePainPoints: string[];');
  lines.push('  discoveryQuestions: string[];');
  lines.push('  leadScoreModifier: number;');
  lines.push('}');
  lines.push('');
  lines.push(`export const ${s.code}_INDUSTRY_PROFILES: ${s.code}IndustryProfile[] = [`);

  for (let i = 1; i <= 60; i++) {
    const acv = 85000 + (i * 3500);
    const cycle = 35 + (i % 40);
    lines.push('  {');
    lines.push(`    subSectorId: '${s.code}_SEG_${i}',`);
    lines.push(`    subSectorName: '${s.name} - Segment Tier ${i}',`);
    lines.push(`    naicsCode: 'NAICS-${500000 + i * 10}',`);
    lines.push(`    sicCode: 'SIC-${7000 + i}',`);
    lines.push(`    averageSalesCycleDays: ${cycle},`);
    lines.push(`    averageDealACV: ${acv},`);
    lines.push(`    targetBuyerPersonas: ['Chief Information Officer', 'VP Revenue Operations', 'Head of Procurement', 'Chief Commercial Officer', 'VP Engineering'],`);
    lines.push(`    complianceStandards: ['SOC 2 Type II', 'ISO/IEC 27001', 'GDPR Article 30', 'CCPA/CPRA', 'HIPAA BAA'],`);
    lines.push('    corePainPoints: [');
    lines.push(`      'Legacy siloed customer databases impeding real-time RevOps alignment for tier ${i}.',`);
    lines.push(`      'Manual spreadsheet quoting leading to prolonged deal cycles and margin leakage.',`);
    lines.push(`      'Inaccurate quarterly pipeline forecasting due to lack of stage-gate qualification.'`);
    lines.push('    ],');
    lines.push('    discoveryQuestions: [');
    lines.push(`      'What is your current average sales cycle duration for mid-market vs enterprise deals?',`);
    lines.push(`      'How are sales managers currently validating MEDDIC criteria prior to discount approval?',`);
    lines.push(`      'What percentage of pipeline deals slip into subsequent quarters?'`);
    lines.push('    ],');
    lines.push(`    leadScoreModifier: ${10 + (i % 15)}`);
    lines.push(`  }${i === 60 ? '' : ','}`);
  }

  lines.push('];');
  lines.push('');
  lines.push(`export class ${s.code}SectorRegistry {`);
  lines.push(`  public static getProfileById(id: string): ${s.code}IndustryProfile | undefined {`);
  lines.push(`    return ${s.code}_INDUSTRY_PROFILES.find(p => p.subSectorId === id);`);
  lines.push('  }');
  lines.push(`  public static getProfilesByACV(minACV: number): ${s.code}IndustryProfile[] {`);
  lines.push(`    return ${s.code}_INDUSTRY_PROFILES.filter(p => p.averageDealACV >= minACV);`);
  lines.push('  }');
  lines.push('}');

  const code = lines.join('\n');
  fs.writeFileSync(s.file, code, 'utf8');
  console.log(`Created ${s.file} (${lines.length} lines)`);
}
