import React from 'react';

function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.message}>{message}</div>
        <div style={styles.buttons}>
          <button onClick={onCancel} style={styles.cancelBtn}>取消</button>
          <button onClick={onConfirm} style={styles.confirmBtn}>确定</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '25px',
    borderRadius: '20px',
    width: '80%',
    maxWidth: '300px',
    textAlign: 'center',
    boxShadow: '0 10px 25px rgba(255, 183, 178, 0.3)',
    border: '2px solid #fff'
  },
  message: {
    marginBottom: '20px',
    fontSize: '18px',
    color: '#5c4033',
    lineHeight: '1.5',
    fontWeight: 'bold'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px'
  },
  cancelBtn: {
    padding: '8px 20px',
    background: '#fff0f5',
    border: '2px solid #ffb7b2',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#8b5a2b',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  confirmBtn: {
    padding: '8px 20px',
    background: '#ffb7b2',
    border: '2px solid #ffb7b2',
    borderRadius: '20px',
    fontSize: '14px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 4px 6px rgba(255, 183, 178, 0.4)'
  }
};

export default ConfirmModal;
