import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const MenuBarContainer = styled.div`
    height: 100%;
    nav {
        width: auto;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #aaa;
        padding-top: 20px;
        padding-bottom: 15px;
        .link {
            width: 100%;
            height: 50px;
            line-height: 50px;
            text-align: center;
            font-size: ${(props) => props.theme.size.L};
            font-weight: ${(props) => props.theme.weight.Md};
            cursor: pointer;
            color: #535353;
            &:hover {
                background-color: #98d6f6;
                color: white;
            }
        }
    }
`;
// 수정 예정
const MenuBar = memo(() => {
    // const [inOut, setInOut] = useState(false);
    // setInOut((inOut) => !inOut);
    const menuClick = React.useCallback((e) => {
        const link = e.target;
        link.style.backgroundColor = "#98d6f6";
        link.style.color = "white";
    }, []);

    const menuBlur = React.useCallback((e) => {
        const link = e.target;
        link.style.backgroundColor = "white";
        link.style.color = "black";
    }, []);
    // console.log(inOut);

    return (
        <MenuBarContainer className="containerSize media">
            <nav>
                <NavLink className="link" to="/" onClick={menuClick} onBlur={menuBlur}>대여소찾기</NavLink>
                <NavLink className="link" to="/attraction/gangnam" onClick={menuClick} onBlur={menuBlur}>추천명소</NavLink>
                <NavLink className="link" to="/community" onClick={menuClick} onBlur={menuBlur}>커뮤니티</NavLink>
                <NavLink className="link" to="/mypage" onClick={menuClick} onBlur={menuBlur}>마이페이지</NavLink>
            </nav>
        </MenuBarContainer>
    );
});

export default MenuBar;
