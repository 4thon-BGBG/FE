import React, { useState } from 'react'
import { ItemList } from './components/ItemList'
import { AddListButton } from './components/AddListButton'
import { AddItems } from './components/AddItems'
import { AISuggestion } from './components/AISuggestion'
import './MainPage.scss';

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

  // 소진된 아이템 관리
  // TODO: 실제 통신으로 소진된 아이템 정보를 받아올 예정
  // API 예시: GET /api/exhausted-items
  // 응답 예시: { name: "귀리햇반", count: 1, categoryIndex: 7, isChecked: false }
  
  // 테스트용 - 실제로는 통신에서 받아올 데이터
  // 테스트하려면 아래 null을 주석 처리하고 그 아래 줄의 주석을 해제하세요
  //const [exhaustedItem, setExhaustedItem] = useState(null);
  const [exhaustedItem, setExhaustedItem] = useState({ name: "귀리햇반", count: 1, categoryIndex: 7, isChecked: false });
  
  // 리스트들을 배열로 관리 (통신으로 받아올 때 이 배열의 길이가 동적으로 변함)
  const [allLists, setAllLists] = useState([dummyList, dummyList2]);
  
  // 각 리스트의 이름 (실제로는 서버에서 받아올 데이터)
  const listNames = allLists.map((_, index) => `장보기 리스트 ${index + 1}`);
  
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

  // 특정 리스트의 아이템 체크 상태 토글 함수
  const handleToggleCheck = (listIndex, itemIndex) => {
    const updatedLists = [...allLists];
    updatedLists[listIndex][itemIndex] = {
      ...updatedLists[listIndex][itemIndex],
      isChecked: !updatedLists[listIndex][itemIndex].isChecked
    };
    setAllLists(updatedLists);
  };

  // 새 리스트 추가 함수
  const handleAddList = () => {
    const newList = [];
    setAllLists([...allLists, newList]);
  };

  // 소진된 아이템을 선택한 리스트에 추가
  const handleAddExhaustedItem = (listIndex, item) => {
    const updatedLists = [...allLists];
    updatedLists[listIndex] = [...updatedLists[listIndex], item];
    setAllLists(updatedLists);
    setExhaustedItem(null); // 모달 닫기
    
    // TODO: 서버에 소진된 아이템을 리스트에 추가했다고 알림
    // API 예시: POST /api/lists/${listIndex}/items
    // body: { itemId: item.id, action: 'add_exhausted' }
  };

  // 소진된 아이템 추가 모달 닫기
  const handleCancelExhaustedItem = () => {
    setExhaustedItem(null);
    
    // TODO: 서버에 소진된 아이템 알림을 무시했다고 알림
    // API 예시: POST /api/exhausted-items/dismiss
    // body: { itemId: item.id }
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
            onToggleCheck={(itemIndex) => handleToggleCheck(index, itemIndex)}
          />
          ))}
          <AddListButton onAddList={handleAddList} />
          
          {/* 소진된 아이템이 있을 때 카드 표시 */}
          {/* TODO: 실제 통신 연결 시 exhaustedItem 상태가 API 응답으로 설정됨 */}
          {exhaustedItem && (
            <AddItems 
              exhaustedItem={exhaustedItem}
              listNames={listNames}
              onAddToList={handleAddExhaustedItem}
              onCancel={handleCancelExhaustedItem}
            />
          )}
          
          {/* AI 추천 컴포넌트 */}
          <AISuggestion />
        </div>
      </div>
    )
  }
