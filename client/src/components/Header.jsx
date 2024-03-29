import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/img/logo.png";

const HeaderContainer = styled.div`
    height: 100px;
    background-color: ${(props) => props.theme.color.BG};
`;

const InnerContainer = styled.div`
    display: flex;
    justify-content: left;
    flex-direction: row;
`;

const LiftContainer = styled.div`
    width: 50%;
    height: 100px;
    .textBlind {
        display: block;
        width: 100px;
        height: 100px;
        background: url(${logo}) no-repeat center;
        background-size: cover;
    }
`;

const RightContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: right;
    align-items: center;
    .login,
    .join {
        padding: 5px;
        margin-right: 10px;
        border: 1px solid white;
        color: white;
        background-color: #98d6f6;
        &:hover {
            background-color: #228ae6;
            border: 1px solid #228ae6;
        }
        /** 호버 적용 안됨 */
    }
`;
const Header = memo(() => {
    const menuClick = React.useCallback((e) => {
        const link = e.target;
        link.style.border = '1px solid #228ae6';
        link.style.backgroundColor = "#228ae6";
        link.style.color = "white";

    }, []);

    const menuBlur = React.useCallback((e) => {
        const link = e.target;
        link.style.border = '1px solid white';
        link.style.backgroundColor = "#98d6f6";
        link.style.color = "white";
    }, []);
    return (
        <HeaderContainer className="containerSize media">
            <InnerContainer>
                <LiftContainer>
                    <h1>
                        <Link to="/" className="textBlind">우리동네 자전거 따르릉</Link>
                    </h1>
                </LiftContainer>
                <RightContainer>
                    <Link to="/login" className="login" onClick={menuClick} onBlur={menuBlur}>로그인</Link>
                    <Link to="/join" className="join" onClick={menuClick} onBlur={menuBlur}>회원가입</Link>
                </RightContainer>
            </InnerContainer>
        </HeaderContainer>
    );
});

export default Header;
