import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AV from 'leancloud-storage';
import ConfirmModal from './ConfirmModal';
import EmptyState from './EmptyState';

function Admin({ menuList, onAddDish, onUpdateDish, onDeleteDish }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, message: '', onConfirm: null });
  
  const navigate = useNavigate();

  const closeModal = () => {
    setModal({ ...modal, isOpen: false });
  };

  const confirmAction = () => {
    if (modal.onConfirm) modal.onConfirm();
    closeModal();
  };

  const handleDeleteClick = (id) => {
    setModal({
      isOpen: true,
      message: '确定要删除这个菜品吗？',
      onConfirm: () => onDeleteDish(id)
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert('请输入菜名');

    setIsUploading(true);
    let imageUrl = '';
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    if (editingId) {
      // 更新模式
      const updatedData = {
        name,
        description: desc,
      };
      if (imageUrl) updatedData.image = imageUrl;
      
      onUpdateDish(editingId, updatedData);
      setEditingId(null);
    } else {
      // 添加模式
      onAddDish({ name, description: desc, image: imageUrl });
    }

    setName('');
    setDesc('');
    setImageFile(null);
    setIsUploading(false);
    // document.getElementById('fileInput').value = '';
  };

  const handleEditClick = (dish) => {
    setEditingId(dish.id);
    setName(dish.name);
    setDesc(dish.description);
    setImageFile(null);
    window.scrollTo(0, 0);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName('');
    setDesc('');
    setImageFile(null);
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <ConfirmModal 
        isOpen={modal.isOpen}
        message={modal.message}
        onConfirm={confirmAction}
        onCancel={closeModal}
      />
      <h1>{editingId ? '编辑菜品' : '添加新菜品'}</h1>
      <form onSubmit={handleSubmit} className="glass-card" style={styles.form}>
        <div style={styles.group}>
          <label style={styles.label}>菜名：</label>
          <input 
            style={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="比如：红烧肉"
          />
        </div>
        
        <div style={styles.group}>
          <label style={styles.label}>描述：</label>
          <input 
            style={styles.input}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="简单介绍一下"
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>图片：</label>
          <input 
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.input}
          />
          {editingId && !imageFile && (
            <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
              不选择新图片则保持原样
            </div>
          )}
        </div>

        <button type="submit" style={styles.btn} disabled={isUploading}>
          {isUploading ? '处理中...' : (editingId ? '保存修改' : '添加')}
        </button>
        
        {editingId && (
          <button type="button" onClick={handleCancelEdit} style={{...styles.btn, background: '#ccc'}}>
            取消编辑
          </button>
        )}
      </form>

      <div style={{ marginTop: '30px' }}>
        <h2>现有菜单 ({menuList ? menuList.length : 0})</h2>
        {(!menuList || menuList.length === 0) ? (
          <EmptyState message="菜单空空如也，快去添加新菜品吧~" />
        ) : (
          <div className="menu-list">
            {menuList.map(item => (
              <div key={item.id} className="glass-card" style={styles.menuItem}>
                <div style={styles.dishInfo}>
                  <div style={styles.dishName}>{item.name}</div>
                  <div style={styles.dishDesc}>{item.description}</div>
                </div>
                {item.image && (
                  <img src={item.image} alt={item.name} style={styles.dishImage} />
                )}
                <div style={styles.actions}>
                  <button onClick={() => handleEditClick(item)} style={styles.editBtn}>编辑</button>
                  <button onClick={() => handleDeleteClick(item.id)} style={styles.deleteBtn}>删除</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  form: {
    padding: '25px',
    // Styles moved to .glass-card
  },
  group: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '800',
    color: '#5c4033'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '15px',
    border: '2px solid #ffe4e1',
    fontSize: '16px',
    boxSizing: 'border-box',
    background: '#fff',
    color: '#5c4033',
    outline: 'none',
    transition: 'border-color 0.3s'
  },
  btn: {
    width: '100%',
    padding: '12px',
    background: '#ffb7b2',
    color: 'white',
    border: '2px solid white',
    borderRadius: '20px',
    fontSize: '16px',
    marginTop: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(255, 183, 178, 0.4)'
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // Styles moved to .glass-card
  },
  dishImage: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginRight: '15px',
    flexShrink: 0,
    border: '2px solid white'
  },
  dishInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#5c4033',
    marginBottom: '4px'
  },
  dishDesc: {
    fontSize: '14px',
    color: '#8b5a2b'
  },
  actions: {
    display: 'flex',
    gap: '10px'
  },
  editBtn: {
    padding: '6px 12px',
    fontSize: '12px',
    background: '#fff0f5',
    color: '#8b5a2b',
    border: '1px solid #ffb7b2',
    borderRadius: '15px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  deleteBtn: {
    padding: '6px 12px',
    fontSize: '12px',
    background: '#fff0f5',
    color: '#ff4d4f',
    border: '1px solid #ff4d4f',
    borderRadius: '15px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Admin;
