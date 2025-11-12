import { useState } from 'react';
import styles from './InputField.module.scss';
import { eyeClose, eyeOpen } from '@/assets';

export const PasswordInputField = ({
  label,
  registration,
  error,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.inputField}>
      <label>{label}</label>
      <div className={styles.passwordContainer}>
        <input
          placeholder={placeholder}
          type={showPassword ? 'text' : 'password'}
          {...registration}
        />
        <img
          src={showPassword ? eyeOpen : eyeClose}
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        />
      </div>
      {error && <div className={styles.error}>{error.message}</div>}
    </div>
  );
};
