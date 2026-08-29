/**
 * ApexCore Enterprise Customer Relationship Management (CRM)
 * Frontend REST API Client
 */

const API_BASE = '/api/crm';

export interface CRMApiResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
  message?: string;
  blockers?: string[];
  integrity?: { isValid: boolean; brokenAtLogId?: string };
}

export class CRMApiClient {
  private static tenantId: string = 'tenant_apex_global_001';
  private static userId: string = 'usr_marcus_vance';

  public static setContext(tenantId: string, userId: string) {
    this.tenantId = tenantId;
    this.userId = userId;
  }

  private static getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json',
      'x-tenant-id': this.tenantId,
      'x-user-id': this.userId
    };
  }

  public static async getHealth(): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/health`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getKPIs(): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/analytics/kpis`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getLeaderboard(): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/analytics/leaderboard`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getARRWaterfall(): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/analytics/arr-waterfall`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getLeads(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/leads`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async createLead(leadData: any): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(leadData)
    });
    return res.json();
  }

  public static async convertLead(leadId: string, options: any): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/leads/${leadId}/convert`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(options)
    });
    return res.json();
  }

  public static async getAccounts(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/accounts`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getAccountDetails(accountId: string): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/accounts/${accountId}`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getOpportunities(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/opportunities`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getPipelineForecast(pipelineId: string): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/pipelines/${pipelineId}/forecast`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async transitionOpportunityStage(oppId: string, targetStage: string): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/opportunities/${oppId}/stage`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ targetStage })
    });
    return res.json();
  }

  public static async getProducts(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/products`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getPriceBooks(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/pricebooks`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async createQuote(quoteData: any): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/quotes`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(quoteData)
    });
    return res.json();
  }

  public static async reviewQuote(quoteId: string, decision: 'APPROVE' | 'REJECT', rejectionReason?: string): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/quotes/${quoteId}/review`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ decision, rejectionReason })
    });
    return res.json();
  }

  public static async getTickets(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/tickets`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async createTicket(ticketData: any): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/tickets`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(ticketData)
    });
    return res.json();
  }

  public static async addTicketComment(ticketId: string, content: string, isInternalOnly: boolean = false): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/tickets/${ticketId}/comments`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ content, isInternalOnly })
    });
    return res.json();
  }

  public static async getCampaigns(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/campaigns`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getAttribution(oppId: string, model: string = 'LINEAR'): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/attribution/${oppId}?model=${model}`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getWorkflows(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/workflows`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getCustomFields(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/custom-fields`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async getAuditLogs(): Promise<CRMApiResponse<any[]>> {
    const res = await fetch(`${API_BASE}/audit-logs`, { headers: this.getHeaders() });
    return res.json();
  }

  public static async resetDatabase(): Promise<CRMApiResponse<any>> {
    const res = await fetch(`${API_BASE}/seed`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return res.json();
  }
}
