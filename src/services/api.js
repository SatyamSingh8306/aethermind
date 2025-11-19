// eslint-disable-next-line
const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_BACKEND_API_BASE) || 'http://localhost:4000';

async function handleResponse(res) {
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const msg = data?.message || data?.error || `Request failed (${res.status})`;
    const err = new Error(msg);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

export function getAuthHeaders() {
  let token = null;
  try { token = localStorage.getItem('token'); } catch { }
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export async function fetchProducts() {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
    cache: 'no-store'
  });
  return await handleResponse(res);
}

export async function createPurchase(productId, meta) {
  const res = await fetch(`${API_BASE}/api/purchases`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, meta })
  });
  return await handleResponse(res);
}

export async function fetchMyPurchases() {
  const res = await fetch(`${API_BASE}/api/purchases/me`, {
    method: 'GET',
    headers: getAuthHeaders()
  });
  return await handleResponse(res);
}

export async function chatProxy({ userid, clientid, query }) {
  const res = await fetch(`${API_BASE}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userid, clientid, query })
  });
  return await handleResponse(res);
}

export function getApiBase() {
  return API_BASE;
}

// Admin endpoints
export async function fetchPurchases(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') params.append(k, v);
  });
  const url = `${API_BASE}/api/purchases${params.toString() ? `?${params.toString()}` : ''}`;
  const res = await fetch(url, { method: 'GET', headers: getAuthHeaders() });
  return await handleResponse(res);
}

export async function fetchPurchasesSummary() {
  const res = await fetch(`${API_BASE}/api/purchases/stats/summary`, { method: 'GET', headers: getAuthHeaders() });
  return await handleResponse(res);
}

/**
 * Payments (Razorpay)
 * Now supports optional custom amount (in paise) + meta.
 * - Default: backend computes full amount from productId.
 * - Custom/token: pass { amountPaise: 100 } for ₹1 token.
 */
export async function createPaymentOrder(productId, opts = {}) {
  const payload = { productId };
  if (opts.amountPaise != null) payload.amount = opts.amountPaise; // in paise
  if (opts.meta) payload.meta = opts.meta;
  const res = await fetch(`${API_BASE}/api/payments/create-order`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  return await handleResponse(res);
}

// Loosened to accept extra fields if you want (mode/amount/etc). Existing calls still work.
export async function verifyPayment(payload) {
  const res = await fetch(`${API_BASE}/api/payments/verify`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  return await handleResponse(res);
}

/**
 * Integration intents (collect setup details)
 * POST /api/products/:id/integration-intents
 */
export async function createIntegrationIntent(productId, payload) {
  const res = await fetch(`${API_BASE}/api/products/${productId}/integration-intents`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  return await handleResponse(res);
}

/**
 * Reminders / Waitlist
 * POST /api/products/:id/reminders
 */
export async function createReminder(productId, payload) {
  const res = await fetch(`${API_BASE}/api/products/${productId}/reminders`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload)
  });
  return await handleResponse(res);
}

/**
 * System Prompt Setup
 * POST /api/clients/:clientId/setup-prompt
 */
export async function setupSystemPrompt(clientId, payload) {
  const token = import.meta.env.VITE_SYSTEM_PROMPT_TOKEN;

  if (!token) {
    throw new Error('VITE_SYSTEM_PROMPT_TOKEN is missing. Add it to your .env file.');
  }

  const res = await fetch(`${API_BASE}/api/clients/${clientId}/setup-prompt`, {
    method: 'POST',
    headers: {
      'x-system-prompt-token': token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  return await handleResponse(res);
}


/**
 * Get Integration Script
 * GET /api/clients/:clientId/integration
 */
export async function getIntegrationScript(clientId) {
  const res = await fetch(`${API_BASE}/api/clients/${clientId}/integration`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  return await handleResponse(res);
}