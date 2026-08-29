/**
 * ApexCore Enterprise CRM - Frontend API Client
 * Type-safe HTTP client for User Authentication, 5-Role RBAC, Customer 360,
 * Interactions, Notes/Attachments, BANT Leads, MEDDIC Pipeline, CPQ, and Helpdesk.
 */

const API_BASE = '/api';

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
  integrity?: any;
  message?: string;
  user?: any;
  token?: string;
  session?: any;
  resetToken?: string;
}

export class CRMApiClient {
  private static token: string = localStorage.getItem('apexcore_auth_token') || '';

  public static setAuthToken(token: string) {
    this.token = token;
    if (token) {
      localStorage.setItem('apexcore_auth_token', token);
    } else {
      localStorage.removeItem('apexcore_auth_token');
    }
  }

  public static getAuthToken(): string {
    return this.token;
  }

  private static async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {})
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      console.error(`[API ERROR] ${endpoint}:`, err);
      return { success: false, error: err.message || 'Network request failed' };
    }
  }

  // ==========================================================================
  // 1. User Authentication & 5 Core Roles
  // ==========================================================================
  public static async login(email: string, password: string): Promise<ApiResponse> {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    if (res.success && res.token) {
      this.setAuthToken(res.token);
    }
    return res;
  }

  public static async register(userData: any): Promise<ApiResponse> {
    const res = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    if (res.success && res.token) {
      this.setAuthToken(res.token);
    }
    return res;
  }

  public static async forgotPassword(email: string): Promise<ApiResponse> {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  public static async resetPassword(token: string, newPassword: string): Promise<ApiResponse> {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword })
    });
  }

  public static async getCurrentUser(): Promise<ApiResponse> {
    return this.request('/auth/me');
  }

  public static async logout(): Promise<ApiResponse> {
    const res = await this.request('/auth/logout', { method: 'POST' });
    this.setAuthToken('');
    return res;
  }

  public static async getUsers(): Promise<ApiResponse> {
    return this.request('/auth/users');
  }

  public static async updateUserRole(userId: string, role: string): Promise<ApiResponse> {
    return this.request(`/auth/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role })
    });
  }

  public static async getRoles(): Promise<ApiResponse> {
    return this.request('/auth/roles');
  }

  // ==========================================================================
  // 2. Customer Management & Customer 360
  // ==========================================================================
  public static async getCustomers(params?: { search?: string; status?: string; tier?: string; industry?: string }): Promise<ApiResponse> {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/customers${query ? `?${query}` : ''}`);
  }

  public static async createCustomer(customerData: any): Promise<ApiResponse> {
    return this.request('/customers', {
      method: 'POST',
      body: JSON.stringify(customerData)
    });
  }

  public static async getCustomerProfile(id: string): Promise<ApiResponse> {
    return this.request(`/customers/${id}`);
  }

  public static async updateCustomer(id: string, updates: any): Promise<ApiResponse> {
    return this.request(`/customers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    });
  }

  public static async deleteCustomer(id: string): Promise<ApiResponse> {
    return this.request(`/customers/${id}`, {
      method: 'DELETE'
    });
  }

  public static async setCustomerStatus(id: string, status: string): Promise<ApiResponse> {
    return this.request(`/customers/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }

  public static async getInteractions(customerId: string): Promise<ApiResponse> {
    return this.request(`/customers/${customerId}/interactions`);
  }

  public static async logInteraction(customerId: string, interactionData: any): Promise<ApiResponse> {
    return this.request(`/customers/${customerId}/interactions`, {
      method: 'POST',
      body: JSON.stringify(interactionData)
    });
  }

  public static async getNotes(customerId: string): Promise<ApiResponse> {
    return this.request(`/customers/${customerId}/notes`);
  }

  public static async addNote(customerId: string, noteData: any): Promise<ApiResponse> {
    return this.request(`/customers/${customerId}/notes`, {
      method: 'POST',
      body: JSON.stringify(noteData)
    });
  }

  public static async togglePinNote(customerId: string, noteId: string): Promise<ApiResponse> {
    return this.request(`/customers/${customerId}/notes/${noteId}/pin`, {
      method: 'PUT'
    });
  }

  public static async deleteNote(customerId: string, noteId: string): Promise<ApiResponse> {
    return this.request(`/customers/${customerId}/notes/${noteId}`, {
      method: 'DELETE'
    });
  }

  public static async getAttachments(customerId: string): Promise<ApiResponse> {
    return this.request(`/customers/${customerId}/attachments`);
  }

  public static async addAttachment(customerId: string, attachmentData: any): Promise<ApiResponse> {
    return this.request(`/customers/${customerId}/attachments`, {
      method: 'POST',
      body: JSON.stringify(attachmentData)
    });
  }

  public static async deleteAttachment(customerId: string, attachmentId: string): Promise<ApiResponse> {
    return this.request(`/customers/${customerId}/attachments/${attachmentId}`, {
      method: 'DELETE'
    });
  }

  // ==========================================================================
  // 3. Leads, Opportunities & Sales Forecasting
  // ==========================================================================
  public static async getLeads(): Promise<ApiResponse> {
    return this.request('/leads');
  }

  public static async evaluateBANT(leadId: string, answers: any): Promise<ApiResponse> {
    return this.request(`/leads/${leadId}/evaluate-bant`, {
      method: 'POST',
      body: JSON.stringify(answers)
    });
  }

  public static async convertLead(leadId: string, options: any): Promise<ApiResponse> {
    return this.request(`/leads/${leadId}/convert`, {
      method: 'POST',
      body: JSON.stringify(options)
    });
  }

  public static async getOpportunities(): Promise<ApiResponse> {
    return this.request('/opportunities');
  }

  public static async getPipelineForecast(): Promise<ApiResponse> {
    return this.request('/opportunities/pipeline-forecast');
  }

  public static async validateStageTransition(oppId: string, targetStage: string): Promise<ApiResponse> {
    return this.request(`/opportunities/${oppId}/transition-gate`, {
      method: 'POST',
      body: JSON.stringify({ targetStage })
    });
  }

  // ==========================================================================
  // 4. CPQ, SLA Helpdesk & Marketing
  // ==========================================================================
  public static async getProducts(): Promise<ApiResponse> {
    return this.request('/cpq/products');
  }

  public static async getPriceBooks(): Promise<ApiResponse> {
    return this.request('/cpq/price-books');
  }

  public static async createQuote(quoteConfig: any): Promise<ApiResponse> {
    return this.request('/cpq/quotes/calculate', {
      method: 'POST',
      body: JSON.stringify(quoteConfig)
    });
  }

  public static async getTickets(): Promise<ApiResponse> {
    return this.request('/helpdesk/tickets');
  }

  public static async addTicketComment(ticketId: string, content: string): Promise<ApiResponse> {
    return this.request(`/helpdesk/tickets/${ticketId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ content })
    });
  }

  public static async getCampaigns(): Promise<ApiResponse> {
    return this.request('/marketing/campaigns');
  }

  public static async getAttribution(opportunityId: string, model: string = 'LINEAR'): Promise<ApiResponse> {
    return this.request(`/marketing/attribution?opportunityId=${opportunityId}&model=${model}`);
  }

  public static async getWorkflows(): Promise<ApiResponse> {
    return this.request('/workflows');
  }

  public static async getCustomFields(): Promise<ApiResponse> {
    return this.request('/schemas/custom-fields');
  }

  public static async getKPIs(): Promise<ApiResponse> {
    return this.request('/analytics/kpis');
  }

  public static async getLeaderboard(): Promise<ApiResponse> {
    return this.request('/analytics/leaderboard');
  }

  public static async getAuditLogs(): Promise<ApiResponse> {
    return this.request('/audit/logs');
  }
}
