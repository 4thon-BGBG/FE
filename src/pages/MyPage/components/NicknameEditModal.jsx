import { useState } from 'react';
import styles from './NicknameEditModal.module.scss';
import { buttonCancel, buttonCheck } from '@/assets';
import { nicknameEditApi } from '@/apis/mypage/mypage';

export const NicknameEditModal = ({ nickname, closeModal }) => {
  const [modifyNickname, setModifyNickname] = useState(nickname);

  const handleSaveClick = async () => {
    const { ok } = await nicknameEditApi(modifyNickname);
    if (ok) {
      closeModal();
    }
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.container}>
        <span className={styles.title}>닉네임 수정</span>
        <div className={styles.inputContainer}>
          <input
            className={styles.inputName}
            type="text"
            placeholder={nickname}
            value={modifyNickname}
            onChange={(e) => setModifyNickname(e.target.value)}
          />
        </div>
        <div className={styles.buttonContainer}>
          <div
            className={styles.buttonCancel}
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
          >
            <img src={buttonCancel} />
          </div>
          <div className={styles.buttonCheck} onClick={handleSaveClick}>
            <img src={buttonCheck} />
          </div>
        </div>
      </div>
    </div>
  );
};
