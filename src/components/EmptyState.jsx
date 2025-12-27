import React from 'react';

const EmptyState = ({ message = "这里空空如也~", type = "default" }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      color: '#8b5a2b',
      opacity: 0.8
    }}>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ marginBottom: '15px' }}>
        {/* Bowl */}
        <path d="M20 70 Q60 110 100 70 L95 40 Q60 50 25 40 Z" fill="#fff" stroke="#ffb7b2" strokeWidth="3" />
        <ellipse cx="60" cy="45" rx="35" ry="10" fill="#fff0f5" stroke="#ffb7b2" strokeWidth="2" />
        {/* Sad Face on Bowl */}
        <circle cx="50" cy="75" r="2" fill="#ffb7b2" />
        <circle cx="70" cy="75" r="2" fill="#ffb7b2" />
        <path d="M55 85 Q60 82 65 85" stroke="#ffb7b2" strokeWidth="2" fill="none" />
        {/* Steam/Empty lines */}
        <path d="M60 30 Q65 20 60 10" stroke="#ccc" strokeWidth="2" fill="none" opacity="0.5">
          <animate attributeName="d" values="M60 30 Q65 20 60 10; M60 30 Q55 20 60 10; M60 30 Q65 20 60 10" dur="3s" repeatCount="indefinite" />
        </path>
      </svg>
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>{message}</div>
    </div>
  );
};

export default EmptyState;
