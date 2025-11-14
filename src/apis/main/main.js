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

// 모든 리스트와 품목을 한번에 조회 (새로운 API)
export const getAllListsWithItems = async () => {
  try {
    const res = await api.get('list/items');
    console.log('모든 리스트와 품목 조회 성공', res.data);
    return { ok: true, data: res.data.data };
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
//장바구니 품목을 보유 품목으로 이동
export const moveItemToOwnApi = async () => {
  try{
    const res = await api.post('api/owns/move-from-items');
    console.log('장바구니 품목을 보유 품목으로 이동 성공', res.data);
    return {ok : true, data : res.data};
  }catch(error){
    console.error('장바구니 품목을 보유 품목으로 이동 실패', error);
    return {ok : false, data : null}
  }
};

