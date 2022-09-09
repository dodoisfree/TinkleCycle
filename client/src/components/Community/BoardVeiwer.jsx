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
    ul {
        width: 100%;
        margin: auto;
        height: 100%;
        li {
            margin-left: 15px;
            margin-top: 8px;
            align-items: center;
        }
        .top {
            display: flex;
            justify-content: space-between;
            .moreList {
                width: 40px;
            }
        }
        .bottom {
            margin: 10px 0;
            padding-left: 10px;
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
        justify-content: right;
        img {
            width: 25px;
            height: 25px;
            justify-items: right;
        }
    }
    .editDelBtnBox {
        width: 70px;
        height: 50px;

        .editDelBtnItem {
            margin: 0 auto;
            height: 12px;
            padding: 6px;
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
            <ul>
                <li className="top">
                    <li className="userInfo">
                        <img className="userImg" src={userImage} alt="userAccount" />
                        {id}
                    </li>
                    <li className="moreList">
                        <button className="Btn" type="button" onClick={onToggle}>
                            <img className="iconImg" src={more} alt="moreImg" />
                        </button>
                    </li>
                </li>
               
                {editDelBtn && (
                    <ul className="editDelBtnBox">
                        <li className="editDelBtnItem">
                            {/* data-id로 일련번호 숨겨놓기 -어떤항목을 수정할지 */}
                            <div className="moreBtn" data-id={id} onClick={onEditClick}>수정</div>
                        </li>
                        <li className="editDelBtnItem">
                            {/* data-id로 일련번호 숨겨놓기 -어떤항목을 삭제할지 */}
                            {/* data-content 정말 이걸 삭제하는지 물어보기 위해 숨겨놓기 */}
                            <div className="moreBtn" data-id={id} data-content={content} onClick={onDeleteClick}>삭제</div>
                        </li>
                    </ul>
                )}
                <li className="bottom">
                    <li className="objectSelect">{object}</li>
                    <li className="titleTx">{title}</li>
                    <li className="contentTx">{content}</li>
                </li>

            </ul>
            <div className="commentBox">
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
                    ) : data && data.length > 0 ? (
                        data.map(({ id, comment }, i) => {
                            return (
                                <CommentListInfo key={i} id={id} comment={comment} dispatch={dispatch} deleteItem={deleteItem} />
                            );
                        })
                    ) : (
                        <ul>
                            <li>아직 댓글이 없습니다.</li>
                        </ul>
                    )}
                    <div>
                        <AddComment />
                    </div>
                </div>
            </div>
        </BVCss>
    );
});

export default BoardVeiwer;
