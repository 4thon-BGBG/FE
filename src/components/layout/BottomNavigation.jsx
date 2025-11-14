import React from 'react';
import './BottomNavigation.scss';
import {
  Basket,
  BasketActive,
  Item,
  ItemActive,
  SeeMore,
  SeeMoreActive,
} from '@/assets';
import { useNavigate } from 'react-router-dom';
import { moveItemToOwnApi } from '@/apis/main/main';

export const BottomNavigation = ({
  activeTab = 'basket',
  onTabChange,
  hasNotification = false,
}) => {
  const nav = useNavigate();

  const navItems = [
    {
      id: 'basket',
      label: '장보기리스트',
      icon: Basket,
      activeIcon: BasketActive,
      showBadge: hasNotification,
      path: 'main',
    },
    {
      id: 'item',
      label: '보관함',
      icon: Item,
      activeIcon: ItemActive,
      path: 'inventory',
    },
    {
      id: 'more',
      label: '더보기',
      icon: SeeMore,
      activeIcon: SeeMoreActive,
      path: 'mypage',
    },
  ];

  const handleNavClick = async (item) => {
    // 보관함(보유품목) 클릭 시 API 먼저 호출
    if (item.id === 'item') {
      const result = await moveItemToOwnApi();
      if (result.ok) {
        console.log('장바구니 품목이 보유 품목으로 이동되었습니다.');
      }
    }
    
    onTabChange && onTabChange(item.id);
    nav(item.path);
  };

  return (
    <nav className="bottomNavigation">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`navItem ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => handleNavClick(item)}
        >
          <div className="iconWrapper">
            <img
              src={activeTab === item.id ? item.activeIcon : item.icon}
              alt={item.label}
              className="navIcon"
            />
            {item.showBadge && <span className="notificationBadge" />}
          </div>
          <span className="navLabel">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
