import React, { memo, useCallback, useState } from "react";

import { getList } from "../../slices/CommentSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LikeBtn from "./Section/LikeBtn";
import ErrorView from "../ErrorView";
import AddComment from "../Community/Section/AddComment";
import CommentListInfo from "./CommentListInfo";
import Spinner from "../Spinner";

import userImage from "../../assets/img/account-LB.png";
import more from "../../assets/img/more.png";
import comment from "../../assets/img/comment.png";
import commentBg from "../../assets/img/comment_bg.png";

const BVCss = styled.div`
    width: 95%;
    height: 100%;
    border: 1px solid #d5d5d5;
    margin: 30px auto;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .postBox {
        width: 100%;
        height: 100%;
        padding-top: 8px;
        .postInfo {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            line-height: 32px;
            margin: auto;
            align-items: center;
            .userInfo {
                width: 10%;
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                padding-left: 10px;
                .userImg {
                    width: 100%;
                    height: 100%;
                    background: url(${userImage}) no-repeat;
                    background-size: 25px 25px;
                    background-position: center, center;
                    text-indent: -99999px;
                }
                .userId {
                    width: 100%;
                    height: 100%;
                }
            }
            .etc {
                
                .moreListBtn {
                    position: relative;
                    width: 10%;
                    height: 100%;
                    background: url(${more}) no-repeat;
                    background-size: 25px 25px;
                    background-position: center, center;
                    text-indent: -99999px;
                    cursor: pointer;
                    border: none;
                    .editDelBtnBox {
                        text-indent: 0;
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        top: 35px;
                        right: 5px;
                        background-color: #eee;
                        display: flex;
                        flex-direction: column;
                        .editDelBtnItem {
                            width: 100%;
                            height: auto;
                            line-height: 25px;
                            text-align: center;
                            &:hover {
                                background-color: #228ae6;
                            }
                        }
                    }
                }
            }
        }
        .content {
            width: 100%;
            height: 100%;
            padding-top: 40px;
            padding-bottom: 40px;
            padding-left: 20px;
        }
    }
    .writeBtn {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: right;
        img {
            width: 25px;
            height: 25px;
            justify-items: right;
        }
    }
    .userInfo {
        width: 25px;
        height: 25px;
        display: flex;
        justify-content: space-evenly;
        img {
            width: 25px;
            height: 25px;
            justify-items: right;
        }
        .userId {
            margin-left: 5px;
            font-size: 13px;
        }
    }
    .commentBox {
        background-color: aliceblue;
        .btns {
            display: flex;
            flex-direction: row;
            justify-content: left;
        }
        .commentListBox {
            display: flex;
            .Btn {
                background-color: white;
                border: none;
            }
        }
        .editDelBtnBox {
            background-image: url(${commentBg}) no-repeat;
            .editDelBtnItem {
                width: 25px;
                height: 25px;
                .editDelBtnImg {
                    width: 25px;
                    height: 25px;
                }
            }
        }
    }
`;

const BoardVeiwer = memo(({ id, title, object, content, deleteItem }) => {
    const navigate = useNavigate();

    // editDelBtn 버튼 토글 구현
    const [editDelBtn, setEditDelBtn] = useState(false);
    const onToggle = useCallback(() => {
        setEditDelBtn(!editDelBtn);
    }, [editDelBtn]);

    // 게시글 리스트 토글
    const [isOpen, setComment] = useState(false);
    const toggleComment = useCallback(() => {
        setComment((isOpen) => !isOpen);
    }, []);

    /** 수정 버튼 클릭 이벤트 처리 --> 수정 페이지로 이동. 수정 대상에 대한 id를 path 파라미터로 전달함 */
    const onEditClick = useCallback(
        (e) => {
            e.preventDefault();
            const current = e.target;
            const id = current.dataset.id; // 숨겨놓은 data-id 값을 가져오라는 의미
            navigate(`/editBoard/${id}`);
        },
        [navigate]
    );

    /** 삭제 버튼 클릭시 이벤트 처리 --> 리덕스를 통해 삭제 처리 --> data 값이 갱신 되므로 화면에 자동 반영된다. */
    const onDeleteClick = (e) => {
        e.preventDefault();

        const current = e.target;

        if (window.confirm(`정말 이 게시물을 삭제하시겠습니까?`)) {
            dispatch(
                deleteItem({
                    id: current.dataset.id,
                })
            );
        }
    };

    /** 리덕스 관련 초기화 */
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.comment);

    /** 페이지 마운트와 동시에 실행되는 hook -> 리덕스를 통해 getList를 통해 data 값을 가져와서 목록을 조회한다 */
    React.useEffect(() => {
        dispatch(getList());
    }, [dispatch]);
    return (
        <BVCss key={id}>
            <Spinner visible={loading} />
            <section className="postBox">
                <div className="postInfo">
                    <div className="userInfo">
                        <span className="userImg">유저 이미지</span>
                        <span className="userId">{id}</span>
                    </div>
                    <span className="title">제목 : {title}</span>
                    <div className="etc">
                        <span className="objectSelect">분류 : {object}</span>
                        <span className="moreListBtn" onClick={onToggle}>
                            더 보기
                            {editDelBtn && (
                                <div className="editDelBtnBox">
                                    <span className="editDelBtnItem">
                                        {/* data-id로 일련번호 숨겨놓기 -어떤항목을 수정할지 */}
                                        <div className="moreBtn" data-id={id} onClick={onEditClick}>수정</div>
                                    </span>
                                    <span className="editDelBtnItem">
                                        {/* data-id로 일련번호 숨겨놓기 -어떤항목을 삭제할지 */}
                                        {/* data-content 정말 이걸 삭제하는지 물어보기 위해 숨겨놓기 */}
                                        <div className="moreBtn" data-id={id} data-content={content} onClick={onDeleteClick}>삭제</div>
                                    </span>
                                </div>
                            )}
                        </span>
                    </div>
                </div>
                <div className="content">
                    <span className="contentTx">{content}</span>
                </div>
            </section>
            <section className="commentBox">
                <div className="btns">
                    <div onClick={toggleComment}>
                        <img className="iconImg" src={comment} alt="commentOpen" />
                    </div>
                    <div className="LikeBtn">
                        <LikeBtn />
                    </div>
                </div>
                <div className="commentOpen" style={{ display: isOpen ? "block" : "none" }}>
                    {error ? (
                        <ErrorView error={error} />
                    ) : data && data.length > 0 && (
                        data.map(({ id, comment }, i) => {
                            return (
                                <CommentListInfo key={i} id={id} comment={comment} dispatch={dispatch} deleteItem={deleteItem} />
                            );
                        })
                    )}
                    <div>
                        <AddComment />
                    </div>
                </div>
            </section>
        </BVCss>
    );
});

export default BoardVeiwer;
