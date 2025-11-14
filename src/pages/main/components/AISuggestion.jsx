import React, { useState, useEffect } from 'react'
import './AISuggestion.scss'
import { Icon, Character, Glasses } from '@/assets'
import { CustomSelect } from './CustomSelect'
import { Toast } from './Toast'
import { getAIMenuRecommendation, getAIMenuRecommendationApi } from '@/apis/main/ai'

export const AISuggestion = ({ listNames = [], onAddRecipes }) => {
  const [step, setStep] = useState('initial'); // 'initial', 'loading', 'results', 'selectList'
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [selectedListIndex, setSelectedListIndex] = useState(0);
  const [toast, setToast] = useState(null);
  const [recommendedTags, setRecommendedTags] = useState([]);

  // 컴포넌트 마운트 시 추천 메뉴 가져오기
  useEffect(() => {
    const fetchRecommendedMenus = async () => {
      try {
        const result = await getAIMenuRecommendationApi();
        
        if (result.ok && result.data) {
          // API 응답이 배열 형태로 메뉴 이름들을 반환한다고 가정
          setRecommendedTags(result.data);
        }
      } catch (error) {
        console.error('추천 메뉴 로드 실패:', error);
        // 실패 시 빈 배열 유지
      }
    };
    
    fetchRecommendedMenus();
  }, []);

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
          {recommendedTags.length > 0 ? (
            <div className='tagList'>
              {recommendedTags.map((tag, index) => (
                <button 
                  key={index} 
                  className='recommendTag'
                  onClick={() => {
                    setSearchQuery(typeof tag === 'string' ? tag : tag.name);
                    handleSearch();
                  }}
                >
                  {typeof tag === 'string' ? tag : tag.name}
                </button>
              ))}
            </div>
          ) : (
            <p className='noRecommendText'>추천 메뉴를 불러오는 중...</p>
          )}
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
