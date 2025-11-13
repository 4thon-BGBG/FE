import React, { useState, useEffect } from 'react'
import { ItemList } from './components/ItemList'
import { AddListButton } from './components/AddListButton'
import { AddItems } from './components/AddItems'
import { AISuggestion } from './components/AISuggestion'
import { getAllListsWithItems } from '@/apis/main/main'
import { logoWihte } from '@/assets'
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

// API 카테고리를 인덱스로 변환
const CATEGORY_MAP = {
  'VEGETABLES_FRUITS': 0,
  'MEAT': 1,
  'SEAFOOD': 2,
  'EGGS_DAIRY': 3,
  'GRAINS_NUTS': 4,
  'SEASONINGS': 5,
  'FROZEN_FOODS': 6,
  'PROCESSED_FOODS': 7,
  'BEVERAGES_ALCOHOL': 8,
  'ETC': 9
};

export const MainPage = () => {
  // 소진된 아이템 관리
  // TODO: 실제 통신으로 소진된 아이템 정보를 받아올 예정
  // API 예시: GET /api/exhausted-items
  // 응답 예시: { name: "귀리햇반", count: 1, categoryIndex: 7, isChecked: false }
  
  // 테스트용 - 실제로는 통신에서 받아올 데이터
  // 테스트하려면 아래 null을 주석 처리하고 그 아래 줄의 주석을 해제하세요
  const [exhaustedItem, setExhaustedItem] = useState(null);
  //const [exhaustedItem, setExhaustedItem] = useState({ name: "귀리햇반", count: 1, categoryIndex: 7, isChecked: false });
  
  // 리스트들을 배열로 관리 (API에서 받아온 데이터)
  const [allLists, setAllLists] = useState([]);
  
  // 각 리스트의 이름과 ID (서버에서 받아올 데이터)
  const [listNames, setListNames] = useState([]);
  const [listIds, setListIds] = useState([]);
  
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(true);

  // API 아이템을 화면용 포맷으로 변환  
  const convertApiItemToDisplayItem = (apiItem) => {
    return {
      name: apiItem.itemName || '',
      count: apiItem.itemCount || 1,
      categoryIndex: CATEGORY_MAP[apiItem.category] ?? 9, // 기타로 기본값
      isChecked: apiItem.isChecked || false,
      memo: apiItem.memo || '',
      isImportant: apiItem.isImportant || false
    };
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      const result = await getAllListsWithItems();
      
      console.log('API 원본 응답:', result.data);
      
      // 컴포넌트가 마운트된 상태일 때만 state 업데이트
      if (isMounted && result.ok && result.data) {
        // API 데이터를 화면용 포맷으로 변환
        const lists = result.data.map(list => {
          const items = list.items || [];
          return items.map(item => convertApiItemToDisplayItem(item));
        });
        const names = result.data.map(list => list.listName);
        const ids = result.data.map(list => list.id);
        
        setAllLists(lists);
        setListNames(names);
        setListIds(ids);
        
        console.log('변환된 데이터:', { lists, names, ids });
      } else if (isMounted) {
        console.error('데이터 로드 실패');
        setAllLists([]);
        setListNames([]);
        setListIds([]);
      }
      
      if (isMounted) {
        setIsLoading(false);
      }
    };
    
    loadData();
    
    // cleanup 함수: 컴포넌트 언마운트 시 실행
    return () => {
      isMounted = false;
    };
  }, []);

  
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

  // 특정 리스트의 아이템 업데이트 함수
  const handleUpdateItem = (listIndex, itemIndex, updatedItem) => {
    const updatedLists = [...allLists];
    updatedLists[listIndex][itemIndex] = updatedItem;
    setAllLists(updatedLists);
  };

  // 새 리스트 추가 함수
  const handleAddList = async () => {
    // TODO: API 호출하여 새 리스트 생성
    // API 예시: POST /api/list
    // body: { listName: `장보기 리스트 ${allLists.length + 1}` }
    // 응답: { id: newId, listName: "장보기 리스트 N" }
    
    const newList = [];
    const newListName = `장보기 리스트 ${allLists.length + 1}`;
    setAllLists([...allLists, newList]);
    setListNames([...listNames, newListName]);
    setListIds([...listIds, null]); // 실제로는 API 응답에서 받은 ID
  };

  // 리스트 이름 업데이트 함수
  const handleUpdateListName = (listIndex, newName) => {
    const updatedNames = [...listNames];
    updatedNames[listIndex] = newName;
    setListNames(updatedNames);
  };

  // 리스트 삭제 함수
  const handleDeleteList = async (listIndex) => {
    // TODO: API 호출하여 리스트 삭제
    // API 예시: DELETE /api/list/${listIds[listIndex]}
    
    const updatedLists = allLists.filter((_, index) => index !== listIndex);
    const updatedNames = listNames.filter((_, index) => index !== listIndex);
    const updatedIds = listIds.filter((_, index) => index !== listIndex);
    setAllLists(updatedLists);
    setListNames(updatedNames);
    setListIds(updatedIds);
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

  // AI 추천으로부터 재료 추가하는 함수
  const handleAddAIRecipes = (listIndex, recipes) => {
    const updatedLists = [...allLists];
    // 각 레시피를 아이템으로 변환하여 추가
    const newItems = recipes.map(recipe => ({
      name: recipe,
      count: 1,
      categoryIndex: 9, // 기타 카테고리
      isChecked: false
    }));
    updatedLists[listIndex] = [...updatedLists[listIndex], ...newItems];
    setAllLists(updatedLists);
  };
  
  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return (
      <div className='mainPage'>
        <logoWihte/>
      </div>
    );
  }

  return (
    <div className='mainPage'>
      <div className='listItem'>
        {allLists.map((list, index) => (
          <ItemList 
            key={listIds[index] || index} 
            items={list}
            listName={listNames[index]}
            onAddItem={(newItem) => handleAddItem(index, newItem)}
            onDeleteItem={(itemIndex) => handleDeleteItem(index, itemIndex)}
            onToggleCheck={(itemIndex) => handleToggleCheck(index, itemIndex)}
            onUpdateItem={(itemIndex, updatedItem) => handleUpdateItem(index, itemIndex, updatedItem)}
            onUpdateListName={(newName) => handleUpdateListName(index, newName)}
            onDeleteList={() => handleDeleteList(index)}
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
          <AISuggestion 
            listNames={listNames}
            onAddRecipes={handleAddAIRecipes}
          />
        </div>
      </div>
    )
  }
