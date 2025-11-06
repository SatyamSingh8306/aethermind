//eslint-disable-next-line
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
  try { token = localStorage.getItem('token'); } catch {}
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

// Payments (Razorpay)
export async function createPaymentOrder(productId) {
  const res = await fetch(`${API_BASE}/api/payments/create-order`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId })
  });
  return await handleResponse(res);
}

export async function verifyPayment({ order_id, payment_id, signature, productId }) {
  const res = await fetch(`${API_BASE}/api/payments/verify`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ order_id, payment_id, signature, productId })
  });
  return await handleResponse(res);
}


