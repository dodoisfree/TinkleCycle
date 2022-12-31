import React, { memo, useCallback, useState } from "react";

import { getList, postItem } from "../../slices/CommentSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import styled from "styled-components";
import ErrorView from "../ErrorView";
import CommentList from "./CommentList";
import Spinner from "../Spinner";

import userImage from "../../assets/img/account-LB.png";
import more from "../../assets/img/more.png";
import more2 from "../../assets/img/more2.png";
import comment from "../../assets/img/comment.png";
import comment2 from "../../assets/img/comment2.png";
import likeImg from "../../assets/img/heart.png";
import disLikeImg from "../../assets/img/emptyHeart.png";
import AddBtn from '../../assets/img/next.png';

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
                width: 20%;
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
                    margin-left: 5px;
                }
            }
            .title {
                width: 100%;
                height: 100%;
            }
            .postEtc {
                width: 40%;
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                .category {
                    width: 100%;
                    height: 100%;
                }
                .moreListBtn {
                    position: relative;
                    width: 50%;
                    height: 100%;
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
            width: auto;
            height: 100%;
            line-height: 20px;
            padding-top: 40px;
            padding-bottom: 40px;
            padding-left: 20px;
            padding-right: 20px;
        }
    }
    .commentBox {
        background-color: aliceblue;
        .btns {
            width: 100%;
            height: 27px;
            display: flex;
            flex-direction: row;
            justify-content: left;
            .commentIcon {
                width: 5%;
                height: 100%;
                border: none;
                background: url(${comment}) no-repeat;
                background-size: 27px, 27px;
                background-position: center, center;
                text-indent: -99999px;
                cursor: pointer;
                &:hover {
                    background: url(${comment2}) no-repeat;
                    background-size: 27px, 27px;
                    background-position: center, center;
                    text-indent: -99999px;
                }
            }
            .likeBtn {
                display: flex;
                justify-content: left;
                width: 7%;
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
                    &:hover {
                        background: url(${likeImg}) no-repeat;
                        background-size: 20px, 20px;
                        background-position: center, center;
                        text-indent: -99999px;
                    }
                }
                .likeBtn {
                    width: 100%;
                    height: 100%;
                    border: none;
                    background: url(${likeImg}) no-repeat;
                    background-size: 20px, 20px;
                    background-position: center, center;
                    text-indent: -99999px;
                    &:hover {
                        background: url(${disLikeImg}) no-repeat;
                        background-size: 20px, 20px;
                        background-position: center, center;
                        text-indent: -99999px;
                    }
                }
                .likeCounter {
                    padding: 0 5px;
                }
            }
        }
        .commentOpen {
            width: 100%;
            height: 100%;
            transition: all 0.5s;
            position: relative;
            /** 여 닫기 애니메이션 추가, CommentList, ListInfo 합치기 */
            .commentBox {
                width: 100%;
                height: auto;
                margin-bottom: 10px;
                display: flex;
                justify-content: center;
                .commentInput {
                    width: 80%;
                    border: 2px solid #f6f3f2;
                    padding-left: 10px;
                    outline: none;
                }
                .addBtn {
                    width: 30px;
                    height: 30px;
                    background: url(${AddBtn}) no-repeat;
                    background-size: cover;
                    background-position: center, center;
                    border: none;
                    margin-left: 5px;
                }
            }
        }
    }
`;

const BoardVeiwer = memo(({ id, title, object, content, deleteItem }) => {
    const navigate = useNavigate();
    /** 리덕스 관련 초기화 */
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.comment);

    /** 페이지 마운트와 동시에 실행되는 hook -> 리덕스를 통해 getList를 통해 data 값을 가져와서 목록을 조회한다 */
    React.useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

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
    const onEditClick = useCallback((e) => {
        e.preventDefault();
        const current = e.target;
        const id = current.dataset.id; // 숨겨놓은 data-id 값을 가져오라는 의미
        navigate(`/editBoard/${id}`);
    }, [navigate]);

    /** 삭제 버튼 클릭시 이벤트 처리 --> 리덕스를 통해 삭제 처리 --> data 값이 갱신 되므로 화면에 자동 반영된다. */
    const onDeleteClick = (e) => {
        e.preventDefault();
        const current = e.target;
        if (window.confirm(`정말 이 게시물을 삭제하시겠습니까?`)) {
            dispatch(deleteItem({
                id: current.dataset.id,
            })).then(() => {
                window.alert("게시글이 삭제되었습니다.");
                navigate("/community", { replace: true });
            });
        }
    };

    /** 좋아요 버튼 */
    const [likes, setLikes] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = useCallback((e) => {
        setIsClicked(!isClicked);
        const target = e.target;

        if (isClicked) {
            setLikes(likes - 1);
            target.className = "disLikeBtn";
        } else {
            setLikes(likes + 1);
            target.className = "likeBtn";
        }
    }, [isClicked, likes]);

    const formik = useFormik({
        initialValues: {
          comment: "",
        },
        validationSchema: Yup.object({
            comment: Yup.string()
            .required("댓글을 입력해주세요.")
            .min(2, '댓글은 최소 2글자 이상 입력해야합니다.')
            .max(15, "댓글은 최대 15글자 까지 가능합니다."),
        }),
        onSubmit: (values) => {
            window.alert('댓글이 등록 되었습니다.');
            
            // 리덕스(Ajax처리)를 통해 데이터 저장 요청 --> 처리가 완료된 후 목록 페이지로 강제 이동한다.
            // 비동기 처리이기 때문에 리덕스의 함수를 dispatch한 다음에 그에 대한 후속 처리를 한다면
            // 리덕스 자체가 promise객체이기 때문에 then을 사용해야한다
            dispatch(postItem({
                comment:values.comment
            }));
        },
    });

    return (
        <BVCss key={id}>
            <Spinner visible={loading} />
            <section className="postBox">
                <div className="postInfo">
                    <ul className="userInfo">
                        <li className="userImg">유저 이미지</li>
                        <li className="userId">{id}</li>
                    </ul>
                    <span className="title">제목 : {title}</span>
                    <ul className="postEtc">
                        <li className="category">분류 : {object}</li>
                        <li className="moreListBtn" onClick={onToggle}>
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
                        </li>
                    </ul>
                </div>
                <div className="content">{content}<span className="contentTx"></span></div>
            </section>
            <section className="commentBox">
                <div className="btns">
                    <div className="commentIcon" onClick={toggleComment}>댓글창 아이콘</div>
                    <div className="likeBtn">
                        <button className="disLikeBtn" type="button" onClick={handleClick}>좋아요</button>
                        <span className="likeCounter">{`${likes}`}</span>
                    </div>
                </div>
                {/* <div className="commentOpen" style={{ height: isOpen ? "215px" : "0" }}> */}
                <div className="commentOpen" style={{ display: isOpen ? "block" : "none" }}>
                    {error ? (
                        <ErrorView error={error} />
                    ) : ( data && data.length > 0 && data.map(({ id, comment }, i) => {
                            return (
                                <CommentList key={i} id={id} comment={comment} dispatch={dispatch} deleteItem={deleteItem} />
                            );
                        })
                    )}
                    <div className="addComment">
                        <form className="commentBox" onSubmit={formik.handleSubmit}>
                            <input className="commentInput" type="text" placeholder="댓글을 작성해주세요" name="comment" value={formik.values.comment} {...formik.getFieldProps("comment")}/>
                            <button type="submit" className="addBtn"></button>
                        </form>
                    </div>
                </div>
            </section>
        </BVCss>
    );
});

export default BoardVeiwer;
