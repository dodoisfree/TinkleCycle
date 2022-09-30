/**
 * @file: AttractionMenu.jsx
 * @description: 추천명소 메뉴들
 * @author: 천경재
 */
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
    .menuBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-top: 40px;
        > div {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
        }
    }
`;

const Gumenu = styled(NavLink)`
    background-color: rgb(224, 224, 224);
    border-radius: 5px;
    padding: 5px;
    font-size: 15px;
    margin-right: 10px;
    margin-bottom: 8px;
    color: #535353;
    &.active {
        background: #98d6f6;
        color: white;
    }
`;

const AttractionMenu = () => {
    return (
        <NavContainer className="containerSize media">
            <div className="menuBox">
                <div>
                    <Gumenu to={"/attraction/gangnam"}>강남구</Gumenu>
                    <Gumenu to={"/attraction/gangdong"}>강동구</Gumenu>
                    <Gumenu to={"/attraction/gangbuk"}>강북구</Gumenu>
                    <Gumenu to={"/attraction/gangseo"}>강서구</Gumenu>
                    <Gumenu to={"/attraction/gwanak"}>관악구</Gumenu>
                </div>

                <div>
                    <Gumenu to={"/attraction/gwangjin"}>광진구</Gumenu>
                    <Gumenu to={"/attraction/guro"}>구로구</Gumenu>
                    <Gumenu to={"/attraction/geumcheon"}>금천구</Gumenu>
                    <Gumenu to={"/attraction/nowon"}>노원구</Gumenu>
                    <Gumenu to={"/attraction/dobong"}>도봉구</Gumenu>
                </div>

                <div>
                    <Gumenu to={"/attraction/dongdaemun"}>동대문구</Gumenu>
                    <Gumenu to={"/attraction/dongjak"}>동작구</Gumenu>
                    <Gumenu to={"/attraction/mapo"}>마포구</Gumenu>
                    <Gumenu to={"/attraction/seodaemun"}>서대문구</Gumenu>
                    <Gumenu to={"/attraction/seocho"}>서초구</Gumenu>
                </div>
                <div>
                    <Gumenu to={"/attraction/seongdong"}>성동구</Gumenu>
                    <Gumenu to={"/attraction/seongbuk"}>성북구</Gumenu>
                    <Gumenu to={"/attraction/songpa"}>송파구</Gumenu>
                    <Gumenu to={"/attraction/yangcheon"}>양천구</Gumenu>
                    <Gumenu to={"/attraction/yeongdeungpo"}>영등포구</Gumenu>
                </div>
                <div>
                    <Gumenu to={"/attraction/yongsan"}>용산구</Gumenu>
                    <Gumenu to={"/attraction/eunpyeong"}>은평구</Gumenu>
                    <Gumenu to={"/attraction/jongro"}>종로구</Gumenu>
                    <Gumenu to={"/attraction/junggu"}>중구</Gumenu>
                    <Gumenu to={"/attraction/jungnang"}>중랑구</Gumenu>
                </div>
            </div>
        </NavContainer>
    );
};

export default AttractionMenu;
