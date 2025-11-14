import React from 'react'
import './ListTitleWithSettings.scss'
import { Setting } from '@/assets'

export const ListTitleWithSettings = ({ listName, onSettingsClick }) => {
  return (
    <div className='listTitleSection'>
      <p className='listTitle'>{listName}</p>
      <button className='settingsButton' onClick={onSettingsClick}>
        <img src={Setting} alt='설정' />
      </button>
    </div>
  )
}

