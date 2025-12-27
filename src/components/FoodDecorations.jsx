import React from 'react';

const FoodIcon = ({ type, style }) => {
  const commonProps = {
    width: "40",
    height: "40",
    viewBox: "0 0 100 100",
    style: { position: 'absolute', opacity: 0.6, ...style }
  };

  switch (type) {
    case 'carrot':
      return (
        <svg {...commonProps}>
          <path d="M50 85 Q30 50 20 20 L35 15 L50 85 Z" fill="#ff7f50" />
          <path d="M20 20 Q10 10 25 5 M25 20 Q25 5 35 10" stroke="#228b22" strokeWidth="3" fill="none" />
        </svg>
      );
    case 'fish':
      return (
        <svg {...commonProps}>
          <path d="M80 50 Q60 20 20 50 Q60 80 80 50 Z M80 50 L95 35 M80 50 L95 65" fill="#87ceeb" />
          <circle cx="30" cy="45" r="3" fill="#333" />
        </svg>
      );
    case 'rice':
      return (
        <svg {...commonProps}>
          <path d="M20 60 Q50 90 80 60 L20 60 Z" fill="#fff" stroke="#5c4033" strokeWidth="2" />
          <path d="M25 55 Q35 30 45 55 M45 50 Q55 25 65 50 M65 55 Q75 30 80 55" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'donut':
      return (
        <svg {...commonProps}>
          <circle cx="50" cy="50" r="30" fill="#ffb6c1" />
          <circle cx="50" cy="50" r="10" fill="#fff0f5" /> {/* Hole matching background */}
          <circle cx="40" cy="35" r="2" fill="#fff" />
          <circle cx="60" cy="40" r="2" fill="#fff" />
          <circle cx="45" cy="65" r="2" fill="#fff" />
        </svg>
      );
    default:
      return null;
  }
};

const FoodDecorations = () => {
  // Static random positions to avoid re-render jumps
  const items = [
    { type: 'carrot', top: '15%', left: '10%', rotate: '15deg', size: '40px' },
    { type: 'fish', top: '25%', right: '15%', rotate: '-10deg', size: '50px' },
    { type: 'rice', bottom: '20%', left: '5%', rotate: '5deg', size: '45px' },
    { type: 'donut', bottom: '30%', right: '8%', rotate: '20deg', size: '35px' },
    { type: 'carrot', top: '60%', left: '85%', rotate: '45deg', size: '30px' },
    { type: 'fish', top: '80%', left: '15%', rotate: '180deg', size: '40px' },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      {items.map((item, index) => (
        <FoodIcon
          key={index}
          type={item.type}
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            width: item.size,
            height: item.size,
            transform: `rotate(${item.rotate})`,
            animation: `float ${3 + index}s ease-in-out infinite`
          }}
        />
      ))}
    </div>
  );
};

export default FoodDecorations;
