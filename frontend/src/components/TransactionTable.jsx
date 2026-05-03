import StatusBadge from './StatusBadge';
import styles from './TransactionTable.module.css';

function fmt(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
}

export default function TransactionTable({ transactions, loading, error }) {
  return (
    <div className={styles.card}>
      <div className={styles.toolbar}>
        <span className={styles.label}>All Transactions</span>
        <span className={styles.count}>
          {loading ? '—' : `${transactions.length} record${transactions.length !== 1 ? 's' : ''}`}
        </span>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th><th>Account Number</th>
              <th>Account Holder</th><th className={styles.right}>Amount</th>
              <th className={styles.center}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan={5} className={styles.state}>Loading…</td></tr>}
            {!loading && error && <tr><td colSpan={5} className={`${styles.state} ${styles.err}`}>⚠ Cannot reach API. Is the backend running?</td></tr>}
            {!loading && !error && transactions.length === 0 && <tr><td colSpan={5} className={styles.state}>No transactions yet.</td></tr>}
            {!loading && !error && transactions.map((tx, i) => (
              <tr key={i} className={styles.row}>
                <td className={styles.date}>{tx.transaction_date}</td>
                <td className={styles.mono}>{tx.account_number}</td>
                <td className={styles.name}>{tx.account_holder_name}</td>
                <td className={`${styles.mono} ${styles.right}`}>{fmt(tx.amount)}</td>
                <td className={styles.center}><StatusBadge status={tx.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}