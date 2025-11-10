import React, { useEffect } from 'react'
import './Toast.scss'
import { Check, Error } from '@/assets'

export const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <div className='toastIcon'>
        {type === 'warning' ? (
          <img src={Error} alt='Error' className='iconImage' />
        ) : (
          <img src={Check} alt='Success' className='iconImage' />
        )}
      </div>
      <p className='toastMessage'>{message}</p>
    </div>
  )
}

