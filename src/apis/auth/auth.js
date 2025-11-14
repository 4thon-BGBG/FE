import api from '../Instance';

export const registerApi = async (registerData) => {
  try {
    const res = await api.post('register', registerData);

    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: error.response.data };
  }
};

export const loginApi = async (loginData) => {
  try {
    const res = await api.post('login', loginData);

    return { ok: true, data: res.data };
  } catch (error) {
    console.error(error);
    return { ok: false, data: null };
  }
};
