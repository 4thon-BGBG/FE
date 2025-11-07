import { useEffect, useState } from 'react';
import styles from './RegisterPage.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { eyeClose, eyeOpen } from '@/assets';
import { Button } from '@/components/Button/Button';

export const RegisterPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    trigger,
    formState: { isValid, errors },
  } = useForm({
    mode: 'onChange',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [step, setStep] = useState(0);

  const handleNext = async () => {
    // 'nickname' 필드만 강제로 유효성 검사 실행
    const isStep1Valid = await trigger('nickname');

    if (isStep1Valid) {
      setStep(1); // 유효하면 2단계로 이동
    }
  };

  const onSubmit = (data) => {
    try {
      console.log('회원가입 데이터:', data);
      nav('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const passwordValue = watch('password');
  const nicknameValue = watch('nickname');

  useEffect(() => {
    if (getValues('passwordConfirm')) {
      trigger('passwordConfirm');
    }
  }, [passwordValue, trigger, getValues]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>회원가입</span>
        <div className={styles.stepBarLine}>
          <div
            className={styles.stepBar}
            style={{ width: step === 0 ? '50%' : '100%' }}
          ></div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.inputContent}>
          {step === 0 ? (
            <div className={styles.inputField}>
              <label>닉네임</label>
              <input
                key="nickname"
                placeholder="닉네임 입력"
                type="text"
                {...register('nickname', {
                  required: '필수 입력 사항입니다.',
                  minLength: {
                    value: 2,
                    message: '닉네임은 2자 이상 입력해주세요.',
                  },
                })}
              />
              {errors.nickname && (
                <div className={styles.error}>{errors.nickname.message}</div>
              )}
            </div>
          ) : (
            <>
              <div className={styles.inputField}>
                <label>아이디</label>
                <input
                  key="id"
                  placeholder="아이디 입력"
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
                    placeholder="비밀번호 입력"
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
              <div className={styles.inputField}>
                <label>비밀번호 재입력</label>
                <div className={styles.passwordContainer}>
                  <input
                    placeholder="비밀번호 입력"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    {...register('passwordConfirm', {
                      required: '필수 입력 사항입니다.',
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return (
                            password === value ||
                            '비밀번호가 일치하지 않습니다.'
                          );
                        },
                      },
                    })}
                  />
                  <img
                    src={showPasswordConfirm ? eyeOpen : eyeClose}
                    onClick={() => {
                      setShowPasswordConfirm(!showPasswordConfirm);
                    }}
                  />
                </div>
                {errors.passwordConfirm && (
                  <div className={styles.error}>
                    {errors.passwordConfirm.message}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <Button
          isActive={!errors.nickname && !!nicknameValue && isValid}
          text={step === 0 ? '다음' : '회원가입'}
          type={step === 0 ? 'button' : 'submit'}
          onClick={step === 0 ? handleNext : () => {}}
        />
      </form>
    </div>
  );
};
