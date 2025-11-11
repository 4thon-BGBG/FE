import React, { useState, useRef, useEffect } from 'react'
import './CustomSelect.scss'
import { Switch } from '@/assets'

export const CustomSelect = ({ options, selectedIndex, onChange, placeholder = '선택하세요' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (index) => {
    onChange(index);
    setIsOpen(false);
  };

  return (
    <div className='customSelect' ref={selectRef}>
      <button 
        className='customSelectButton' 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{options[selectedIndex] || placeholder}</span>
        <img src={Switch} alt='전환' className={`switchIcon ${isOpen ? 'open' : ''}`} />
      </button>

      {isOpen && (
        <div className='customSelectDropdown'>
          {options.map((option, index) => (
            <div
              key={index}
              className={`customSelectOption ${selectedIndex === index ? 'selected' : ''}`}
              onClick={() => handleSelect(index)}
            >
              {selectedIndex === index && <span className='checkmark'>✓</span>}
              <span className='optionText'>{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

