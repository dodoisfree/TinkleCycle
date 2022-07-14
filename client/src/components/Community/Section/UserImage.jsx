/**
 * @file: UserImage.jsx
 * @description: 사용자이미지 구현
 * @author: 천경재
 */
import React,{ memo } from 'react';
import userImage from '../../../assets/img/account-LB.png';
import styled from "styled-components";

const UserInfoContainer=styled.div`
width: 25px;
height: 25px;
display: flex;
justify-content: right;

img{
  width: 25px;
  height: 25px;
  justify-items: right;
}
`;
const UserImage = memo(() =>{
    return (
      <UserInfoContainer>
        <img src={userImage} alt="userAccount"/>
      </UserInfoContainer>
  );
});

export default UserImage;