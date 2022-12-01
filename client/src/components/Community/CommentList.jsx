/**
 * @file: CommentList.jsx
 * @description: 댓글리스트 구현
 * @author: 천경재
 */
import React, { memo } from "react";
import styled from "styled-components";
import { getList, deleteItem, postItem } from "../../slices/CommentSlice";
import { useSelector, useDispatch } from "react-redux";
import CommentListInfo from "./CommentListInfo";
import regexHelper from '../../libs/RegexHelper';
import Spinner from "../Spinner";
import ErrorView from "../ErrorView";

import AddBtn from '../../assets/img/next.png'

const CommentListCss = styled.div`
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
`;

const CommentList = memo(() => {
    /** 리덕스 관련 초기화 */
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.comment);

    /** 페이지 마운트와 동시에 실행되는 hook -> 리덕스를 통해 getList를 통해 data 값을 가져와서 목록을 조회한다 */
    React.useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    /**<form>의 submit 버튼이 눌러졌을 때 호출될 이벤트 핸들러 */
    const onSubmit = React.useCallback((e) => {
        e.preventDefault();

        // 이벤트가 발생한 폼 객체
        const current = e.target;
        //입력값에 대한 유효성 검사
        try {
            regexHelper.value(current.comment, "댓글을 입력하세요.");
            regexHelper.minLength(current.comment, 2, "댓글은 최소 2글자 이상 입력해야합니다.");
            regexHelper.maxLength(current.comment, 20, "댓글은 최대 15글자 까지 가능합니다.");
            window.alert("댓글이 등록 되었습니다.");
        } catch (e) {
            window.alert("댓글을 등록 하지 못했습니다.");
            e.field.focus();
            return;
        }

        // 리덕스(Ajax처리)를 통해 데이터 저장 요청 --> 처리가 완료된 후 목록 페이지로 강제 이동한다.
        // 비동기 처리이기 때문에 리덕스의 함수를 dispatch한 다음에 그에 대한 후속 처리를 한다면
        // 리덕스 자체가 promise객체이기 때문에 then을 사용해야한다
        dispatch(postItem({
            comment: current.comment.value,
        }));
    }, [dispatch]);

    return (
        <>
            <Spinner visible={loading} />
            <CommentListCss>
                {error ? (
                    <ErrorView error={error} />
                ) : data && data.length > 0 ? (
                    data.map(({ id, comment }, i) => {
                        return ( <CommentListInfo key={i} id={id} comment={comment} dispatch={dispatch} deleteItem={deleteItem} />
                        );
                    })
                ) : (
                    <ul>
                        <li>아직 댓글이 없습니다.</li>
                    </ul>
                )}
                <div className="addComment">
                        <form className="commentBox" onSubmit={onSubmit}>
                            <input
                                className="commentInput"
                                type="text"
                                placeholder="댓글을 작성해주세요"
                                name="comment"
                            />
                            <button type="submit" className="addBtn"></button>
                        </form>
                </div>
            </CommentListCss>
        </>
    );
});

export default CommentList;
