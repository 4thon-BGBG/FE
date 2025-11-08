import { useRef, useState } from 'react';
import styles from './ItemEditorModal.module.scss';
import { categorys } from '@/data/category';
import { buttonCancel, buttonCheck, penIcon } from '@/assets';
import { LuPlus } from 'react-icons/lu';
import { LuMinus } from 'react-icons/lu';

export const ItemEditorModal = ({
  title = '보유품목 수동등록',
  placeholder = '추가할 품목 입력',
  initName = '',
  initCount = 1,
  initCategory = null,
  initAddDate = '2025-11-08',
  closeModal,
}) => {
  const [itemName, setItemName] = useState(initName);
  const [count, setCount] = useState(initCount);
  const [category, setCategory] = useState(initCategory);
  const [addDate, setAddDate] = useState(initAddDate);
  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <span className={styles.title}>{title}</span>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputName}
            type="text"
            placeholder={placeholder}
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <div className={styles.countPicker}>
            <button
              className={styles.picker}
              onClick={() => setCount(count - 1)}
              disabled={!count}
            >
              <LuMinus className={styles.pickerImg} />
            </button>
            <span className={styles.count}>{count}개</span>
            <button
              className={styles.picker}
              onClick={() => setCount(count + 1)}
            >
              <LuPlus className={styles.pickerImg} />
            </button>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          {categorys.map((c, index) => (
            <div
              key={index}
              className={`${styles.category} ${
                c === category && styles.active
              }`}
              onClick={() => setCategory(c)}
            >
              {c}
            </div>
          ))}
        </div>
        <div className={styles.addDateContainer}>
          <span className={styles.dateTitle}>구매일자(등록일자)</span>
          <div className={styles.date}>
            <input
              id="addDate"
              type="date"
              ref={dateInputRef}
              value={addDate}
              onChange={(e) => setAddDate(e.target.value)}
            />

            <span>{addDate}</span>
            <img src={penIcon} onClick={handleDateClick} />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonCancel} onClick={closeModal}>
            <img src={buttonCancel} />
          </div>
          <div
            className={styles.buttonCheck}
            onClick={() => {
              closeModal();
            }}
          >
            <img src={buttonCheck} />
          </div>
        </div>
      </div>
    </div>
  );
};
