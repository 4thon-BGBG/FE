import { Splash } from './components/Splash';
import { Button } from '@/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { onBoarding1, onBoarding2 } from '@/assets';
import styles from './OnBoardingPage.module.scss';
import { useState } from 'react';
import { useSplash } from '@/hooks/useSplash';

export const OnBoardingPage = () => {
  const [step, setStep] = useState(0);
  const nav = useNavigate();
  const { isSplash, handleSplash } = useSplash();

  return (
    <>
      {!isSplash && <Splash closeFn={handleSplash} />}
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.img}>
            <img src={onBoardingItem[step].img} alt="onBoardingImg" />
          </div>
          <div className={styles.caption}>{onBoardingItem[step].caption}</div>
          {/* 점 인디케이터 */}
          <div className={styles.dots}>
            {onBoardingItem.map((_, index) => (
              <div
                key={index}
                // 현재 페이지와 인덱스가 같으면 'active' 클래스 추가
                className={`${styles.dot} ${
                  index === step ? styles.active : ''
                }`}
              ></div>
            ))}
          </div>
        </div>

        <Button
          text={
            step + 1 !== onBoardingItem.length ? '다음' : '바구바구 시작하기'
          }
          isActive={true}
          onClick={
            step + 1 !== onBoardingItem.length
              ? () => setStep((prev) => prev + 1)
              : () => {
                  nav('/login');
                }
          }
        />
      </div>
    </>
  );
};

const onBoardingItem = [
  {
    step: 1,
    caption: (
      <>
        간단하고 효율적인 장보기 관리,
        <br /> 이제 바구바구에서 함께해요
      </>
    ),
    img: onBoarding1,
  },
  {
    step: 2,
    caption: (
      <>
        유저님의 장보기 친구, <br /> AI 버디가 옆에서 도와줄게요
      </>
    ),
    img: onBoarding2,
  },
];
