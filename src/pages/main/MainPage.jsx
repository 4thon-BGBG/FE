import React, { useState, useEffect } from 'react'
import { ItemList } from './components/ItemList'
import { AddListButton } from './components/AddListButton'
import { AddItems } from './components/AddItems'
import { AISuggestion } from './components/AISuggestion'
import { getAllListsWithItems, addListApi, deleteListApi, updateListNameApi } from '@/apis/main/main'
import { addItemApi, updateItemApi, deleteItemApi, updateMemoApi, updateItemCheckedApi } from '@/apis/main/item'
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

// 인덱스를 API 카테고리로 변환 (역방향)
const INDEX_TO_CATEGORY = [
  'VEGETABLES_FRUITS',
  'MEAT',
  'SEAFOOD',
  'EGGS_DAIRY',
  'GRAINS_NUTS',
  'SEASONINGS',
  'FROZEN_FOODS',
  'PROCESSED_FOODS',
  'BEVERAGES_ALCOHOL',
  'ETC'
];

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
  

  // API 아이템을 화면용 포맷으로 변환  
  const convertApiItemToDisplayItem = (apiItem) => {
    return {
      id: apiItem.id || apiItem.itemId, 
      name: apiItem.itemName || '',
      count: apiItem.itemCount || 1,
      categoryIndex: CATEGORY_MAP[apiItem.category] ?? 9, // 기타로 기본값
      isChecked: apiItem.ownItem ||false,  
      memo: apiItem.memo || '',
      isImportant: apiItem.isImportant === true  // boolean으로 명시적 변환
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
        const ids = result.data.map(list => list.listId);
        
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
      
      
    };
    
    loadData();
    
    // cleanup 함수: 컴포넌트 언마운트 시 실행
    return () => {
      isMounted = false;
    };
  }, []);

  
  // 특정 리스트에 아이템 추가하는 함수
  const handleAddItem = async (listIndex, newItem) => {
    // API request body 형식으로 변환
    const requestBody = {
      itemName: newItem.name,
      itemCount: newItem.count,
      itemCategory: INDEX_TO_CATEGORY[newItem.categoryIndex] || 'ETC',
      memo: newItem.memo || '',
      shoppingListId: listIds[listIndex]
    };

    const result = await addItemApi(requestBody);
    
    if (result.ok && result.data && result.data.data) {
      // API 응답에서 생성된 아이템 데이터 추출
      const createdItem = result.data.data;
      
      // API는 itemId만 반환하므로, 나머지는 입력한 데이터 사용
      const newItemWithId = {
        id: createdItem.itemId,
        name: newItem.name,
        count: newItem.count,
        categoryIndex: newItem.categoryIndex,
        isChecked: false,
        memo: newItem.memo || '',
        isImportant: false
      };
      
      // API 호출 성공 시 로컬 state 업데이트
      const updatedLists = [...allLists];
      updatedLists[listIndex] = [...updatedLists[listIndex], newItemWithId];
      setAllLists(updatedLists);
    } else {
      console.error('품목 추가 실패');
    }
  };

  // 특정 리스트의 아이템 삭제하는 함수
  const handleDeleteItem = async (listIndex, itemIndex) => {
    const item = allLists[listIndex][itemIndex];
    const itemId = item.id;
    
    const result = await deleteItemApi(itemId);
  
    
    
    if (result.ok) {
      // API 호출 성공 시 로컬 state 업데이트
      const updatedLists = [...allLists];
      updatedLists[listIndex] = updatedLists[listIndex].filter((_, index) => index !== itemIndex);
      setAllLists(updatedLists);
    } else {
      console.error('품목 삭제 실패');
    }
  };

  // 특정 리스트의 아이템 체크 상태 토글 함수
  const handleToggleCheck = async (listIndex, itemIndex) => {
    const item = allLists[listIndex][itemIndex];
    const newCheckedState = !item.isChecked;
    const itemId = item.id;
    
    if (!itemId) {
      console.error('품목 ID가 없습니다.');
      return;
    }
    
    const result = await updateItemCheckedApi(itemId, newCheckedState);
    
    if (result.ok) {
      // API 호출 성공 시 로컬 state 업데이트
      const updatedLists = [...allLists];
      updatedLists[listIndex][itemIndex] = {
        ...updatedLists[listIndex][itemIndex],
        isChecked: newCheckedState
      };
      setAllLists(updatedLists);
    } else {
      console.error('품목 체크 상태 변경 실패');
    }
  };

  // 특정 리스트의 아이템 업데이트 함수
  const handleUpdateItem = async (listIndex, itemIndex, updatedItem) => {
    // API request body 형식으로 변환
    const requestBody = {
      shoppingListId: listIds[listIndex],
      itemId: updatedItem.id,
      itemName: updatedItem.name,
      itemCount: updatedItem.count,
      category: INDEX_TO_CATEGORY[updatedItem.categoryIndex] || 'ETC'
    };

    const result = await updateItemApi(updatedItem.id, requestBody);
    
    if (result.ok) {
      // API 호출 성공 시 로컬 state 업데이트
      const updatedLists = [...allLists];
      updatedLists[listIndex][itemIndex] = updatedItem;
      setAllLists(updatedLists);
    } else {
      console.error('품목 수정 실패');
    }
  };

  // 메모 업데이트 함수
  const handleUpdateMemo = async (listIndex, itemIndex, itemId, memo) => {
    const shoppingListId = listIds[listIndex];
    const result = await updateMemoApi(shoppingListId, itemId, memo);
    
    if (result.ok) {
      // API 호출 성공 시 로컬 state 업데이트
      const updatedLists = [...allLists];
      updatedLists[listIndex][itemIndex] = {
        ...updatedLists[listIndex][itemIndex],
        memo
      };
      setAllLists(updatedLists);
    } else {
      console.error('메모 작성 실패');
    }
  };

  // 새 리스트 추가 함수
  const handleAddList = async () => {
    const newListName = `장보기 리스트 ${allLists.length + 1}`;
    const result = await addListApi(newListName);
    
    if (result.ok) {
      // API 응답에서 새 리스트 정보 추출
      const newListData = result.data.data;
      setAllLists([...allLists, []]);
      setListNames([...listNames, newListData.listName]);
      setListIds([...listIds, newListData.id]);
      console.log('리스트 추가 성공:', newListData);
    } else {
      console.error('리스트 추가 실패');
    }
  };

  // 리스트 이름 업데이트 함수
  const handleUpdateListName = async (listIndex, newName) => {
    const listId = listIds[listIndex];
    const result = await updateListNameApi(listId, newName);
    
    if (result.ok) {
      const updatedNames = [...listNames];
      updatedNames[listIndex] = newName;
      setListNames(updatedNames);
    } else {
      console.error('리스트 이름 수정 실패');
    }
  };

  // 리스트 삭제 함수
  const handleDeleteList = async (listIndex) => {
    const listId = listIds[listIndex];
    const result = await deleteListApi(listId);
    
    if (result.ok) {
      const updatedLists = allLists.filter((_, index) => index !== listIndex);
      const updatedNames = listNames.filter((_, index) => index !== listIndex);
      const updatedIds = listIds.filter((_, index) => index !== listIndex);
      setAllLists(updatedLists);
      setListNames(updatedNames);
      setListIds(updatedIds);
      console.log('리스트 삭제 성공');
    } else {
      console.error('리스트 삭제 실패');
    }
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
  const handleAddAIRecipes = async (listIndex, recipes) => {
    const shoppingListId = listIds[listIndex];
    const newItems = [];
    
    // 각 레시피를 API를 통해 추가
    for (const recipe of recipes) {
      const requestBody = {
        itemName: recipe.name,
        itemCount: 1,
        itemCategory: recipe.category,
        memo: '',
        shoppingListId
      };
      
      const result = await addItemApi(requestBody);
      
      if (result.ok && result.data && result.data.data) {
        // API 응답에서 생성된 아이템 ID 추출
        const createdItem = result.data.data;
        
        // 화면에 추가할 아이템 생성
        const newItemWithId = {
          id: createdItem.itemId,
          name: recipe.name,
          count: 1,
          categoryIndex: CATEGORY_MAP[recipe.category] ?? 9,
          isChecked: false,
          memo: '',
          isImportant: false
        };
        
        newItems.push(newItemWithId);
      }
    }
    
    // 모든 아이템을 한 번에 추가
    if (newItems.length > 0) {
      const updatedLists = [...allLists];
      updatedLists[listIndex] = [...updatedLists[listIndex], ...newItems];
      setAllLists(updatedLists);
    }
  };
  


  return (
    <div className='mainPage'>
      <div className='listItem'>
        {allLists.map((list, index) => (
          <ItemList 
            key={listIds[index] || index} 
            items={list}
            listName={listNames[index]}
            listId={listIds[index]}
            onAddItem={(newItem) => handleAddItem(index, newItem)}
            onDeleteItem={(itemIndex) => handleDeleteItem(index, itemIndex)}
            onToggleCheck={(itemIndex) => handleToggleCheck(index, itemIndex)}
            onUpdateItem={(itemIndex, updatedItem) => handleUpdateItem(index, itemIndex, updatedItem)}
            onUpdateMemo={(itemIndex, itemId, memo) => handleUpdateMemo(index, itemIndex, itemId, memo)}
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
