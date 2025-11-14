import React from 'react'
import './AddListButton.scss'

export const AddListButton = ({ onAddList }) => {
  return (
    <button className='addListButton' onClick={onAddList}>
      새 장보기 리스트
    </button>
  )
}

