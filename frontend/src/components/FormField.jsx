import styles from './FormField.module.css';

export default function FormField({ id, label, error, ...inputProps }) {
  return (
    <div className={`${styles.field} ${error ? styles.hasError : ''}`}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      <input id={id} className={`${styles.input} ${error ? styles.invalid : ''}`} {...inputProps} />
      {error && <span className={styles.errMsg}>{error}</span>}
    </div>
  );
}