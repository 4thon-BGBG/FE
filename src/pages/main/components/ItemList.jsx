import React, { useState } from 'react'
import "./ItemList.scss"
import { CATEGORIES } from '../MainPage'
import { Toast } from './Toast'

export const ItemList = ({items, onAddItem, onDeleteItem, onToggleCheck}) => {
  const [sortType, setSortType] = useState('default'); // 'default' or 'category'
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [itemName, setItemName] = useState('');
  const [itemCount, setItemCount] = useState(1);
  const [toast, setToast] = useState(null);

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

  return (
    <div className='itemList'>
      <div className='listHeader'>
        <p className='itemName'>장보기 리스트</p>
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
          <div key={index} className="item">
            <div className="itemContent">
              <input 
                type="checkbox" 
                checked={item.isChecked} 
                onChange={() => onToggleCheck(index)}
              />
              <span className={item.isChecked ? "checked" : ""}>{item.name}</span>
              <span className="count"> {item.count}</span>
            </div>
            <button className="deleteButton" onClick={() => onDeleteItem(index)}>⋯</button>
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
                <div key={`${categoryIndex}-${itemIndex}`} className="item">
                  <div className="itemContent">
                    <input 
                      type="checkbox" 
                      checked={item.isChecked}
                      onChange={() => onToggleCheck(item.originalIndex)}
                    />
                    <span className={item.isChecked ? "checked" : ""}>{item.name}</span>
                    <span className="count"> {item.count}</span>
                  </div>
                  <button className="deleteButton" onClick={() => onDeleteItem(item.originalIndex)}>⋯</button>
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
          
          <div className='inputWrapper'>
            <input
              type='text'
              placeholder='추가할 품목 입력'
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className='expandedInput'
            />
            <div className='quantityControl'>
              <button className='quantityButton' onClick={handleDecrement}>−</button>
              <span className='quantity'>{itemCount}개</span>
              <button className='quantityButton' onClick={handleIncrement}>+</button>
            </div>
          </div>
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
    </div>
  )
}
