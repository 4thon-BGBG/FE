import styles from './Button.module.scss';

export const Button = ({
  text = 'button',
  onClick,
  isActive = false,
  padding = '17px 0',
}) => {
  return (
    <button
      className={styles.container}
      style={{
        border: `${isActive ? '1.5px' : '2px'} solid #F56E00`,
        color: isActive ? 'white' : '#F56E00',
        backgroundColor: isActive ? '#F56E00' : 'white',
        padding: padding,
      }}
      onClick={onClick}
      disabled={!isActive}
    >
      {text}
    </button>
  );
};
