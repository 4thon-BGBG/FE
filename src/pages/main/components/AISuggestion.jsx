import React, { useState } from 'react'
import './AISuggestion.scss'
import { Icon, Character, Glasses } from '@/assets'
import { CustomSelect } from './CustomSelect'
import { Toast } from './Toast'
import { getAIMenuRecommendation } from '@/apis/main/ai'

export const AISuggestion = ({ listNames = [], onAddRecipes }) => {
  const [step, setStep] = useState('initial'); // 'initial', 'loading', 'results', 'selectList'
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [toast, setToast] = useState(null);

  // 추천 메뉴 태그들
  const recommendedTags = ['닭가슴살 샐러드', '카나페', '불닭볶이밥'];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    // 로딩 상태로 변경
    setStep('loading');
    
    try {
      const result = await getAIMenuRecommendation(searchQuery);
      
      if (result.ok && result.data) {
        // API 응답을 recipes 형식으로 변환
        setRecipes(result.data);
        setStep('results');
      } else {
        setToast({
          message: 'AI 추천을 불러오는데 실패했습니다.',
          type: 'error'
        });
        setStep('initial');
      }
    } catch (error) {
      console.error('AI 추천 실패:', error);
      setToast({
        message: 'AI 추천을 불러오는데 실패했습니다.',
        type: 'error'
      });
      setStep('initial');
    }
  };

  const handleConfirmAddToList = () => {
    // MainPage의 함수를 호출하여 실제로 재료 추가
    if (onAddRecipes) {
      onAddRecipes(selectedListIndex, recipes);
      setToast({
        message: `${listNames[selectedListIndex]}에 재료를 추가했습니다!`,
        type: 'success'
      });
    }
    
    setStep('initial');
    setSearchQuery('');
    setRecipes([]);
    setSelectedListIndex(0);
  };

  const handleCancel = () => {
    setStep('initial');
    setSearchQuery('');
    setRecipes([]);
    setSelectedListIndex(0);
  };

  return (
    <div className='aiSuggestion'>
      <div className='aiHeader'>
        <img src={Icon} alt='AI' className='aiIcon' />
        <h3 className='aiTitle'>오늘은 무슨 요리를 할까요?</h3>
      </div>
      <p className='aiSubtitle'>메뉴를 기반으로 AI 바디가 재료를 추천해줘요</p>

      <div className='searchBar'>
        <img src={Glasses} alt='검색' className='searchIcon' onClick={handleSearch} />
        <input
          type='text'
          placeholder='메뉴명을 입력해주세요'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className='searchInput'
        />
      </div>  

      {step === 'initial' && (
        <div className='recommendSection'>
          <p className='recommendTitle'>기존 재료로 만들 수 있는 추천 메뉴에요</p>
          <div className='tagList'>
            {recommendedTags.map((tag, index) => (
              <button 
                key={index} 
                className='recommendTag'
                onClick={() => {
                  setSearchQuery(tag);
                  handleSearch();
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'loading' && (
        <div className='loadingSection'>
          <p className='loadingText'>레시피 찾는 중...</p>
          <img src={Character} alt='로딩' className='characterImage' />
        </div>
      )}

      {step === 'results' && (
        <div className='resultsSection'>
          <div className='recipeList'>
            {recipes.map((recipe, index) => (
              <div key={index} className='recipeItem'>
                <span className='recipeNumber'>{index + 1}</span>
                <span className='recipeName'>{recipe.name}</span>
              </div>
            ))}
          </div>

          <div className='addPrompt'>
            <img src={Icon} alt='AI' className='promptIcon' />
            <p className='promptText'>
              재료들을 리스트에 추가할까요?
              <br />
              <span className='promptSubtext'>메뉴별 필요한 재료들만 추천했어요</span>
            </p>
          </div>

          <div className='addListSection'>
            <div className='addListLabel'>추가할 리스트:</div>
            <div className='listDropdownWrapper'>
              <CustomSelect 
                options={listNames}
                selectedIndex={selectedListIndex}
                onChange={setSelectedListIndex}
              />
            </div>
          </div>
          
          <div className='actionButtons'>
            <button className='cancelButton' onClick={handleCancel}>✕</button>
            <button className='confirmButton' onClick={handleConfirmAddToList}>✓</button>
          </div>
        </div>
      )}

      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  )
}
