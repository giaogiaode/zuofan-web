import React, { useState } from 'react';
import OrderSuccessAnimation from './OrderSuccessAnimation';
import EmptyState from './EmptyState';

function Menu({ menuList, onOrder }) {
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  const handleOrder = (dish) => {
    onOrder(dish);
    setShowSuccessAnim(true);
  };

  const handleAnimComplete = () => {
    setShowSuccessAnim(false);
  };

  return (
    <div className="container">
      {showSuccessAnim && (
        <OrderSuccessAnimation onComplete={handleAnimComplete} />
      )}
      <h1>小于今天想吃啥</h1>
      {menuList.length === 0 ? (
        <EmptyState message="暂时没有菜单，等厨师上菜吧~" />
      ) : (
        <div className="menu-list">
          {menuList.map(item => (
            <div key={item.id} className="glass-card" style={styles.menuItem}>
              <div style={styles.infoWrapper}>
                <div style={styles.dishInfo}>
                  <div style={styles.dishName}>{item.name}</div>
                  <div style={styles.dishDesc}>{item.description}</div>
                </div>
                {item.image && (
                  <img src={item.image} alt={item.name} style={styles.dishImage} />
                )}
              </div>
              <button onClick={() => handleOrder(item)} style={styles.orderBtn}>点菜</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start'
  },
  dishImage: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '15px',
    marginLeft: '10px',
    marginRight: '10px',
    flexShrink: 0,
    border: '2px solid white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  dishInfo: {
    // flex: 1, // Removed to allow image to sit close
    marginRight: '10px'
  },
  dishName: {
    fontSize: '18px',
    fontWeight: '800',
    marginBottom: '8px',
    color: '#5c4033'
  },
  dishDesc: {
    fontSize: '14px',
    color: '#8b5a2b',
    lineHeight: '1.4'
  },
  orderBtn: {
    padding: '8px 20px',
    background: '#ffb7b2',
    color: 'white',
    border: '2px solid white',
    borderRadius: '20px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 'bold',
    flexShrink: 0,
    boxShadow: '0 4px 6px rgba(255, 183, 178, 0.4)'
  }
};

export default Menu;