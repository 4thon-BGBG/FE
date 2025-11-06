import React from 'react'
import './AddButton.scss'
export const AddButton = ({onAddItem}) => {
  return (
    <button className='addButton' onClick={onAddItem}> + 항목 추가</button>
  )
}
