import React, { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import more from "../../assets/img/more.png";
import more2 from "../../assets/img/more2.png";
import account from "../../assets/img/account-LB.png";
import styled from "styled-components";

const CommentListInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    .commentListBox {
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .commentInfo {
            &:first-child {
                width: 15%;
                height: 25px;
                display: flex;
                flex-direction: row;
                font-size: 13px;
                line-height: 25px;
                padding-left: 10px;
                & > span {
                    &:first-child {
                    background: url(${account}) no-repeat;
                    background-size: 25px 25px;
                    background-position: center, center;
                    text-indent: -99999px;
                    }
                    &:last-child {
                    padding-left: 10px;
                    }
                }
            }
            &:nth-child(2) {
                width: 100%;
                height: 100%;
                font-size: 13px;
                line-height: 25px;
            }
            &:nth-child(3) {
                position: relative;
                width: 10%;
                height: auto;
                background: url(${more}) no-repeat;
                background-size: 25px 25px;
                background-position: center, center;
                text-indent: -99999px;
                cursor: pointer;
                border: none;
                &:hover {
                    background: url(${more2}) no-repeat;
                    background-size: 25px 25px;
                    background-position: center, center;
                    text-indent: -99999px;
                }
                .editDelBtnBox {
                    text-indent: 0;
                    position: absolute;
                    right: 30px;
                    top: -12px;
                    width: 50px;
                    height: 50px;
                    display: flex;
                    flex-direction: column;
                    background-color: #eee;
                    .editDelBtnItem {
                        width: 100%;
                        height: auto;
                        line-height: 25px;
                        text-align: center;
                        &:hover {
                            color: white;
                            font-weight: bold;
                            background-color: #228ae6;
                        }
                    }
                }
            }
        }
    }
`;
const CommentListInfo = memo(({ id, comment, dispatch, deleteItem }) => {
    const navigate = useNavigate();

    // editDelBtn 버튼 토글 구현
    const [editDelBtn, setEditDelBtn] = useState(false);
    const onToggle = useCallback(() => {
        setEditDelBtn(!editDelBtn);
    }, [editDelBtn]);

    /** 수정 버튼 클릭 이벤트 처리 --> 수정 페이지로 이동. 수정 대상에 대한 id를 path 파라미터로 전달함 */
    const onEditClick = (e) => {
        e.preventDefault();
        const current = e.target;
        const id = current.dataset.id; // 숨겨놓은 data-id 값을 가져오라는 의미
        navigate(`/editComment/${id}`);
    };

    /** 삭제 버튼 클릭시 이벤트 처리 --> 리덕스를 통해 삭제 처리 --> data 값이 갱신 되므로 화면에 자동 반영된다. */
    const onDeleteClick = (e) => {
        e.preventDefault();
        const current = e.target;
        if (window.confirm(`정말 ${current.dataset.comment}(을)를 삭제하시겠습니까?`)) {
            dispatch(deleteItem({ id: current.dataset.id }));
        }
    };

    return (
        <CommentListInfoContainer>
            <ul className="commentListBox">
                {/* 데이터를 텍스트로 출력 */}
                <li className="commentInfo">
                    <span className="userImg">유저 이미지</span>
                    <span>{id}</span>
                </li>
                <li className="commentInfo">{comment}</li>
                <li className="commentInfo" onClick={onToggle}>
                    더 보기
                    {editDelBtn && (
                        <div className="editDelBtnBox">
                            {/* data-comment 정말 이걸 삭제하는지 물어보기 위해 숨겨놓기 */}
                            {/* data-id로 일련번호 숨겨놓기 -어떤항목을 수정 & 삭제할지 */}
                            <span className="editDelBtnItem" data-id={id} onClick={onEditClick}>수정</span>
                            <span className="editDelBtnItem" data-id={id} data-comment={Comment} onClick={onDeleteClick}>삭제</span>
                        </div>
                    )}
                </li>
            </ul>
        </CommentListInfoContainer>
    );
});

export default CommentListInfo;
