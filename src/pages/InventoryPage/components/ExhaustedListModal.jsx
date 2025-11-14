import styles from './ExhaustedListModal.module.scss';
import { IoClose } from 'react-icons/io5';
import { blankBubble, checkboxCheck } from '@/assets';
import { Button } from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import {
  ownItemDeleteApi,
  ownItemDepletedApi,
} from '@/apis/inventory/inventory';

export const ExhaustedListModal = ({ closeModal }) => {
  const [itemData, setItemData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  // 체크박스(라디오버튼) 클릭 핸들러
  const handleCheckboxClick = (id) => {
    if (selectedItems.includes(id)) {
      const temp = selectedItems.filter((el) => el !== id);
      setSelectedItems(temp);
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    const getItemData = async () => {
      const { ok, data } = await ownItemDepletedApi();
      if (ok) {
        setItemData(data.data);
      }
    };
    getItemData();
  }, []);

  const deleteItems = async () => {
    const deletePromises = selectedItems.map((id) => {
      return ownItemDeleteApi(id);
    });

    try {
      await Promise.all(deletePromises);
      console.log('소진된 품목 삭제 완료');
      closeModal();
    } catch (error) {
      console.error('소진 품목 삭제 중 오류 발생:', error);
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
          {itemData.length === 0 ? (
            <div className={styles.blankBox}>
              <img src={blankBubble} />
              <span>
                3개월 이내에 소진된 <br />
                품목이 존재하지 않아요
              </span>
            </div>
          ) : (
            <div className={styles.itemList}>
              {itemData.map((item) => (
                <div key={item.ownId} className={styles.itemRow}>
                  <div
                    className={styles.left}
                    onClick={() => handleCheckboxClick(item.ownId)}
                  >
                    {selectedItems.includes(item.ownId) ? (
                      <img src={checkboxCheck} />
                    ) : (
                      <div className={styles.checkButton}></div>
                    )}
                    <span className={styles.itemName}>{item.ownName}</span>
                  </div>
                  <span className={styles.date}>
                    소진일자 2025-11-15
                    {/* {item.purchaseDate} */}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {selectedItems.length !== 0 && (
          <div className={styles.buttonContainer}>
            <Button
              text="소진품목 삭제하기"
              isActive={true}
              onClick={deleteItems}
              padding="11px 15px"
            />
          </div>
        )}
      </div>
    </div>
  );
};
