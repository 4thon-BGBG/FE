import { inventoryData } from '@/data/inventoryMock';
import styles from './HistoryModal.module.scss';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';

export const HistoryModal = ({ closeModal }) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(5); // 전체 페이지 수

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerBlank}></div>
          <span className={styles.title}>나의 장보기 내역</span>
          <IoClose className={styles.closeIcon} onClick={closeModal} />
        </div>
        <div className={styles.listContainer}>
          <div className={styles.itemList}>
            {inventoryData.slice(0, 10).map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.left}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemCount}>{item.count}개</span>
                </div>
                <span className={styles.date}>구매일자 {item.expiryDate}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.paginationContent}>
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1} // 1페이지면 비활성화
          >
            이전
          </button>
          <div className={styles.pageNumberContent}>
            {pageNumbers.map((number) => (
              <span
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`${styles.pageNumber} ${
                  currentPage === number ? styles.active : ''
                }`} // 현재 페이지만 활성 스타일
              >
                {number}
              </span>
            ))}
          </div>

          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages} // 마지막 페이지
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};
