import api from '../Instance'

export const addItemApi = async (itemData) => {
  try {
    const res = await api.post('api/item', itemData);
    console.log('품목 추가 API 성공', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error('품목 추가 API 실패', error);
    return { ok: false, data: null };
  }
};

//품목 수정 api
export const updateItemApi = async (itemId, itemData) => {
  try {
    const res = await api.patch(`api/item`, itemData);
    console.log('품목 수정 API 성공', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error('품목 수정 API 실패', error);
    return { ok: false, data: null };   
  }
};

//품목 삭제 api
export const deleteItemApi = async (itemId) => {
  try {
    const res = await api.delete(`api/item/${itemId}`);
    console.log('품목 삭제 API 성공', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error('품목 삭제 API 실패', error);
    return { ok: false, data: null };
  }
};

//메모 작성 api
export const updateMemoApi = async (shoppingListId, itemId, memo) => {
  try {
    const requestBody = {
      shoppingListId,
      itemId,
      memo
    };
    const res = await api.patch(`api/item/memo`, requestBody);
    console.log('메모 작성 API 성공', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error('메모 작성 API 실패', error);
    return { ok: false, data: null };
  }
};

//품목 체크 여부 수정 api
export const updateItemCheckedApi = async (itemId, isChecked) => {
  try {
    const res = await api.patch(`api/item/${itemId}/toggle?isChecked=${isChecked}`);
    console.log('품목 체크 여부 수정 API 성공', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error('품목 체크 여부 수정 API 실패', error);
    return { ok: false, data: null };
  }
};