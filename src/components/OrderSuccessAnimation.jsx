import React, { useState, useEffect } from 'react';

function OrderSuccessAnimation({ onComplete }) {
  const [stage, setStage] = useState('start'); // start, growing, person, end

  useEffect(() => {
    // Start animation immediately
    requestAnimationFrame(() => setStage('growing'));

    // After heart grows (e.g., 600ms), show person
    const timer1 = setTimeout(() => {
      setStage('person');
    }, 600);

    // After showing person for some time (e.g., 2s), finish
    const timer2 = setTimeout(() => {
      setStage('end');
      if (onComplete) onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (stage === 'end') return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={{
          ...styles.heart,
          transform: stage === 'start' ? 'scale(0)' : (stage === 'person' ? 'scale(1.2)' : 'scale(1.5)'),
          opacity: stage === 'person' ? 0.3 : 1
        }}>
          ❤️
        </div>
        
        <div style={{
          ...styles.personWrapper,
          opacity: stage === 'person' ? 1 : 0,
          transform: stage === 'person' ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)'
        }}>
          <div style={styles.chef}>👨‍🍳</div>
          <div style={styles.messageBox}>
            <div style={styles.messageText}>遵命公主</div>
            <div style={styles.messageText}>王大厨已收到~</div>
          </div>
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    backdropFilter: 'blur(3px)'
  },
  container: {
    position: 'relative',
    width: '300px',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heart: {
    fontSize: '100px',
    transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-60px', // Center adjustment
    marginLeft: '-50px' // Center adjustment
  },
  personWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
    width: '200px'
  },
  chef: {
    fontSize: '80px',
    marginBottom: '10px',
    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
  },
  messageBox: {
    background: 'white',
    padding: '15px 20px',
    borderRadius: '15px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    textAlign: 'center',
    position: 'relative',
    animation: 'float 2s ease-in-out infinite'
  },
  messageText: {
    fontSize: '18px',
    fontWeight: '800',
    color: '#5c4033',
    lineHeight: '1.4'
  }
};

export default OrderSuccessAnimation;
