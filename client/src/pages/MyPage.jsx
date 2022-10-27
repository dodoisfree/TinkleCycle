import React, { memo } from "react";
import MenuBar from "../components/MenuBar";
import styled from "styled-components";
import MainList from "../components/Main/MainList";
import BoardVeiwer from "../components/Community/BoardVeiwer";

const MyPageCss = styled.div`
    width: 100%;
    height: auto;
    .containerSize {
        margin-bottom: 40px;
    }
`;

const MyPage = memo(() => {
    return (
        <MyPageCss>
            <MenuBar />
            <div className="containerSize">
                <MainList />
                <BoardVeiwer />
            </div>
        </MyPageCss>
    );
});

export default MyPage;
