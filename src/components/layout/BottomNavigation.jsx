import React from 'react'
import './BottomNavigation.scss'
import { Basket, BasketActive, Item, ItemActive, SeeMore, SeeMoreActive } from '@/assets'

export const BottomNavigation = ({ activeTab = 'basket', onTabChange, hasNotification = false }) => {
  const navItems = [
    {
      id: 'basket',
      label: '장보기리스트',
      icon: Basket,
      activeIcon: BasketActive,
      showBadge: hasNotification
    },
    {
      id: 'item',
      label: '보관함',
      icon: Item,
      activeIcon: ItemActive
    },
    {
      id: 'more',
      label: '더보기',
      icon: SeeMore,
      activeIcon: SeeMoreActive
    }
  ]

  return (
    <nav className='bottomNavigation'>
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`navItem ${activeTab === item.id ? 'active' : ''}`}
          onClick={() => onTabChange && onTabChange(item.id)}
        >
          <div className='iconWrapper'>
            <img 
              src={activeTab === item.id ? item.activeIcon : item.icon} 
              alt={item.label}
              className='navIcon'
            />
            {item.showBadge && <span className='notificationBadge' />}
          </div>
          <span className='navLabel'>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

