import React, { useState } from 'react'
import "./ItemList.scss"
import { AddButton } from './AddButton'
export const ItemList = ({items, onAddItem, onDeleteItem}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCount, setNewItemCount] = useState(1);
  const [newItemChecked, setNewItemChecked] = useState(false);

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
      isChecked: newItemChecked
    });
    
    // 입력 폼 초기화
    setNewItemName('');
    setNewItemCount(1);
    setNewItemChecked(false);
    setIsAdding(false);
  };

  const handleCancel = () => {
    setNewItemName('');
    setNewItemCount(1);
    setNewItemChecked(false);
    setIsAdding(false);
  };

  return (
    <div className='itemList'>
      <p className='itemName'>장보기 리스트</p>
      <hr/>
      {items.map((item, index) => (
        <div key={index} className="item">
          <div className="itemContent">
            <input type="checkbox" checked={item.isChecked} readOnly />
            <span className={item.isChecked ? "checked" : ""}>{item.name}</span>
            <span className="count"> {item.count}</span>
          </div>
          <button className="deleteButton" onClick={() => onDeleteItem(index)}>×</button>
        </div>
      ))}
      
      {isAdding ? (
        <div className="addItemForm">
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
