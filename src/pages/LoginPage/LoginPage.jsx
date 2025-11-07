import { useForm } from 'react-hook-form';
import styles from './LoginPage.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import { eyeClose, eyeOpen } from '@/assets';
import { useState } from 'react';

export const LoginPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    try {
      console.log('로그인 데이터:', data);
      // nav('/'); // TODO 추후 연결
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>로그인</div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.inputContent}>
          <div className={styles.inputField}>
            <label>아이디</label>
            <input
              placeholder="아이디를 입력해주세요."
              type="text"
              {...register('id', {
                required: '필수 입력 사항입니다.',
              })}
            />
            {errors.id && (
              <div className={styles.error}>{errors.id.message}</div>
            )}
          </div>

          <div className={styles.inputField}>
            <label>비밀번호</label>
            <div className={styles.passwordContainer}>
              <input
                placeholder="비밀번호를 입력해주세요."
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: '필수 입력 사항입니다.',
                })}
              />
              <img
                src={showPassword ? eyeOpen : eyeClose}
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>
            {errors.password && (
              <div className={styles.error}>{errors.password.message}</div>
            )}
          </div>
        </div>
        <Button isActive={isValid} text="로그인" />
      </form>
      <span className={styles.registerButton}>
        바구바구 계정이 없나요? <Link to="/register">회원가입하기</Link>
      </span>
    </div>
  );
};
