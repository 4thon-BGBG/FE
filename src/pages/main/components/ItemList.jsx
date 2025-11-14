import React, { useState } from 'react'
import "./ItemList.scss"
import { CATEGORIES } from '../MainPage'
import { Toast } from './Toast'
import { ItemDetailModal } from './ItemDetailModal'
import { ItemInputWithQuantity } from './ItemInputWithQuantity'
import { ListManageModal } from './ListManageModal'
import { Setting } from '@/assets'
export const ItemList = ({
  items, 
  onAddItem, 
  onDeleteItem, 
  onToggleCheck, 
  onUpdateItem,
  listName = '장보기 리스트',
  onUpdateListName,
  onDeleteList,
  listId
}) => {
  const [sortType, setSortType] = useState('default'); // 'default' or 'category'
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemCount, setItemCount] = useState(1);
  const [toast, setToast] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [showManageModal, setShowManageModal] = useState(false);

  const handleSortChange = (type) => {
    setSortType(type);
  };

  const handleButtonClick = () => {
    setIsExpanded(true);
  };

  const handleCategoryClick = (index) => {
    setSelectedCategory(index);
  };

  const handleIncrement = () => {
    setItemCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (itemCount > 1) {
      setItemCount(prev => prev - 1);
    }
  };

  const handleAdd = () => {
    if (!itemName.trim() || selectedCategory === null) {
      setToast({ type: 'warning', message: '필요한 모든 항목을 입력해주세요' });
      return;
    }

    onAddItem({
      name: itemName,
      count: itemCount,
      categoryIndex: selectedCategory,
      isChecked: false
    });

    // 성공 메시지 표시
    setToast({ type: 'success', message: '리스트에 항목을 추가했어요' });

    // 초기화
    handleClose();
  };

  const handleClose = () => {
    setIsExpanded(false);
    setItemName('');
    setItemCount(1);
    setSelectedCategory(null);
  };

  // 카테고리별로 그룹화 (원본 인덱스 포함)
  const getGroupedByCategory = () => {
    const grouped = {};
    items.forEach((item, originalIndex) => {
      const categoryIndex = item.categoryIndex;
      if (!grouped[categoryIndex]) {
        grouped[categoryIndex] = [];
      }
      grouped[categoryIndex].push({ ...item, originalIndex });
    });
    return grouped;
  };

  const groupedItems = getGroupedByCategory();

  const completedCount = items.filter(item => item.isChecked).length;

  return (
    <div className='itemList'>
      <div className='listHeader'>
        <div className='listTitleSection'>
          <p className='itemName'>{listName}</p>
          <button className='settingsButton' onClick={() => setShowManageModal(true)}>
            <img src={Setting} alt='설정' />
          </button>
        </div>
        <div className='sortToggle' data-active={sortType}>
          <button 
            className={`sortOption ${sortType === 'default' ? 'active' : ''}`}
            onClick={() => handleSortChange('default')}
          >
            기본
          </button>
          <button 
            className={`sortOption ${sortType === 'category' ? 'active' : ''}`}
            onClick={() => handleSortChange('category')}
          >
            카테고리
          </button>
        </div>
      </div>
      <hr/>
      
      {sortType === 'default' ? (
        // 기본 정렬 - 원래 순서대로
        items.map((item, index) => (
          <div key={index} className={`item ${item.isImportant ? 'important' : ''}`}>
            <div className="itemContent">
              <input 
                type="checkbox" 
                checked={item.isChecked} 
                onChange={() => onToggleCheck(index)}
              />
              <div className="itemTextWrapper">
                <div className="itemNameRow">
                  <span className={item.isChecked ? "checked" : ""}>{item.name}</span>
                  <span className="count"> {item.count}</span>
                </div>
                {item.memo && <span className="itemMemo">{item.memo}</span>}
              </div>
            </div>
            <button className="deleteButton" onClick={() => setSelectedItemIndex(index)}>⋯</button>
          </div>
        ))
      ) : (
        // 카테고리 정렬 - 카테고리별로 그룹화
        Object.keys(groupedItems)
          .sort((a, b) => Number(a) - Number(b))
          .map(categoryIndex => (
            <div key={categoryIndex} className="categoryGroup">
              <div className="categoryDivider">
                <span>{CATEGORIES[categoryIndex]}</span>
              </div>
              {groupedItems[categoryIndex].map((item, itemIndex) => (
                <div key={`${categoryIndex}-${itemIndex}`} className={`item ${item.isImportant ? 'important' : ''}`}>
                  <div className="itemContent">
                    <input 
                      type="checkbox" 
                      checked={item.isChecked}
                      onChange={() => onToggleCheck(item.originalIndex)}
                    />
                    <div className="itemTextWrapper">
                      <div className="itemNameRow">
                        <span className={item.isChecked ? "checked" : ""}>{item.name}</span>
                        <span className="count"> {item.count}</span>
                      </div>
                      {item.memo && <span className="itemMemo">{item.memo}</span>}
                    </div>
                  </div>
                  <button className="deleteButton" onClick={() => setSelectedItemIndex(item.originalIndex)}>⋯</button>
                </div>
              ))}
            </div>
          ))
      )}

      {!isExpanded ? (
        <button className='addButton' onClick={handleButtonClick}>
          + 항목 추가
        </button>
      ) : (
        <div className='addButtonExpanded'>
          
          <ItemInputWithQuantity
            itemName={itemName}
            onItemNameChange={setItemName}
            itemCount={itemCount}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            placeholder='추가할 품목 입력'
          />
          <hr style={{ border: "1px solid #000" }} />
          <div className='categoryGrid'>
            {CATEGORIES.map((category, index) => (
              <button
                key={index}
                className={`categoryButton ${selectedCategory === index ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(index)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className='actionButtons'>
            <button className='cancelBtn' onClick={handleClose}>
              취소
            </button>
            <button className='addBtn' onClick={handleAdd}>
              + 추가
            </button>
    </div>
        </div>
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}

      {selectedItemIndex !== null && (
        <ItemDetailModal
          item={items[selectedItemIndex]}
          onClose={() => setSelectedItemIndex(null)}
          onUpdate={(updatedItem) => onUpdateItem(selectedItemIndex, updatedItem)}
          onDelete={() => {
            onDeleteItem(selectedItemIndex);
            setSelectedItemIndex(null);
          }}
        />
      )}

      {showManageModal && (
        <ListManageModal
          listName={listName}
          itemCount={items.length}
          completedCount={completedCount}
          onClose={() => setShowManageModal(false)}
          onUpdateName={onUpdateListName}
          onDeleteList={onDeleteList}
        />
      )}
    </div>
  )
}
