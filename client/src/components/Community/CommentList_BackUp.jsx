/**
 * @file: CommentList.jsx
 * @description: 댓글리스트 구현
 * @author: 천경재
 */
import React, { memo } from "react";
import { getList, deleteItem } from "../../slices/CommentSlice";
import { useSelector, useDispatch } from "react-redux";
import CommentListInfo from "./CommentList";
import Spinner from "../Spinner";
import ErrorView from "../ErrorView";


const CommentList = memo(() => {
    /** 리덕스 관련 초기화 */
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.comment);

    /** 페이지 마운트와 동시에 실행되는 hook -> 리덕스를 통해 getList를 통해 data 값을 가져와서 목록을 조회한다 */
    React.useEffect(() => {
        dispatch(getList());
    }, [dispatch]);

    return (
        <div>
            <Spinner visible={loading} />
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
            {/* <CommentListInfo /> */}
        </div>
    );
});

export default CommentList;
