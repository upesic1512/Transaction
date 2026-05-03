import { useState, useCallback } from 'react';
import { useTransactions } from './hooks/useTransactions';
import TransactionTable from './components/TransactionTable';
import AddTransactionModal from './components/AddTransactionModal';
import Toast from './components/Toast';
import styles from './App.module.css';

export default function App() {
  const { transactions, loading, error, addTransaction } = useTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleAdd = useCallback(async (payload) => {
    try {
      const tx = await addTransaction(payload);
      setToast({ message: `Added · Status: ${tx.status}`, type: 'success' });
    } catch {
      setToast({ message: 'Failed to add transaction.', type: 'error' });
      throw new Error();
    }
  }, [addTransaction]);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.liveDot} />
          <span className={styles.headerMeta}>CSV · FastAPI · React</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.titleBlock}>
            <h1 className={styles.pageTitle}>Transactions</h1>
            <p className={styles.pageSubtitle}>
              {loading ? 'Loading…' : `${transactions.length} record${transactions.length !== 1 ? 's' : ''} · transactions.csv`}
            </p>
          </div>
          <button className={styles.addBtn} onClick={() => setModalOpen(true)}>
            + Add Transaction
          </button>
        </div>

        <TransactionTable transactions={transactions} loading={loading} error={error} />
      </main>

      <AddTransactionModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
      <Toast message={toast?.message} type={toast?.type} onDone={() => setToast(null)} />
    </div>
  );
}