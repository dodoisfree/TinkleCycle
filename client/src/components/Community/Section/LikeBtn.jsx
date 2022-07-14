/**
 * @file: LikeBtn.jsx
 * @description: 좋아요 구현
 * @author: 천경재
 */
import React, { useState } from 'react';
import styled from 'styled-components';
import likeImg from '../../../assets/img/heart.png';
import disLikeImg from '../../../assets/img/emptyHeart.png'

const LikeContainer =styled.div`
display: flex;
justify-content: left;
align-items: center;
width: 40px;
  height: 20px;
 .LikeButton{
    width: 20px;
    height: 20px;
    border: none;
    background-color: white;
    padding: 0;
    img{
        width: 20px;
        height: 20px;
    }
 }
 .likeCounter{
    padding: 0 5px;
 }
`;

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isClicked, setIsClicked] = useState(false);


  const handleClick = () => {
    if (isClicked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsClicked(!isClicked);
  };

  return (
    <LikeContainer>
    <button className='LikeButton iconImg' type='button' onClick={ handleClick }>
    {isClicked === false ? <img src={disLikeImg} alt="DisLike" />
: <img src={likeImg} alt="Like" />} 
</button>
      <span className="likeCounter">{ ` ${likes}` }</span>
    </LikeContainer>
  );
};
export default LikeButton;