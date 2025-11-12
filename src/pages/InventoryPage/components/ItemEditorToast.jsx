import { useEffect, useState } from 'react';
import styles from './ItemEditorToast.module.scss';

export const ItemEditorToast = ({ Img, text, setToastOpen, delay = 2000 }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const exitTimer = setTimeout(() => setVisible(false), delay);
    const unmountTimer = setTimeout(() => setToastOpen(false), delay + 300);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [setToastOpen]);

  return (
    <div className={`${styles.container} ${visible && styles.visible}`}>
      {Img}
      <span>{text}</span>
    </div>
  );
};
