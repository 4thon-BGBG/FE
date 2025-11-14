import api from '../Instance';

// 모든 리스트 조회
export const searchListApi = async () => {
  try {
    const res = await api.get('list');
    console.log('모든 리스트 조회 성공', res.data);
    return { ok: true, data: res.data.data };
  } catch (error) {
    console.error('리스트 조회 실패:', error);
    return { ok: false, data: null };
  }
};

// 특정 리스트의 품목 조회
export const getItemsByListId = async (Id) => {
  try {
    const res = await api.get(`api/item/${Id}`);
    console.log(`리스트 ${Id} 품목 조회 성공`, res.data);
    return { ok: true, data: res.data.data };
  } catch (error) {
    console.error(`리스트 ${Id} 품목 조회 실패:`, error);
    return { ok: false, data: [] };
  }
};

// 모든 리스트와 각 리스트의 품목을 함께 조회
export const getAllListsWithItems = async () => {
  try {
    // 1. 모든 리스트 조회
    const listsResult = await searchListApi();
    if (!listsResult.ok) {
      return { ok: false, data: null };
    }

    // 2. 각 리스트의 품목 조회
    const listsWithItems = await Promise.all(
      listsResult.data.map(async (list) => {
        const itemsResult = await getItemsByListId(list.id);
        return {
          ...list,
          items: itemsResult.ok ? itemsResult.data : []
        };
      })
    );

    console.log('모든 리스트와 품목 조회 성공', listsWithItems);
    return { ok: true, data: listsWithItems };
  } catch (error) {
    console.error('리스트와 품목 조회 실패:', error);
    return { ok: false, data: null };
  }
};
//품목 추가 api
export const addListApi = async (listName) => {
  try{
    const res = await api.post('list', { listName });
    console.log('리스트 추가 성공', res.data);
    return {ok : true, data : res.data};
  }catch(error){
    console.error('리스트 추가 실패', error);
    return {ok : false, data : null}
  }
};

export const deleteListApi = async (Id) => {
  try{
    const res = await api.delete(`list/${Id}`);
    console.log('리스트 삭제 성공', res.data);
    return {ok : true, data : res.data};
  }catch(error){
    console.error('리스트 삭제 실패', error);
    return {ok : false, data : null}
  }
};

//리스트 이름 수정 api
export const updateListNameApi = async (Id, listName) => {
  try{
    const res = await api.patch(`list/${Id}?listName=${encodeURIComponent(listName)}`);
    console.log('리스트 이름 수정 성공', res.data);
    return {ok : true, data : res.data};
  }catch(error){
    console.error('리스트 이름 수정 실패', error);
    return {ok : false, data : null}
  }
};