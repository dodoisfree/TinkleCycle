import React, { memo } from 'react';
import MenuBar from '../components/MenuBar';
import styled from 'styled-components';

const MyPageCss = styled.div`
`;

const MyPage = memo(() => {
  return (
    <MyPageCss>
      <MenuBar/>
      <div className='containerSize'>
        마이페이지
      </div>
    </MyPageCss>
  );
});

export default MyPage;