import React from 'react';

const BearDecoration = ({ style, type = 'peek' }) => {
  const bearColor = "#dbb18c";
  const blushColor = "#ffb7b2";

  if (type === 'peek') {
    return (
      <div style={{ position: 'fixed', zIndex: 0, pointerEvents: 'none', ...style }}>
        <svg width="100" height="80" viewBox="0 0 100 80">
          {/* Head */}
          <circle cx="50" cy="50" r="30" fill={bearColor} />
          {/* Ears */}
          <circle cx="25" cy="25" r="10" fill={bearColor} />
          <circle cx="75" cy="25" r="10" fill={bearColor} />
          <circle cx="25" cy="25" r="5" fill="#5c4033" opacity="0.2" />
          <circle cx="75" cy="25" r="5" fill="#5c4033" opacity="0.2" />
          {/* Eyes */}
          <circle cx="40" cy="45" r="3" fill="#333" />
          <circle cx="60" cy="45" r="3" fill="#333" />
          {/* Nose/Mouth */}
          <circle cx="50" cy="55" r="8" fill="#fff" opacity="0.6" />
          <circle cx="50" cy="53" r="2.5" fill="#333" />
          <path d="M47 56 Q50 59 53 56" stroke="#333" strokeWidth="1.5" fill="none" />
          {/* Blush */}
          <circle cx="30" cy="50" r="4" fill={blushColor} opacity="0.6" />
          <circle cx="70" cy="50" r="4" fill={blushColor} opacity="0.6" />
        </svg>
      </div>
    );
  }

  if (type === 'sleep') {
    return (
      <div style={{ position: 'fixed', zIndex: 0, pointerEvents: 'none', ...style }}>
        <svg width="80" height="60" viewBox="0 0 80 60">
           {/* Head */}
           <path d="M20 50 Q40 20 60 50" fill={bearColor} />
           {/* Ears */}
           <circle cx="25" cy="35" r="8" fill={bearColor} />
           <circle cx="55" cy="35" r="8" fill={bearColor} />
           {/* Sleeping Eyes */}
           <path d="M35 45 Q38 43 41 45" stroke="#333" strokeWidth="1.5" fill="none" />
           <path d="M45 45 Q48 43 51 45" stroke="#333" strokeWidth="1.5" fill="none" />
           {/* Zzz */}
           <text x="60" y="20" fontSize="12" fill="#999" style={{animation: 'float 2s infinite'}}>z</text>
           <text x="68" y="15" fontSize="10" fill="#999" style={{animation: 'float 2s infinite 0.5s'}}>z</text>
        </svg>
      </div>
    );
  }

  if (type === 'chef') {
    return (
      <div style={{ position: 'fixed', zIndex: 0, pointerEvents: 'none', ...style }}>
        <svg width="100" height="100" viewBox="0 0 100 100">
           {/* Chef Hat */}
           <path d="M30 35 Q30 10 50 10 Q70 10 70 35" fill="#fff" stroke="#ddd" strokeWidth="1"/>
           <rect x="30" y="35" width="40" height="10" fill="#fff" stroke="#ddd" strokeWidth="1"/>
           
           {/* Head */}
           <circle cx="50" cy="60" r="25" fill={bearColor} />
           {/* Ears */}
           <circle cx="30" cy="45" r="8" fill={bearColor} />
           <circle cx="70" cy="45" r="8" fill={bearColor} />
           {/* Eyes */}
           <circle cx="42" cy="58" r="2.5" fill="#333" />
           <circle cx="58" cy="58" r="2.5" fill="#333" />
           {/* Nose */}
           <circle cx="50" cy="65" r="3" fill="#333" />
           {/* Blush */}
           <circle cx="35" cy="62" r="3" fill={blushColor} opacity="0.6" />
           <circle cx="65" cy="62" r="3" fill={blushColor} opacity="0.6" />
        </svg>
      </div>
    );
  }

  return null;
};

export default BearDecoration;
