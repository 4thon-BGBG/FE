import { useRef, useState } from 'react';
import styles from './ItemEditorModal.module.scss';
import { categorys } from '@/data/category';
import { buttonCancel, buttonCheck, penIcon } from '@/assets';
import { LuPlus } from 'react-icons/lu';
import { LuMinus } from 'react-icons/lu';
import { IoIosWarning } from 'react-icons/io';
import { FaCheckCircle } from 'react-icons/fa';
import { ItemEditorToast } from './ItemEditorToast';
import { ownItemAddApi, ownItemEditApi } from '@/apis/inventory/inventory';

const TOAST_DELAY = 2000;

export const ItemEditorModal = ({
  ownId = null,
  title = '보유품목 수동등록',
  placeholder = '추가할 품목 입력',
  initName = '',
  initCount = 1,
  initCategory = '',
  initAddDate = '2025-11-08',
  closeModal,
}) => {
  const [itemName, setItemName] = useState(initName);
  const [count, setCount] = useState(initCount);
  const [category, setCategory] = useState(initCategory);
  const [addDate, setAddDate] = useState(initAddDate);
  const [failToastOpen, setFailToastOpen] = useState(false);
  const [successToastOpen, setSuccessToastOpen] = useState(false);

  const dateInputRef = useRef(null);

  const handleDateClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleSaveClick = async () => {
    if (!itemName || !category || !addDate) {
      setFailToastOpen(true);
    } else {
      // 수정인 경우
      if (ownId) {
        const { ok } = await ownItemEditApi(ownId, {
          ownName: itemName,
          ownCount: count,
          ownCategory: category,
        });
        if (ok) {
          setSuccessToastOpen(true);
          setTimeout(() => closeModal(), TOAST_DELAY + 300);
        }
      }
      // 수동 추가인 경우
      else {
        const { ok } = await ownItemAddApi({
          ownName: itemName,
          ownCount: count,
          ownCategory: category,
        });
        if (ok) {
          setSuccessToastOpen(true);
          setTimeout(() => closeModal(), TOAST_DELAY + 300);
        }
      }
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        {failToastOpen && (
          <ItemEditorToast
            Img={
              <IoIosWarning
                style={{ width: '30px', height: '30px', color: '#F56E00' }}
              />
            }
            text="필요한 모든 항목을 입력해주세요"
            setToastOpen={setFailToastOpen}
            delay={TOAST_DELAY}
          />
        )}
        {successToastOpen && (
          <ItemEditorToast
            Img={
              <FaCheckCircle
                style={{ width: '30px', height: '30px', color: '#73D7BC' }}
              />
            }
            text={
              title === '품목 상세'
                ? '수정되었습니다'
                : '리스트에 항목을 추가했어요'
            }
            setToastOpen={setSuccessToastOpen}
            delay={TOAST_DELAY}
          />
        )}
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
            <span
              className={styles.count}
              style={{ color: count === 0 && '#DD2727' }}
            >
              {count !== 0 ? `${count}개` : '소진'}
            </span>
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
          <div
            className={styles.buttonCancel}
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            <img src={buttonCancel} />
          </div>
          <div className={styles.buttonCheck} onClick={handleSaveClick}>
            <img src={buttonCheck} />
          </div>
        </div>
      </div>
    </div>
  );
};
