import React from 'react'
import './ItemInputWithQuantity.scss'

export const ItemInputWithQuantity = ({ 
  itemName, 
  onItemNameChange, 
  itemCount, 
  onIncrement, 
  onDecrement,
  placeholder = '품목 이름',
  backgroundColor = '#FFF5E6'
}) => {
  return (
    <div className='inputWrapper' style={{ backgroundColor }}>
      <input
        type='text'
        placeholder={placeholder}
        value={itemName}
        onChange={(e) => onItemNameChange(e.target.value)}
        className='expandedInput'
      />
      <div className='quantityControl'>
        <button className='quantityButton' onClick={onDecrement}>−</button>
        <span className='quantity'>{itemCount}개</span>
        <button className='quantityButton' onClick={onIncrement}>+</button>
      </div>

    </div>
  )
}

