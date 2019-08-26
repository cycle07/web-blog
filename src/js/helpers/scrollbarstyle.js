import React from 'react';

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    backgroundColor: 'rgba(255,255,255,0.375)',
    borderRadius: '3px',
    cursor: 'pointer',
    right: '1px',
    with: '8px',
    zIndex: 999
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};
const scrollbarSetting = height => ({
  autoHide: true,
  autoHideTimeout: 1000,
  autoHideDuration: 200,
  renderThumbVertical: renderThumb,
  style: {
    height: height
  }
});

export default scrollbarSetting;
