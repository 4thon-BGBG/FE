import React, { useState } from 'react'
import './ItemDetailModal.scss'
import { CATEGORIES } from '../MainPage'
import { Modify } from '@/assets'
import { Delete } from '@/assets'
import { Memo } from '@/assets'
import { Error } from '@/assets'
import { ItemInputWithQuantity } from './ItemInputWithQuantity'
export const ItemDetailModal = ({ item, onClose, onUpdate, onDelete, onUpdateMemo, onToggleImportant, listId }) => {
  const [mode, setMode] = useState('detail'); // 'detail', 'edit', 'memo', 'delete'
  const [editedName, setEditedName] = useState(item.name);
  const [editedCount, setEditedCount] = useState(item.count);
  const [editedCategory, setEditedCategory] = useState(item.categoryIndex);
  const [memo, setMemo] = useState(item.memo || '');
  const [isImportant, setIsImportant] = useState(item.isImportant || false); // 로컬 전용

  const handleIncrement = () => {
    setEditedCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (editedCount > 1) {
      setEditedCount(prev => prev - 1);
    }
  };

  const handleSaveEdit = () => {
    onUpdate({
      ...item,
      name: editedName,
      count: editedCount,
      categoryIndex: editedCategory,
      memo,
      isImportant  // 로컬 state 유지 (서버에는 전송 안 됨)
    });
    onClose();
  };

  // 별표 토글 - 로컬 전용, API 호출 없음
  const handleToggleImportantClick = () => {
    const newValue = !isImportant;
    setIsImportant(newValue);
    // MainPage의 state를 업데이트 (API 호출 없음)
    if (onToggleImportant) {
      onToggleImportant();
    }
  };

  const handleSaveMemo = async () => {
    if (onUpdateMemo) {
      await onUpdateMemo(item.id, memo);
    } else {
      // fallback: 전체 업데이트
      onUpdate({
        ...item,
        memo
      });
    }
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };


  return (
    <>
      <div className='modalOverlay' onClick={onClose} />
      <div className='itemDetailModal'>
        {mode === 'detail' && (
          <>
            <button className='modalClose' onClick={onClose}>×</button>
            <h3 className='modalTitle'>품목 상세</h3>
            
            <div className='detailRow'>
              <span className='detailLabel'>품목</span>
              <div className='detailValueWithStar'>
                <span className='detailValue'>{item.name}</span>
                <button 
                  className={`starButtonModal ${isImportant ? 'active' : ''}`}
                  onClick={handleToggleImportantClick}
                >
                  ⭐
                </button>
              </div>
            </div>
            
            <div className='detailRow'>
              <span className='detailLabel'>수량</span>
              <span className='detailValue'>{item.count}</span>
            </div>
            
            <div className='detailRow'>
              <span className='detailLabel'>카테고리</span>
              <span className='detailValue'>{CATEGORIES[item.categoryIndex]}</span>
            </div>

            <div className='modalActions'>
              <button className='actionButton' onClick={() => setMode('edit')}>
                <img src={Modify}/>
                정보 수정
              </button>
              <button className='actionButton' onClick={() => setMode('memo')}>
                <img src={Memo}/>
                메모
              </button>
              <button className='actionButton' onClick={() => setMode('delete')}>
                <img src={Delete}/>
                품목 삭제
              </button>
            </div>
          </>
        )}

        {mode === 'edit' && (
          <>
            <button className='modalClose' onClick={onClose}>×</button>
            <h3 className='modalTitle'>정보 수정</h3>
            
            <div className='editRow'>
              <label className='editLabel'>품목명 & 수량</label>
              <ItemInputWithQuantity
                itemName={editedName}
                onItemNameChange={setEditedName}
                itemCount={editedCount}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                placeholder='품목 이름'
                backgroundColor='white'
              />
              <hr style={{ border: "1px solid #000" }} />

            </div>

            <div className='editRow'>
              <label className='editLabel'>카테고리</label>
              <div className='categoryGrid'>
                {CATEGORIES.map((category, index) => (
                  <button
                    key={index}
                    className={`categoryButton ${editedCategory === index ? 'selected' : ''}`}
                    onClick={() => setEditedCategory(index)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            

            <div className='modalButtons'>
              <button className='cancelBtn' onClick={() => setMode('detail')}>
                X
              </button>
              <button className='confirmBtn' onClick={handleSaveEdit}>
                V
              </button>
            </div>
          </>
        )}

        {mode === 'memo' && (
          <>
            <button className='modalClose' onClick={onClose}>×</button>
            <h3 className='modalTitle'>메모</h3>
            
            <textarea
              className='memoTextarea'
              placeholder='품목에 대한 메모를 작성하세요'
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />

            <div className='modalButtons'>
              <button className='cancelBtn' onClick={() => setMode('detail')}>
                취소
              </button>
              <button className='confirmBtn' onClick={handleSaveMemo}>
                확인
              </button>
            </div>
          </>
        )}

        {mode === 'delete' && (
          <>
            <img src={Error} className='deleteIcon'/>
            <p className='deleteMessage'>이 품목을 리스트에서 삭제하시겠어요?</p>
            
            <div className='modalButtons'>
              <button className='cancelBtn' onClick={() => setMode('detail')}>
                ✕
              </button>
              <button className='confirmBtn' onClick={handleDelete}>
                ✓
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

