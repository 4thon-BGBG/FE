import { logoWihte } from '@/assets';
import styles from './Splash.module.scss';
import { useEffect, useState } from 'react';

export const Splash = ({ closeFn }) => {
  const [visible, setVisible] = useState(true);

  // 1.5초 뒤에 사라지게 설정
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      closeFn();
    }, 1500);
  }, [closeFn]);

  return (
    <div className={`${styles.container} ${visible && styles.visible}`}>
      <img src={logoWihte} alt="logo" />
    </div>
  );
};
