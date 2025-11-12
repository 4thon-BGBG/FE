import api from '../Instance';

export const registerApi = async (registerData) => {
  try {
    console.log(registerData);

    const res = await api.post('register', registerData);

    console.log('회원가입 성공:', res.data);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};

export const loginApi = async (loginData) => {
  try {
    console.log(loginData);

    const res = await api.post('login', loginData);

    console.log('로그인 성공:', res.data);
    localStorage.setItem('accessToken', res.data.data.token);
    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};
