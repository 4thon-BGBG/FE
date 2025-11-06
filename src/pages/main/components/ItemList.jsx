import React, { useState } from 'react'
import "./ItemList.scss"
import { AddButton } from './AddButton'
import { CATEGORIES } from '../MainPage'

export const ItemList = ({items, onAddItem, onDeleteItem}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCount, setNewItemCount] = useState(1);
  const [newItemChecked, setNewItemChecked] = useState(false);
  const [newItemCategory, setNewItemCategory] = useState(0);
  const [sortType, setSortType] = useState('default'); // 'default' or 'category'

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSubmit = () => {
    if (newItemName.trim() === '') {
      alert('항목 이름을 입력해주세요!');
      return;
    }
    
    onAddItem({
      name: newItemName,
      count: newItemCount,
      isChecked: newItemChecked,
      categoryIndex: newItemCategory
    });
    
    // 입력 폼 초기화
    setNewItemName('');
    setNewItemCount(1);
    setNewItemChecked(false);
    setNewItemCategory(0);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setNewItemName('');
    setNewItemCount(1);
    setNewItemChecked(false);
    setNewItemCategory(0);
    setIsAdding(false);
  };

  const handleSortChange = (type) => {
    setSortType(type);
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
              <input type="checkbox" checked={item.isChecked} readOnly />
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
                    <input type="checkbox" checked={item.isChecked} readOnly />
                    <span className={item.isChecked ? "checked" : ""}>{item.name}</span>
                    <span className="count"> {item.count}</span>
                  </div>
                  <button className="deleteButton" onClick={() => onDeleteItem(item.originalIndex)}>⋯</button>
                </div>
              ))}
            </div>
          ))
      )}
      
      {isAdding ? (
        <div className="addItemForm">
          <select 
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(Number(e.target.value))}
            className="categorySelect"
          >
            {CATEGORIES.map((category, index) => (
              <option key={index} value={index}>{category}</option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="항목 이름" 
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="itemNameInput"
          />
          <input 
            type="number" 
            placeholder="수량" 
            value={newItemCount}
            onChange={(e) => setNewItemCount(Number(e.target.value))}
            min="1"
            className="itemCountInput"
          />
          <label className="checkboxLabel">
            <input 
              type="checkbox" 
              checked={newItemChecked}
              onChange={(e) => setNewItemChecked(e.target.checked)}
            />
            <span>완료</span>
          </label>
          <div className="formButtons">
            <button onClick={handleSubmit} className="submitButton">추가</button>
            <button onClick={handleCancel} className="cancelButton">취소</button>
          </div>
        </div>
      ) : (
        <AddButton onAddItem={handleAddClick}/>
      )}
    </div>
  )
}
