import React, { useState } from 'react'
import './AddItems.scss'

export const AddItems = ({ exhaustedItem, listNames, onAddToList, onCancel }) => {
  const [selectedListIndex, setSelectedListIndex] = useState(0);

  const handleConfirm = () => {
    onAddToList(selectedListIndex, exhaustedItem);
  };

  return (
    <div className='addItemsCard'>
      <h3 className='modalTitle'>
        소진된 <span className='itemName'>{exhaustedItem.name}</span>을 리스트에 추가할까요?
      </h3>
      
      <div className='listSelector'>
        <label>추가할 리스트:</label>
        <select 
          value={selectedListIndex}
          onChange={(e) => setSelectedListIndex(Number(e.target.value))}
        >
          {listNames.map((name, index) => (
            <option key={index} value={index}>{name}</option>
          ))}
        </select>
        <button className='refreshButton'>🔄</button>
      </div>

      <div className='modalButtons'>
        <button className='cancelButton' onClick={onCancel}>
          ✕
        </button>
        <button className='confirmButton' onClick={handleConfirm}>
          ✓
        </button>
      </div>
    </div>
  )
}
