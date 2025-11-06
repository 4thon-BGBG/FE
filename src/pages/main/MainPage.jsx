import React from 'react'
import { ItemList } from './components/ItemList'
import './MainPage.scss'
export const MainPage = () => {
  const dummyList=[
    {name: "훈제 닭가슴살", count : 3, isChecked: false},
    {name: "우유", count : 3, isChecked: false},
    {name: "친환경 무농약인증 1등급 대관오령 한우 설도살", count : 3, isChecked: false},
    {name: "냉동 만두", count : 2, isChecked: true},
    {name: "양배추", count : 1, isChecked: true},
  ];
  const dummyList2=[
    {name: "훈제 닭가슴살", count : 3, isChecked: false},
    {name: "우유", count : 3, isChecked: false},
    {name: "친환경 무농약인증 1등급 대관오령 한우 설도살", count : 3, isChecked: false},
    {name: "냉동 만두", count : 2, isChecked: true},
    {name: "양배추", count : 1, isChecked: true},
  ];
  
  // 리스트들을 배열로 관리 (통신으로 받아올 때 이 배열의 길이가 동적으로 변함)
  const allLists = [dummyList, dummyList2];
  
  return (
    <div className='mainPage'>
      <div className='listItem'>
        {allLists.map((list, index) => (
        <ItemList key={index} items={list} />
      ))}
      </div>
    </div>
  )
}
