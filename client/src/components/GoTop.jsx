import React, { memo } from 'react';
import styled from 'styled-components';

import upBtn1 from '../assets/img/upBtn1.png';
import upBtn2 from '../assets/img/upBtn2.png';

const TopButton = styled.button`
  width: 50px;
  height: 50px;
  background: url(${upBtn1}) center center no-repeat;
  background-size: 100% 100%;
  border: 0;
  cursor: pointer;
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 100;
  &:active {
    background: url(${upBtn2}) center center no-repeat;
    background-size: 100% 100%;
  }
`;

const GoTop = memo(() => {
  return (
    <TopButton onClick={e => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }} />
  );
});

export default GoTop;