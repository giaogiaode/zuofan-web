import React from 'react';
import Bubbles from './Bubbles';
import BearDecoration from './BearDecoration';
import FoodDecorations from './FoodDecorations';

const BackgroundDecorations = () => {
  return (
    <>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}>
        <Bubbles />
        <FoodDecorations />
        {/* Peeking bear from bottom right */}
        <BearDecoration style={{ bottom: '-5px', right: '10px', transform: 'rotate(-5deg)' }} type="peek" />
        {/* Sleeping bear top left */}
        <BearDecoration style={{ top: '10px', left: '10px', transform: 'scale(0.8)' }} type="sleep" />
        {/* Chef bear middle left */}
        <BearDecoration style={{ top: '40%', left: '-20px', transform: 'rotate(10deg)' }} type="chef" />
      </div>
    </>
  );
};

export default BackgroundDecorations;
