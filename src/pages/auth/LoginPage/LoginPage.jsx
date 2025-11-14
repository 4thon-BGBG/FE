import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import { InputField } from '@/components/form/InputField';
import { PasswordInputField } from '@/components/form/PasswordInputField';
import { loginApi } from '@/apis/auth/auth';

export const LoginPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (loginData) => {
    try {
      const { ok, data } = await loginApi(loginData);
      if (ok && data.status === 200) {
        localStorage.setItem('accessToken', data.data.token);
        nav('/main');
      } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>로그인</div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.inputContent}>
          <InputField
            label="아이디"
            placeholder="아이디 입력"
            registration={{
              ...register('username', {
                required: '필수 입력 사항입니다.',
              }),
            }}
            error={errors.username}
          />
          <PasswordInputField
            label="비밀번호"
            placeholder="비밀번호 입력"
            registration={{
              ...register('password', {
                required: '필수 입력 사항입니다.',
              }),
            }}
            error={errors.password}
          />
        </div>
        <Button isActive={isValid} text="로그인" />
      </form>
      <span className={styles.registerButton}>
        바구바구 계정이 없나요? <Link to="/register">회원가입하기</Link>
      </span>
    </div>
  );
};
