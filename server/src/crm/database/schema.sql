-- ============================================================================
-- ApexCore Enterprise Customer Relationship Management (CRM)
-- PostgreSQL / ANSI-SQL Relational Schema DDL & Constraints
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Core Users & RBAC
CREATE TABLE IF NOT EXISTS crm_users (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(64) NOT NULL,
    department VARCHAR(128) NOT NULL,
    quota_arr NUMERIC(15, 2) DEFAULT 0.00,
    territory VARCHAR(128) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crm_users_tenant ON crm_users(tenant_id);
CREATE INDEX idx_crm_users_role ON crm_users(role);

-- 2. Accounts (Organizations)
CREATE TABLE IF NOT EXISTS crm_accounts (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    account_type VARCHAR(64) NOT NULL,
    tier VARCHAR(64) NOT NULL,
    industry VARCHAR(128) NOT NULL,
    website VARCHAR(255),
    phone VARCHAR(64) NOT NULL,
    annual_revenue NUMERIC(15, 2) DEFAULT 0.00,
    employee_count INT DEFAULT 0,
    parent_account_id VARCHAR(64) REFERENCES crm_accounts(id) ON DELETE SET NULL,
    owner_id VARCHAR(64) REFERENCES crm_users(id),
    billing_street VARCHAR(255) NOT NULL,
    billing_city VARCHAR(128) NOT NULL,
    billing_state VARCHAR(64) NOT NULL,
    billing_postal_code VARCHAR(32) NOT NULL,
    billing_country VARCHAR(64) NOT NULL,
    shipping_street VARCHAR(255),
    shipping_city VARCHAR(128),
    shipping_state VARCHAR(64),
    shipping_postal_code VARCHAR(32),
    shipping_country VARCHAR(64),
    health_score INT DEFAULT 100,
    churn_risk VARCHAR(32) DEFAULT 'LOW',
    is_deleted BOOLEAN DEFAULT FALSE,
    custom_fields JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crm_accounts_tenant ON crm_accounts(tenant_id);
CREATE INDEX idx_crm_accounts_owner ON crm_accounts(owner_id);
CREATE INDEX idx_crm_accounts_industry ON crm_accounts(industry);
CREATE INDEX idx_crm_accounts_parent ON crm_accounts(parent_account_id);

-- 3. Contacts
CREATE TABLE IF NOT EXISTS crm_contacts (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    account_id VARCHAR(64) NOT NULL REFERENCES crm_accounts(id) ON DELETE CASCADE,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    title VARCHAR(128) NOT NULL,
    department VARCHAR(128),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    mobile_phone VARCHAR(64),
    persona VARCHAR(64) NOT NULL,
    is_primary_contact BOOLEAN DEFAULT FALSE,
    decision_influence_score INT DEFAULT 5,
    sentiment_index NUMERIC(3, 2) DEFAULT 0.00,
    owner_id VARCHAR(64) REFERENCES crm_users(id),
    is_deleted BOOLEAN DEFAULT FALSE,
    custom_fields JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crm_contacts_account ON crm_contacts(account_id);
CREATE INDEX idx_crm_contacts_email ON crm_contacts(email);
CREATE INDEX idx_crm_contacts_owner ON crm_contacts(owner_id);

-- 4. Leads & Scoring
CREATE TABLE IF NOT EXISTS crm_leads (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    title VARCHAR(128) NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64) NOT NULL,
    website VARCHAR(255),
    industry VARCHAR(128) NOT NULL,
    annual_revenue NUMERIC(15, 2),
    number_of_employees INT,
    source VARCHAR(64) NOT NULL,
    status VARCHAR(64) NOT NULL,
    rating VARCHAR(32) NOT NULL,
    score INT DEFAULT 0,
    bant_score JSONB DEFAULT '{}'::jsonb,
    owner_id VARCHAR(64) REFERENCES crm_users(id),
    converted_account_id VARCHAR(64) REFERENCES crm_accounts(id),
    converted_contact_id VARCHAR(64) REFERENCES crm_contacts(id),
    converted_opportunity_id VARCHAR(64),
    converted_at TIMESTAMP WITH TIME ZONE,
    is_deleted BOOLEAN DEFAULT FALSE,
    custom_fields JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crm_leads_tenant ON crm_leads(tenant_id);
CREATE INDEX idx_crm_leads_status ON crm_leads(status);
CREATE INDEX idx_crm_leads_owner ON crm_leads(owner_id);
CREATE INDEX idx_crm_leads_score ON crm_leads(score DESC);

-- 5. Pipelines & Opportunities (Deals)
CREATE TABLE IF NOT EXISTS crm_pipelines (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_default BOOLEAN DEFAULT FALSE,
    stages JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crm_opportunities (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    account_id VARCHAR(64) NOT NULL REFERENCES crm_accounts(id) ON DELETE CASCADE,
    primary_contact_id VARCHAR(64) REFERENCES crm_contacts(id),
    pipeline_id VARCHAR(64) NOT NULL REFERENCES crm_pipelines(id),
    stage VARCHAR(64) NOT NULL,
    amount NUMERIC(15, 2) NOT NULL,
    expected_revenue NUMERIC(15, 2) NOT NULL,
    probability_percentage INT NOT NULL,
    forecast_category VARCHAR(64) NOT NULL,
    close_date DATE NOT NULL,
    deal_type VARCHAR(64) NOT NULL,
    lead_source VARCHAR(64),
    owner_id VARCHAR(64) REFERENCES crm_users(id),
    meddic JSONB DEFAULT '{}'::jsonb,
    stage_history JSONB DEFAULT '[]'::jsonb,
    days_in_current_stage INT DEFAULT 0,
    is_stagnant BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    custom_fields JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crm_opps_account ON crm_opportunities(account_id);
CREATE INDEX idx_crm_opps_stage ON crm_opportunities(stage);
CREATE INDEX idx_crm_opps_owner ON crm_opportunities(owner_id);
CREATE INDEX idx_crm_opps_close_date ON crm_opportunities(close_date);

-- 6. Products, Price Books & CPQ Quotes
CREATE TABLE IF NOT EXISTS crm_products (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    sku VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(128) NOT NULL,
    unit_price NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(8) DEFAULT 'USD',
    is_active BOOLEAN DEFAULT TRUE,
    billing_frequency VARCHAR(32) DEFAULT 'ANNUAL',
    tax_code VARCHAR(32) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crm_pricebooks (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    currency VARCHAR(8) DEFAULT 'USD',
    is_active BOOLEAN DEFAULT TRUE,
    is_standard BOOLEAN DEFAULT FALSE,
    entries JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crm_quotes (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    quote_number VARCHAR(64) UNIQUE NOT NULL,
    opportunity_id VARCHAR(64) NOT NULL REFERENCES crm_opportunities(id),
    account_id VARCHAR(64) NOT NULL REFERENCES crm_accounts(id),
    primary_contact_id VARCHAR(64) REFERENCES crm_contacts(id),
    pricebook_id VARCHAR(64) NOT NULL REFERENCES crm_pricebooks(id),
    status VARCHAR(64) NOT NULL,
    expiration_date DATE NOT NULL,
    subtotal NUMERIC(15, 2) NOT NULL,
    total_discount_amount NUMERIC(15, 2) DEFAULT 0.00,
    tax_amount NUMERIC(15, 2) DEFAULT 0.00,
    grand_total NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(8) DEFAULT 'USD',
    payment_terms VARCHAR(64) NOT NULL,
    version INT DEFAULT 1,
    line_items JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Contracts & Invoices
CREATE TABLE IF NOT EXISTS crm_contracts (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    contract_number VARCHAR(64) UNIQUE NOT NULL,
    account_id VARCHAR(64) NOT NULL REFERENCES crm_accounts(id),
    opportunity_id VARCHAR(64) REFERENCES crm_opportunities(id),
    quote_id VARCHAR(64) REFERENCES crm_quotes(id),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(64) NOT NULL,
    billing_cycle VARCHAR(64) NOT NULL,
    contract_value_arr NUMERIC(15, 2) NOT NULL,
    total_contract_value_tcv NUMERIC(15, 2) NOT NULL,
    auto_renew BOOLEAN DEFAULT TRUE,
    owner_id VARCHAR(64) REFERENCES crm_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crm_invoices (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    invoice_number VARCHAR(64) UNIQUE NOT NULL,
    contract_id VARCHAR(64) NOT NULL REFERENCES crm_contracts(id),
    account_id VARCHAR(64) NOT NULL REFERENCES crm_accounts(id),
    issue_date DATE NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(64) NOT NULL,
    subtotal NUMERIC(15, 2) NOT NULL,
    tax_amount NUMERIC(15, 2) NOT NULL,
    total_amount NUMERIC(15, 2) NOT NULL,
    paid_amount NUMERIC(15, 2) DEFAULT 0.00,
    balance_due NUMERIC(15, 2) NOT NULL,
    currency VARCHAR(8) DEFAULT 'USD',
    line_items JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Customer Support Tickets & SLA Engine
CREATE TABLE IF NOT EXISTS crm_sla_policies (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    tier VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    first_response_minutes JSONB NOT NULL,
    resolution_hours JSONB NOT NULL,
    business_hours_only BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS crm_tickets (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    ticket_number VARCHAR(64) UNIQUE NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(64) NOT NULL,
    priority VARCHAR(64) NOT NULL,
    channel VARCHAR(64) NOT NULL,
    account_id VARCHAR(64) REFERENCES crm_accounts(id),
    contact_id VARCHAR(64) REFERENCES crm_contacts(id),
    assignee_id VARCHAR(64) REFERENCES crm_users(id),
    sla_performance JSONB NOT NULL,
    tags TEXT[],
    comments JSONB DEFAULT '[]'::jsonb,
    csat_score INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crm_tickets_status ON crm_tickets(status);
CREATE INDEX idx_crm_tickets_priority ON crm_tickets(priority);
CREATE INDEX idx_crm_tickets_assignee ON crm_tickets(assignee_id);

-- 9. Marketing Campaigns & Members
CREATE TABLE IF NOT EXISTS crm_campaigns (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL,
    status VARCHAR(64) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    budgeted_cost NUMERIC(15, 2) DEFAULT 0.00,
    actual_cost NUMERIC(15, 2) DEFAULT 0.00,
    expected_revenue NUMERIC(15, 2) DEFAULT 0.00,
    actual_revenue_won NUMERIC(15, 2) DEFAULT 0.00,
    target_audience TEXT,
    members_count INT DEFAULT 0,
    opened_count INT DEFAULT 0,
    clicked_count INT DEFAULT 0,
    converted_count INT DEFAULT 0,
    roi_percentage NUMERIC(8, 2) DEFAULT 0.00,
    owner_id VARCHAR(64) REFERENCES crm_users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Workflows & Visual Automation Rules
CREATE TABLE IF NOT EXISTS crm_workflow_rules (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    entity_type VARCHAR(64) NOT NULL,
    trigger_type VARCHAR(64) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    conditions JSONB NOT NULL,
    condition_logic VARCHAR(16) DEFAULT 'AND',
    actions JSONB NOT NULL,
    execution_count INT DEFAULT 0,
    last_executed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Dynamic Custom Fields
CREATE TABLE IF NOT EXISTS crm_custom_fields (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    target_entity VARCHAR(64) NOT NULL,
    field_name VARCHAR(128) NOT NULL,
    field_key VARCHAR(128) NOT NULL,
    data_type VARCHAR(64) NOT NULL,
    is_required BOOLEAN DEFAULT FALSE,
    default_value TEXT,
    dropdown_options TEXT[],
    help_text TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_custom_field_key UNIQUE(tenant_id, target_entity, field_key)
);

-- 12. Activities & Interaction Timelines
CREATE TABLE IF NOT EXISTS crm_activities (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    type VARCHAR(64) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    description TEXT,
    priority VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_date TIMESTAMP WITH TIME ZONE,
    related_entity_type VARCHAR(64) NOT NULL,
    related_entity_id VARCHAR(64) NOT NULL,
    related_entity_name VARCHAR(255) NOT NULL,
    owner_id VARCHAR(64) REFERENCES crm_users(id),
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_crm_activities_entity ON crm_activities(related_entity_type, related_entity_id);
CREATE INDEX idx_crm_activities_owner ON crm_activities(owner_id);

-- 13. Cryptographic Tamper-Evident Audit Trail
CREATE TABLE IF NOT EXISTS crm_audit_logs (
    id VARCHAR(64) PRIMARY KEY,
    tenant_id VARCHAR(64) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    actor_id VARCHAR(64) NOT NULL,
    actor_name VARCHAR(255) NOT NULL,
    actor_role VARCHAR(64) NOT NULL,
    client_ip VARCHAR(64) NOT NULL,
    action VARCHAR(64) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64) NOT NULL,
    details TEXT NOT NULL,
    previous_values JSONB,
    new_values JSONB,
    previous_hash VARCHAR(128) NOT NULL,
    current_hash VARCHAR(128) NOT NULL
);

CREATE INDEX idx_crm_audit_tenant_time ON crm_audit_logs(tenant_id, timestamp DESC);
CREATE INDEX idx_crm_audit_entity ON crm_audit_logs(entity_type, entity_id);
