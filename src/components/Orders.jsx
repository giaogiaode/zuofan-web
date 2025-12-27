import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmModal from './ConfirmModal';
import EmptyState from './EmptyState';

function Orders({ orders, onUpdateStatus, onDeleteOrder }) {
  const [modal, setModal] = useState({ isOpen: false, message: '', onConfirm: null });

  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  const handleStatusClick = (order) => {
    if (order.status === 'pending') {
      setModal({
        isOpen: true,
        message: `这份 ${order.dishName} 做好了吗？`,
        onConfirm: () => onUpdateStatus(order.id, 'completed')
      });
    }
  };

  const handleDelete = (e, order) => {
    e.stopPropagation(); // 防止触发 handleStatusClick
    setModal({
      isOpen: true,
      message: '确定要删除这条记录吗？',
      onConfirm: () => onDeleteOrder(order.id)
    });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const confirmAction = () => {
    if (modal.onConfirm) modal.onConfirm();
    closeModal();
  };

  return (
    <div className="container">
      <ConfirmModal 
        isOpen={modal.isOpen}
        message={modal.message}
        onConfirm={confirmAction}
        onCancel={closeModal}
      />
      <h1>小于今天想吃它</h1>
      
      {orders.length === 0 ? (
        <EmptyState message="今天还没点菜呢，快去选一个吧~" />
      ) : (
        <div className="order-list">
          {orders.map(item => (
            <div 
              key={item.id} 
              className="glass-card"
              style={{
                ...styles.orderItem,
                opacity: item.status === 'completed' ? 0.8 : 1
              }}
              onClick={() => handleStatusClick(item)}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  ...styles.orderName,
                  textDecoration: item.status === 'completed' ? 'line-through' : 'none',
                  color: item.status === 'completed' ? '#999' : '#5c4033'
                }}>{item.dishName}</div>
                <div style={styles.orderTime}>{formatDate(item.createTime)}</div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  ...styles.status,
                  color: item.status === 'completed' ? '#4CAF50' : '#ff9e99'
                }}>
                  {item.status === 'pending' ? '待制作' : '已完成'}
                </div>
                <button 
                  onClick={(e) => handleDelete(e, item)}
                  style={styles.deleteBtn}
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <Link to="/admin" style={{ color: 'rgba(139, 90, 43, 0.5)', fontSize: '12px', textDecoration: 'none' }}>
          我是厨师，我要加菜
        </Link>
      </div>
    </div>
  );
}

const styles = {
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  orderName: {
    fontSize: '18px',
    fontWeight: '800',
    marginBottom: '5px'
  },
  orderTime: {
    fontSize: '12px',
    color: '#8b5a2b',
    opacity: 0.8
  },
  status: {
    fontSize: '14px',
    fontWeight: 'bold'
  },
  deleteBtn: {
    padding: '5px 10px',
    fontSize: '12px',
    background: '#ff9e99',
    borderRadius: '15px'
  }
};

export default Orders;