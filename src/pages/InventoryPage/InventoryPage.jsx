import { useEffect, useState } from 'react';
import styles from './InventoryPage.module.scss';
import { blankBubble, glasses } from '@/assets';
import { Button } from '@/components/Button/Button';
import { inventoryData } from '@/data/inventoryMock';

const categorys = [
  '전체',
  '채소·과일류',
  '수산물',
  '육류',
  '달걀·유제품류',
  '곡류·견과류',
  '조미류·양념류',
  '냉동식품',
  '가공식품',
  '음료·주류',
  '기타',
];

export const InventoryPage = () => {
  const [allItems, setAllItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectCategory, setSelectCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('등록순');

  useEffect(() => {
    setAllItems(inventoryData);
  }, []);

  return (
    <div className={styles.container}>
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
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.categoryList}>
          {categorys.map((category, index) => (
            <div
              key={index}
              className={`${styles.category} ${
                selectCategory === category && styles.active
              }`}
              onClick={() => setSelectCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className={styles.itemListContainer}>
          <div className={styles.itemListHeader}>
            {sortBy === '재고순' ? (
              <div className={styles.exhaustedListButton}>소진품목 관리</div>
            ) : (
              <div></div>
            )}
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="등록순">등록순</option>
              <option value="이름순">이름순</option>
              <option value="재고순">재고순</option>
            </select>
          </div>
          {allItems.length === 0 ? (
            <div className={styles.blankBox}>
              <img src={blankBubble} />
              <span>
                해당하는 보유품목이 <br /> 존재하지 않아요
              </span>
            </div>
          ) : (
            <div className={styles.itemList}>
              {allItems.map((item, index) => (
                <div key={index} className={styles.itemRow} onClick={() => {}}>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemCount}>{item.count}개</span>
                </div>
              ))}
            </div>
          )}
          <div className={styles.button}>
            <Button
              text="보유품목 수동등록"
              isActive={true}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
