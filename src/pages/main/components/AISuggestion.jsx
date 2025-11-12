import React, { useState } from 'react'
import './AISuggestion.scss'
import { Icon } from '@/assets'
import { Glasses } from '@/assets'
export const AISuggestion = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const suggestions = [
    '닭가슴살 샐러드',
    '카레',
    '불닭볶이밥'
  ];

  const handleSearch = () => {
    // TODO: AI 검색 기능 구현
    // API 예시: POST /api/ai/search
    // body: { query: searchQuery }
    console.log('검색:', searchQuery);
  };

  const handleSuggestionClick = (suggestion) => {
    // TODO: 추천 레시피 선택 기능
    // API 예시: GET /api/recipes/${suggestion}
    console.log('추천 선택:', suggestion);
  };

  return (
    <div className='aiSuggestion'>
      <div className='aiHeader'>
        <img src={Icon} alt='AI' className='aiIcon' />
        <h3 className='aiTitle'>오늘은 무슨 요리를 할까요?</h3>
      </div>
      <p className='aiSubtitle'>메뉴를 기반으로 AI 버디가 자동을 추천해요</p>

      <div className='searchBox'>
        <img src={Glasses} alt='glass' className='glassesIcon' />
        <input
          type='text'
          placeholder='메뉴명을 입력해주세요'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      <div className='suggestionHint'>
        기존 재료로 만들 수 있는 추천 메뉴예요
      </div>

      <div className='suggestionButtons'>
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className='suggestionButton'
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

