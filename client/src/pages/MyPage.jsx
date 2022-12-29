import React, { memo } from "react";
import styled from "styled-components";
import MainList from "../components/Main/MainList";
import BoardVeiwer from "../components/Community/BoardVeiwer";

const MyPageCss = styled.div`
    width: 100%;
    height: auto;
    .containerSize {
        margin-top: 40px;
        margin-bottom: 40px;
        .myRez {
            width: 100%;
            height: 100%;
        }
        .myStory {
            width: 100%;
            height: 100%;
        }
    }
`;

const MyPage = memo(() => {
    return (
        <MyPageCss>
            <div className="containerSize">
                <div className="myRez">
                    <p>내 예약 목록</p>
                    <MainList />
                </div>
                <div className="myStory">
                    <p>내 글 목록</p>
                    <BoardVeiwer />
                </div>
            </div>
        </MyPageCss>
    );
});

export default MyPage;
