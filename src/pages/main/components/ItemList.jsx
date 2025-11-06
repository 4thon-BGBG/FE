import React from 'react'
import "./ItemList.scss"
import { AddButton } from './AddButton'
export const ItemList = ({items}) => {
  return (
    <div className='itemList'>
      <p className='itemName'>장보기 리스트</p>
      <hr/>
      {items.map((item, index) => (
        <div key={index} className="item">
          <input type="checkbox" checked={item.isChecked} />
          <span className={item.isChecked ? "checked" : ""}>{item.name}</span>
          <span className="count"> {item.count}</span>
        </div>
      ))}
      <AddButton/>
    </div>
  )
}
