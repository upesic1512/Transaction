import { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, type = 'success', onDone }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;
  return <div className={`${styles.toast} ${styles[type]}`}>{type === 'success' ? '✓' : '⚠'} {message}</div>;
}