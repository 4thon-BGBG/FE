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