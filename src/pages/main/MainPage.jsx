import React, { useState } from 'react'
import { ItemList } from './components/ItemList'
import './MainPage.scss'

// 카테고리 목록
export const CATEGORIES = [
  "채소·과일류",
  "육류",
  "수산물",
  "달걀·유제품류",
  "곡류·건과류",
  "조미료·양념류",
  "냉동식품",
  "가공식품",
  "음료·주류",
  "기타"
];

export const MainPage = () => {
  const dummyList=[
    {name: "훈제 닭가슴살", count : 3, isChecked: false, categoryIndex: 1},
    {name: "친환경 무농약인증 1등급 대관오령 한우 설도살", count : 1, isChecked: false, categoryIndex: 1},
    {name: "저지방우유", count : 1, isChecked: false, categoryIndex: 3},
    {name: "체다치즈", count : 10, isChecked: true, categoryIndex: 3},
    {name: "냉동 만두", count : 2, isChecked: true, categoryIndex: 6},
  ];
  const dummyList2=[
    {name: "훈제 닭가슴살", count : 3, isChecked: false, categoryIndex: 1},
    {name: "우유", count : 3, isChecked: false, categoryIndex: 3},
    {name: "친환경 무농약인증 1등급 대관오령 한우 설도살", count : 3, isChecked: false, categoryIndex: 1},
    {name: "냉동 만두", count : 2, isChecked: true, categoryIndex: 6},
    {name: "양배추", count : 1, isChecked: true, categoryIndex: 0},
  ];
  
  // 리스트들을 배열로 관리 (통신으로 받아올 때 이 배열의 길이가 동적으로 변함)
  const [allLists, setAllLists] = useState([dummyList, dummyList2]);
  
  // 특정 리스트에 아이템 추가하는 함수
  const handleAddItem = (listIndex, newItem) => {
    const updatedLists = [...allLists];
    updatedLists[listIndex] = [...updatedLists[listIndex], newItem];
    setAllLists(updatedLists);
  };

  // 특정 리스트의 아이템 삭제하는 함수
  const handleDeleteItem = (listIndex, itemIndex) => {
    const updatedLists = [...allLists];
    updatedLists[listIndex] = updatedLists[listIndex].filter((_, index) => index !== itemIndex);
    setAllLists(updatedLists);
  };
  
  return (
    <div className='mainPage'>
      <div className='listItem'>
        {allLists.map((list, index) => (
          <ItemList 
            key={index} 
            items={list} 
            onAddItem={(newItem) => handleAddItem(index, newItem)}
            onDeleteItem={(itemIndex) => handleDeleteItem(index, itemIndex)}
          />
        ))}
      </div>
    </div>
  )
}
