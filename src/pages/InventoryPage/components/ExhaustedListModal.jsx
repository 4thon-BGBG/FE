import { inventoryData } from '@/data/inventoryMock';
import styles from './ExhaustedListModal.module.scss';
import { IoClose } from 'react-icons/io5';
import { blankBubble, checkboxCheck } from '@/assets';
import { Button } from '@/components/Button/Button';
import { useState } from 'react';

export const ExhaustedListModal = ({ closeModal }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // 체크박스(라디오버튼) 클릭 핸들러(현재는 이름으로 받아오지만 고유 id로 변경해야 함)
  const handleCheckboxClick = (item) => {
    if (selectedItems.includes(item)) {
      const temp = selectedItems.filter((el) => el !== item);
      setSelectedItems(temp);
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerBlank}></div>
          <span className={styles.title}>소진품목 관리</span>
          <IoClose className={styles.closeIcon} onClick={closeModal} />
        </div>
        <div className={styles.listContainer}>
          {inventoryData.length === 0 ? (
            <div className={styles.blankBox}>
              <img src={blankBubble} />
              <span>
                3개월 이내에 소진된 <br />
                품목이 존재하지 않아요
              </span>
            </div>
          ) : (
            <div className={styles.itemList}>
              {inventoryData.map((item, index) => (
                <div key={index} className={styles.itemRow}>
                  <div
                    className={styles.left}
                    onClick={() => handleCheckboxClick(item)}
                  >
                    {selectedItems.includes(item) ? (
                      <img src={checkboxCheck} />
                    ) : (
                      <div className={styles.checkButton}></div>
                    )}
                    <span className={styles.itemName}>{item.name}</span>
                  </div>
                  <span className={styles.date}>
                    소진일자 {item.expiryDate}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedItems.length !== 0 && (
          <div className={styles.buttonContainer}>
            <div className={styles.buttonContent}>
              <Button
                text="리스트에 추가하기"
                isActive={true}
                onClick={() => {}}
                padding="11px 15px"
              />
            </div>
            <div className={styles.buttonContent}>
              <Button
                text="삭제하기"
                isActive={true}
                onClick={() => {}}
                padding="11px 15px"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
