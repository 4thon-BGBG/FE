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
