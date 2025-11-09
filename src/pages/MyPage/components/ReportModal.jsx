import { IoClose } from 'react-icons/io5';
import styles from './ReportModal.module.scss';
import { AnalyzingImg, blankBubble } from '@/assets';
import { useEffect, useState } from 'react';
import { reportMockData } from '@/data/reportMock';

export const ReportModal = ({ closeModal }) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setReportData(reportMockData);
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.backdrop}>
      <div
        className={`${styles.container} ${
          !loading && reportData && styles.isFetch
        } ${(loading || reportData) && styles.height100}`}
      >
        <div className={styles.header}>
          <div className={styles.headerBlank}></div>
          <span className={styles.title}>나의 장보기 분석 리포트</span>
          <IoClose className={styles.closeIcon} onClick={closeModal} />
        </div>
        <div className={styles.content}>
          {loading === true ? (
            <div className={styles.loadingImg}>
              <img src={AnalyzingImg} />
            </div>
          ) : !reportData ? (
            <div className={styles.blankBox}>
              <img src={blankBubble} />
              <span>아직 바구바구에서 장 본 내역이 없어요</span>
            </div>
          ) : (
            <div className={styles.reportContent}>
              <div className={styles.reportText}>
                <p>
                  {reportData.userName}님의 <br />
                  {reportData.analysisMonth}월 장보기 내역을 분석한 결과,
                </p>
                <p>
                  평균 장보기 주기는{' '}
                  <span>{reportData.summary.avgShoppingCycle}일</span>이고
                  <br />
                  보통{' '}
                  <span>
                    {reportData.summary.mostFrequentDay}{' '}
                    {reportData.summary.mostFrequentTime}
                  </span>
                  에 가장 장을 많이 봐요!
                </p>
                <p>
                  평균 장보는 규모(품목 가짓수)는{' '}
                  <span>{reportData.summary.avgItemsPerTrip}개</span>예요!
                </p>
              </div>
              <div className={styles.chartContainer}>{/* 차트 넣기 */}</div>
              <div className={styles.reportText}>
                <p>
                  가장 많이 구매한 카테고리는
                  <br />
                  <span>{reportData.categoryReport.topCategory}</span>이에요!
                </p>
              </div>
              <div className={styles.chartContainer}>{/* 차트 넣기 */}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
