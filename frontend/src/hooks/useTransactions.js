import { useState, useEffect, useCallback } from 'react';
import { fetchTransactions, createTransaction } from '../api/transactions';

export function useTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const addTransaction = useCallback(async (payload) => {
    const created = await createTransaction(payload);
    setTransactions(prev => [created, ...prev]);
    return created;
  }, []);

  return { transactions, loading, error, addTransaction };
}