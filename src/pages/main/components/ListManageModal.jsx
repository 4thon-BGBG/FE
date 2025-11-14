import React, { useState } from 'react'
import './ListManageModal.scss'
import { Modify, Delete, Error } from '@/assets'

export const ListManageModal = ({ listName, itemCount, completedCount, onClose, onUpdateName, onDeleteList }) => {
  const [mode, setMode] = useState('main'); // 'main', 'edit', 'delete'
  const [editedName, setEditedName] = useState(listName);

  const handleDeleteList = () => {
    onDeleteList();
    onClose();
  }
  const handleSaveName = () => {
    if (!editedName.trim()) {
      alert('리스트 이름을 입력해주세요!');
      return;
    }
    onUpdateName(editedName);
    onClose();
  };


  return (
    <>
      <div className='modalOverlay' onClick={onClose} />
      <div className='listManageModal'>
        {mode === 'main' && (
          <>
            <button className='modalClose' onClick={onClose}>×</button>
            <h3 className='modalTitle'>장보기 리스트</h3>

            <div className='statsRow'>
              <div className='statItem'>
                <span className='statLabel'>구매예정 품목</span>
                <span className='statValue'>{itemCount - completedCount}</span>
              </div>
              <div className='statItem'>
                <span className='statLabel'>구매완료 품목</span>
                <span className='statValue'>{completedCount}</span>
              </div>
            </div>

            <div className='manageActions'>
              <button className='manageButton' onClick={() => setMode('edit')}>
                <img src={Modify} alt='수정' />
                리스트 이름 수정
              </button>
              <button className='manageButton danger' onClick={() => setMode('delete')}>
                <img src={Delete} alt='삭제' />
                리스트 삭제
              </button>
            </div>
          </>
        )}

        {mode === 'edit' && (
          <>
            <button className='modalClose' onClick={onClose}>×</button>
            <h3 className='modalTitle'>리스트 이름 수정</h3>

            <input
              type='text'
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className='nameInput'
              placeholder='리스트 이름'
            />

            <div className='modalButtonsWrapper'>
              <button className='cancelBtn' onClick={() => setMode('main')}>
                ✕
              </button>
              <button className='confirmBtn' onClick={handleSaveName}>
                ✓
              </button>
            </div>
          </>
        )}

        {mode === 'delete' && (
          <>
            <img src={Error} alt='경고' className='deleteIcon' />
            <p className='deleteMessage'>
              장보기 리스트를 <span className='highlight'>삭제</span>하시겠어요?
              <br />
              <span className='subMessage'>이 리스트의 품목들도 함께 삭제돼요</span>
            </p>

            <div className='modalButtonsWrapper'>
              <button className='cancelBtn' onClick={() => setMode('main')}>
                ✕
              </button>
              <button className='confirmBtn' onClick={handleDeleteList}>
                ✓
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

