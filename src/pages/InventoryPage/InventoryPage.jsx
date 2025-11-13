import { useEffect, useMemo, useState } from 'react';
import styles from './InventoryPage.module.scss';
import { blankBubble, glasses } from '@/assets';
import { Button } from '@/components/Button/Button';
import { SortSelect } from './components/SortSelect';
import { categorys, LABEL_TO_KEY_MAP, KEY_TO_LABEL_MAP } from '@/data/category';
import { ItemEditorModal } from './components/ItemEditorModal';
import { ExhaustedListModal } from './components/ExhaustedListModal';
import { IoClose } from 'react-icons/io5';
import { ownItemAllApi } from '@/apis/inventory/inventory';

export const InventoryPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectCategoryKey, setSelectCategoryKey] = useState('ALL');
  const [sortBy, setSortBy] = useState('등록순');

  const [isManualEditorModalOpen, setIsManualEditorModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isExhaustedListModalOpen, setIsExhaustedListModalOpen] =
    useState(false);

  const processedList = useMemo(() => {
    const filteredItems = allItems
      .filter((item) => {
        // 카테고리 필터
        return selectCategoryKey === 'ALL'
          ? true
          : item.ownCategory === selectCategoryKey;
      })
      .filter((item) => {
        // 검색어 필터
        return item.ownName.toLowerCase().includes(searchTerm.toLowerCase());
      });

    // 사본 만들어서 작업
    const sortedItems = [...filteredItems];

    // 정렬
    if (sortBy === '등록순') {
      sortedItems.sort((a, b) => b.ownId - a.ownId);
    } else if (sortBy === '이름순') {
      sortedItems.sort((a, b) => a.ownName.localeCompare(b.ownName));
    } else if (sortBy === '재고순') {
      sortedItems.sort((a, b) => b.ownCount - a.ownCount);
    }

    return sortedItems;
  }, [allItems, selectCategoryKey, searchTerm, sortBy]);

  // API 통신
  useEffect(() => {
    const getAllItems = async () => {
      const { ok, data } = await ownItemAllApi();
      if (ok) {
        setAllItems(data.data);
      }
    };
    getAllItems();
  }, []);

  return (
    <div className={styles.container}>
      {isManualEditorModalOpen && (
        <ItemEditorModal closeModal={() => setIsManualEditorModalOpen(false)} />
      )}
      {isExhaustedListModalOpen && (
        <ExhaustedListModal
          closeModal={() => setIsExhaustedListModalOpen(false)}
        />
      )}
      <div className={styles.header}>
        <div className={styles.searchBar}>
          <img src={glasses} />
          <input
            className={styles.searchInput}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="찾으시는 품목 이름을 입력해주세요"
          />
          {searchTerm && (
            <IoClose
              className={styles.searchClose}
              onClick={() => setSearchTerm('')}
            />
          )}
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.categoryList}>
          {categorys.map((categoryLabel, index) => {
            const categoryKey = LABEL_TO_KEY_MAP[categoryLabel];
            return (
              <div
                key={index}
                className={`${styles.category} ${
                  selectCategoryKey === categoryKey && styles.active
                }`}
                onClick={() => setSelectCategoryKey(categoryKey)}
              >
                {categoryLabel}
              </div>
            );
          })}
        </div>
        <div className={styles.itemListContainer}>
          <div className={styles.itemListHeader}>
            {sortBy === '재고순' ? (
              <div
                className={styles.exhaustedListButton}
                onClick={() => setIsExhaustedListModalOpen(true)}
              >
                소진품목 관리
              </div>
            ) : (
              <div></div>
            )}
            <SortSelect setSelected={setSortBy} />
          </div>
          {processedList.length === 0 ? (
            <div className={styles.blankBox}>
              <img src={blankBubble} />
              <span>
                해당하는 보유품목이 <br /> 존재하지 않아요
              </span>
            </div>
          ) : (
            <div className={styles.itemList}>
              {processedList.map((item) => (
                <div
                  key={item.ownId}
                  className={styles.itemRow}
                  onClick={() => setEditingItemId(item.ownId)}
                >
                  {editingItemId === item.ownId && (
                    <ItemEditorModal
                      ownId={item.ownId}
                      title="품목 상세"
                      initName={item.ownName}
                      initCount={item.ownCount}
                      initCategory={KEY_TO_LABEL_MAP[item.ownCategory]}
                      initAddDate={item.expiryDate}
                      placeholder={item.name}
                      closeModal={() => setEditingItemId(null)}
                    />
                  )}
                  <span className={styles.itemName}>{item.ownName}</span>
                  <span className={styles.itemCount}>{item.ownCount}개</span>
                </div>
              ))}
            </div>
          )}
          <div className={styles.button}>
            <Button
              text="보유품목 수동등록"
              isActive={true}
              onClick={() => setIsManualEditorModalOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
