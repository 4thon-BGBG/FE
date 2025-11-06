import { logoWihte } from '@/assets';
import styles from './Splash.module.scss';

export const Splash = () => {
  return (
    <div className={styles.container}>
      <img src={logoWihte} alt="logo" />
    </div>
  );
};
