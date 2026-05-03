const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export async function fetchTransactions() {
  const res = await fetch(`${BASE}/transactions`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function createTransaction(payload) {
  const res = await fetch(`${BASE}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}