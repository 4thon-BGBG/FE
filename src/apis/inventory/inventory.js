import api from '../Instance';

// 보유 품목 전체 조회 API
export const ownItemAllApi = async () => {
  try {
    const res = await api.get('api/owns');

    console.log('보유 품목 조회 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

// 보유 품목 수동 추가 API
export const ownItemAddApi = async (itemData) => {
  try {
    const res = await api.post('api/owns', {
      nickname: itemData.ownName,
      ownCount: itemData.ownCount,
      ownCategory: itemData.ownCategory,
    });

    console.log('보유 품목 수정 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

// 보유 품목 단건 조회 API
export const ownItemOneApi = async (ownId) => {
  try {
    const res = await api.get(`api/owns/${ownId}`);

    console.log('보유 품목 단건 조회 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

// 보유 품목 삭제 API
export const ownItemDeleteApi = async (ownId) => {
  try {
    const res = await api.delete(`api/owns/${ownId}`);

    console.log('보유 품목 삭제 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

// 보유 품목 수정 API
export const ownItemEditApi = async (ownId, data) => {
  try {
    const res = await api.patch(`api/owns/${ownId}`, {
      ownName: data.ownName,
      ownCount: data.ownCount,
      ownCategory: data.ownCategory,
    });

    console.log('보유 품목 수정 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

// 보유 품목 소진된 품목 조회 API
export const ownItemDepletedApi = async () => {
  try {
    const res = await api.get(`api/owns/depleted`);

    console.log('소진된 품목 조회 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};
