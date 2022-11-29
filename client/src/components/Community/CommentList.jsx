/**
 * @file: CommentList.jsx
 * @description: 댓글리스트 구현
 * @author: 천경재
 */
import React, { memo } from "react";
import styled from "styled-components";
import { getList, deleteItem } from "../../slices/CommentSlice";
import { useSelector, useDispatch } from "react-redux";

import Spinner from "../Spinner";
import ErrorView from "../ErrorView";
import AddComment from "../Community/Section/AddComment";

import CommentListInfo from "./CommentListInfo";

const CommentListContainer = styled.div`
    /** 여 닫기 애니메이션 추가, CommentList, ListInfo 합치기 */
    border: 1px solid #d5d5d5;
    .commentListBox {
        display: flex;
        .Btn {
            background-color: white;
            border: none;
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

    return (
        <>
            <Spinner visible={loading} />
            <CommentListContainer>
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
                <div>
                    <AddComment />
                </div>
            </CommentListContainer>
        </>
    );
});

export default CommentList;
