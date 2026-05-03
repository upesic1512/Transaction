import { useState } from 'react';

const today = () => new Date().toISOString().split('T')[0];
const EMPTY = { transaction_date: today(), account_number: '', account_holder_name: '', amount: '' };

export function useTransactionForm(onSubmit) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const set = (field) => (e) => setValues(v => ({ ...v, [field]: e.target.value }));

  function validate() {
    const errs = {};
    if (!values.transaction_date) errs.transaction_date = 'Date is required';
    if (!values.account_number.trim()) errs.account_number = 'Account number is required';
    if (!values.account_holder_name.trim()) errs.account_holder_name = 'Name is required';
    if (!values.amount || parseFloat(values.amount) <= 0) errs.amount = 'Enter a valid amount';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await onSubmit({ ...values, amount: parseFloat(values.amount) });
      reset();
    } finally {
      setSubmitting(false);
    }
  }

  function reset() { setValues(EMPTY); setErrors({}); }

  return { values, errors, submitting, set, handleSubmit, reset };
}