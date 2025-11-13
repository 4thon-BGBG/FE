import api from '../Instance';

// 닉네임 조회(마이페이지 조회) API
export const nicknameApi = async () => {
  try {
    const res = await api.get('mypage');

    console.log('닉네임 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

// 닉네임 수정 API
export const nicknameEditApi = async (nicknameData) => {
  try {
    const res = await api.patch('mypage', { nickname: nicknameData });

    console.log('닉네임 수정 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

// 장보기 내역 조회 API
export const historyApi = async (page = 1) => {
  try {
    const res = await api.get(`mypage/history?page=${page}`);

    console.log('장보기 내역 조회 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

// 장보기 분석 리포트 API
export const reportApi = async () => {
  try {
    const res = await api.get('mypage/report');

    console.log('장보기 분석 리포트 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};
