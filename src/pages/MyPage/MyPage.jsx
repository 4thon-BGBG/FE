import { blankBubble, logoOpacity, profileImg, reportImg } from '@/assets';
import styles from './MyPage.module.scss';
import { inventoryData } from '@/data/inventoryMock';
import { IoMdSearch } from 'react-icons/io';
import { RiMore2Fill } from 'react-icons/ri';
import { MdEdit } from 'react-icons/md';
import { Button } from '@/components/Button/Button';
import { useState } from 'react';
import { NicknameEditModal } from './components/NicknameEditModal';
import { HistoryModal } from './components/HistoryModal';
import { ReportModal } from './components/ReportModal';

export const MyPage = () => {
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      {isNicknameModalOpen && (
        <NicknameEditModal
          nickname={'멋쟁이사자'}
          closeModal={() => setIsNicknameModalOpen(false)}
        />
      )}
      {isHistoryModalOpen && (
        <HistoryModal closeModal={() => setIsHistoryModalOpen(false)} />
      )}
      {isReportModalOpen && (
        <ReportModal closeModal={() => setIsReportModalOpen(false)} />
      )}
      {/* 프로필 */}
      <div className={styles.profileContent}>
        <div className={styles.profile}>
          <img src={profileImg} alt="" />
        </div>
        <div className={styles.info}>
          <div
            className={styles.nickname}
            onClick={() => setIsNicknameModalOpen(true)}
          >
            <span>멋쟁이사자</span>
            <MdEdit className={styles.nicknameEdit} />
          </div>
          <span className={styles.latest}>
            마지막 장보기<span>{3}일 전</span>
          </span>
        </div>
        <img src={logoOpacity} className={styles.profileImg} alt="" />
      </div>
      {/* 나의 장보기 내역 */}
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <span className={styles.contentTitle}>나의 장보기 내역</span>
          <IoMdSearch className={styles.contentIcon} />
        </div>
        {inventoryData.length === 0 ? (
          <div className={styles.blankBox}>
            <img src={blankBubble} />
            <span>아직 바구바구에서 장 본 내역이 없어요</span>
          </div>
        ) : (
          <div className={styles.historyList}>
            {inventoryData.slice(0, 3).map((item) => (
              <div key={item.id} className={styles.itemRow}>
                <div className={styles.left}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemCount}>{item.count}개</span>
                </div>
                <span className={styles.date}>구매일자 {item.expiryDate}</span>
              </div>
            ))}
            {inventoryData.length > 3 && (
              <div
                className={styles.iconRow}
                onClick={() => {
                  setIsHistoryModalOpen(true);
                }}
              >
                <RiMore2Fill className={styles.contentIcon} />
              </div>
            )}
          </div>
        )}
      </div>
      {/* 나의 장보기 분석 리포트 */}
      <div className={styles.content}>
        <div className={styles.contentHeader}>
          <span className={styles.contentTitle}>나의 장보기 분석 리포트</span>
        </div>
        <div className={styles.contentImg}>
          <img src={reportImg} />
        </div>
        <div className={styles.button}>
          <Button
            text="분석 시작하기"
            isActive={true}
            onClick={() => setIsReportModalOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};
