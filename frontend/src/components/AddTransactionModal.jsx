import { useEffect, useRef } from 'react';
import FormField from './FormField';
import { useTransactionForm } from '../hooks/useTransactionForm';
import styles from './AddTransactionModal.module.css';

export default function AddTransactionModal({ open, onClose, onAdd }) {
  const dialogRef = useRef(null);
  const { values, errors, submitting, set, handleSubmit, reset } = useTransactionForm(async (payload) => {
    await onAdd(payload);
    onClose();
  });

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function handleClose() { reset(); onClose(); }
  function handleOverlay(e) { if (e.target === dialogRef.current) handleClose(); }

  if (!open) return null;

  return (
    <div className={styles.overlay} ref={dialogRef} onClick={handleOverlay}>
      <div className={styles.modal} role="dialog" aria-modal="true">
        <div className={styles.header}>
          <h2 className={styles.title}>Add Transaction</h2>
          <button className={styles.closeBtn} onClick={handleClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.body}>
            <FormField id="f-date" label="Transaction Date" type="date" value={values.transaction_date} onChange={set('transaction_date')} error={errors.transaction_date} />
            <FormField id="f-account" label="Account Number" type="text" placeholder="e.g. 1234-5678-9012" value={values.account_number} onChange={set('account_number')} error={errors.account_number} />
            <FormField id="f-name" label="Account Holder Name" type="text" placeholder="Full name" value={values.account_holder_name} onChange={set('account_holder_name')} error={errors.account_holder_name} />
            <FormField id="f-amount" label="Amount (USD)" type="number" placeholder="0.00" min="0.01" step="0.01" value={values.amount} onChange={set('amount')} error={errors.amount} />
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.cancelBtn} onClick={handleClose} disabled={submitting}>Cancel</button>
            <button type="submit" className={styles.submitBtn} disabled={submitting}>{submitting ? 'Saving…' : 'Add Transaction'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}