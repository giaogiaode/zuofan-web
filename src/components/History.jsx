import React, { useState } from 'react';
import AV from 'leancloud-storage';
import ConfirmModal from './ConfirmModal';

function History({ orders, onUpdateReview, onDeleteOrder }) {
  const [editingId, setEditingId] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const [reviewImageFile, setReviewImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: '', onConfirm: null });

  // 过滤出已完成的订单
  const completedOrders = orders.filter(o => o.status === 'completed');

  // 按日期分组
  const groupedOrders = completedOrders.reduce((groups, order) => {
    const date = new Date(order.createTime).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(order);
    return groups;
  }, {});

  const handleEditClick = (order) => {
    setEditingId(order.id);
    setReviewText(order.review || '');
    setReviewImageFile(null);
  };

  const handleDelete = (e, orderId) => {
    e.stopPropagation();
    setModal({
      isOpen: true,
      message: '确定要删除这条记录吗？',
      onConfirm: () => onDeleteOrder(orderId)
    });
  };

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const confirmAction = () => {
    if (modal.onConfirm) modal.onConfirm();
    closeModal();
  };

  const uploadImage = async (file) => {
    const avFile = new AV.File(file.name, file);
    try {
      const savedFile = await avFile.save();
      return savedFile.url();
    } catch (error) {
      console.error('上传图片失败', error);
      alert('上传图片失败');
      return null;
    }
  };

  const handleSaveReview = async (orderId) => {
    setIsUploading(true);
    let imageUrl = '';
    if (reviewImageFile) {
      imageUrl = await uploadImage(reviewImageFile);
    }
    
    onUpdateReview(orderId, reviewText, imageUrl);
    setEditingId(null);
    setReviewImageFile(null);
    setIsUploading(false);
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <ConfirmModal 
        isOpen={modal.isOpen}
        message={modal.message}
        onConfirm={confirmAction}
        onCancel={closeModal}
      />
      <h1>小于吃过什么呢</h1>
      
      {Object.keys(groupedOrders).length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#8b5a2b' }}>
          还没做过菜呢
        </div>
      ) : (
        Object.keys(groupedOrders).sort((a, b) => new Date(b) - new Date(a)).map(date => (
          <div key={date} style={{ marginBottom: '30px' }}>
            <h3 style={{ 
              color: '#8b5a2b', 
              fontSize: '16px', 
              borderLeft: '4px solid #ffb7b2', 
              paddingLeft: '10px',
              margin: '20px 0 10px 0',
              fontWeight: '800'
            }}>
              {date}
            </h3>
            
            {groupedOrders[date].map(item => (
              <div key={item.id} style={{ 
                background: 'rgba(255, 255, 255, 0.85)', 
                backdropFilter: 'blur(5px)',
                borderRadius: '20px', 
                padding: '15px', 
                marginBottom: '10px',
                boxShadow: '0 4px 15px rgba(255, 183, 178, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.6)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#5c4033' }}>{item.dishName}</span>
                    <span style={{ fontSize: '12px', color: '#8b5a2b', opacity: 0.8 }}>
                      {new Date(item.createTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => handleDelete(e, item.id)}
                    style={{
                      padding: '4px 10px',
                      background: '#fff0f5',
                      color: '#ff4d4f',
                      border: '1px solid #ff4d4f',
                      borderRadius: '15px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >删除</button>
                </div>
                
                {editingId === item.id ? (
                  <div style={{ marginTop: '10px' }}>
                    <textarea 
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="写点评价吧... (比如：太好吃了！)"
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        marginBottom: '8px',
                        boxSizing: 'border-box'
                      }}
                    />
                    <div style={{ marginBottom: '10px' }}>
                       <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => setReviewImageFile(e.target.files[0])}
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <button 
                        onClick={() => setEditingId(null)}
                        style={{
                          marginRight: '10px',
                          padding: '5px 15px',
                          background: '#eee',
                          border: 'none',
                          borderRadius: '20px',
                          cursor: 'pointer'
                        }}
                      >取消</button>
                      <button 
                        onClick={() => handleSaveReview(item.id)}
                        disabled={isUploading}
                        style={{
                          padding: '5px 15px',
                          background: '#FF5733',
                          color: 'white',
                          border: 'none',
                          borderRadius: '20px',
                          cursor: 'pointer'
                        }}
                      >{isUploading ? '保存中...' : '保存'}</button>
                    </div>
                  </div>
                ) : (
                  <div onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }}>
                    {item.review || item.reviewImage ? (
                      <div>
                         {item.review && (
                           <div style={{ color: '#666', fontSize: '14px' }}>
                             {item.review}
                           </div>
                         )}
                         {item.reviewImage && (
                           <img 
                             src={item.reviewImage} 
                             alt="评价图片" 
                             style={{ 
                               marginTop: '10px', 
                               maxWidth: '100%', 
                               maxHeight: '200px', 
                               borderRadius: '8px' 
                             }} 
                           />
                         )}
                      </div>
                    ) : (
                      <div style={{ color: '#ccc', fontSize: '14px', fontStyle: 'italic' }}>
                        点击写评价...
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

export default History;
