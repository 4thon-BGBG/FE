import styles from './InputField.module.scss';

export const InputField = ({
  label,
  placeholder,
  type = 'text',
  registration,
  error,
}) => {
  return (
    <div className={styles.inputField}>
      <label>{label}</label>
      <input placeholder={placeholder} type={type} {...registration} />
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};
