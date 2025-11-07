import { useEffect, useState } from 'react';
import styles from './RegisterPage.module.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/Button/Button';
import { InputField } from '@/components/form/InputField';
import { PasswordInputField } from '@/components/form/PasswordInputField';

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
  const [step, setStep] = useState(0);

  const handleNext = async () => {
    // 'nickname' 필드만 강제로 유효성 검사 실행
    const isStep1Valid = await trigger('nickname');

    if (isStep1Valid) {
      setStep(1); // 유효하면 2단계로 이동
    }
  };

  // 회원가입 제출
  const onSubmit = (data) => {
    try {
      console.log('회원가입 데이터:', data);
      nav('/login');
    } catch (error) {
      console.log(error);
    }
  };

  // 비밀번호, 닉네임 실시간 감시
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
            <InputField
              key="nickname"
              label="닉네임"
              placeholder="닉네임 입력 (2자 이상)"
              registration={register('nickname', {
                required: '필수 입력 사항입니다.',
                minLength: {
                  value: 2,
                  message: '닉네임은 2자 이상 입력해주세요.',
                },
              })}
              error={errors.nickname}
            />
          ) : (
            <>
              <InputField
                key="id"
                label="아이디"
                placeholder="아이디 입력"
                registration={register('id', {
                  required: '필수 입력 사항입니다.',
                })}
                error={errors.id}
              />
              <PasswordInputField
                label="비밀번호"
                placeholder="비밀번호 입력"
                registration={register('password', {
                  required: '필수 입력 사항입니다.',
                })}
                error={errors.password}
              />
              <PasswordInputField
                label="비밀번호 재입력"
                placeholder="비밀번호 입력"
                registration={register('passwordConfirm', {
                  required: '필수 입력 사항입니다.',
                  validate: {
                    matchesPreviousPassword: (value) => {
                      const { password } = getValues();
                      return (
                        password === value || '비밀번호가 일치하지 않습니다.'
                      );
                    },
                  },
                })}
                error={errors.passwordConfirm}
              />
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
