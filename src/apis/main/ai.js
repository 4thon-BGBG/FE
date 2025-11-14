import api from '../Instance'

//메뉴 기반 AI 재료 추천 api
export const getAIMenuRecommendation = async (menu) => {
  try {
    const res = await api.post(`recommend?menu=${encodeURIComponent(menu)}`);
    console.log('메뉴 기반 AI 재료 추천 API 성공', res.data);
    return { ok: true, data: res.data.data };
  } catch (error) {
    console.error('메뉴 기반 AI 재료 추천 API 실패', error);
    return { ok: false, data: null };
  }
};