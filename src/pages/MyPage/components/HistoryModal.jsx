import { inventoryData } from '@/data/inventoryMock';
import styles from './HistoryModal.module.scss';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { historyApi } from '@/apis/mypage/mypage';

export const HistoryModal = ({ closeModal }) => {
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [totalPages, setTotalPages] = useState(5); // 전체 페이지 수
  const [historyItems, setHistoryItems] = useState([]);
  const [pageNumbers, setPageNumbers] = useState([]); // 현재 페이지가 속한 그룹

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

  useEffect(() => {
    const pagesPerGroup = 5; // 한 번에 보여줄 페이지 번호 개수
    // 현재 페이지가 속한 그룹 계산
    const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
    const startPage = currentGroup * pagesPerGroup + 1; // 현재 그룹의 시작 페이지 번호
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages); // 현재 그룹의 마지막 페이지 번호

    // 표시할 페이지 번호 배열 생성
    const tempPageNumbers = [];
    if (totalPages > 0) {
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }
    setPageNumbers(tempPageNumbers);
  }, [currentPage]);

  useEffect(() => {
    const getHistoryItems = async () => {
      const { ok, data } = await historyApi(currentPage);
      if (ok) {
        console.log('구매 기록 불러오기 성공', data);
        setTotalPages(data.totalPages);
        setHistoryItems(data.content);
      }
    };
    getHistoryItems();
  }, [currentPage]);

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
            {historyItems.slice(0, 10).map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.left}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemCount}>{item.count}개</span>
                </div>
                <span className={styles.date}>
                  구매일자 {item.purchaseDate}
                </span>
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
