/**
 * @file: LikeBtn.jsx
 * @description: 좋아요 구현
 * @author: 천경재
 */
import React, { useState } from "react";
import styled from "styled-components";
import likeImg from "../../../assets/img/heart.png";
import disLikeImg from "../../../assets/img/emptyHeart.png";
import { useCallback } from "react";

const LikeContainer = styled.div`
    display: flex;
    justify-content: left;
    width: 40px;
    height: 100%;
    align-items: center;
    .disLikeBtn {
        width: 100%;
        height: 100%;
        border: none;
        background: url(${disLikeImg}) no-repeat;
        background-size: 20px, 20px;
        background-position: center, center;
        text-indent: -99999px;
    }
    .likeBtn {
        width: 100%;
        height: 100%;
        border: none;
        background: url(${likeImg}) no-repeat;
        background-size: 20px, 20px;
        background-position: center, center;
        text-indent: -99999px;
    }
    .likeCounter {
        padding: 0 5px;
    }
`;

const LikeButton = () => {
    const [likes, setLikes] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = useCallback((e) => {
        setIsClicked(!isClicked);
        const target = e.target;
  
        if (isClicked) {
            setLikes(likes - 1);
            target.className = 'disLikeBtn';
        } else {
            setLikes(likes + 1);
            target.className = 'likeBtn';
        }
    }, [isClicked, likes]);
    console.log(isClicked, likes);
    return (
        <LikeContainer>
            <button className="disLikeBtn" type="button" onClick={handleClick}>좋아요</button>
            <span className="likeCounter">{`${likes}`}</span>
        </LikeContainer>
    );
};
export default LikeButton;
