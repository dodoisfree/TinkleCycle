/**
 * @file: BoardList.jsx
 * @description: 게시글 리스트 구현
 * @author: 천경재
 */
import React, { memo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import {getList, deleteItem} from '../../slices/CommunitySlice';

import Spinner from '../Spinner';
import ErrorView from '../ErrorView';

import BoardVeiwer from "./BoardVeiwer";

const BoardListContainer = styled.div`
  .boardListBox{
    height: 100%;
    width: 100%;
    font-size: 12px;
    background-color: black;
  }
`;

const BoardList = memo(() => {

/** 리덕스 관련 초기화 */
const dispatch = useDispatch();
const {data, loading, error} = useSelector((state)=> state.community);

/** 페이지 마운트와 동시에 실행되는 hook -> 리덕스를 통해 getList를 통해 data 값을 가져와서 목록을 조회한다 */
React.useEffect(()=>{
    dispatch(getList());
},[dispatch]);


return(
  <BoardListContainer >
    {/* <div className="addBoardIcon">
    <Link to='/addBoard' className="fixIcon"><img className="iconImg" src={writeImg} alt="writImg"/></Link>
    </div>   */}
  <div className="boardListBox">
     <Spinner visible={loading}/>
     {error ?(
      <ErrorView error={error}/>
     ):  data && data.length > 0 ?(
      data.map(({id, title, object, content}, idx)=>{
          return(
            <BoardVeiwer key={idx} className='boardVeiwer' id={id} title={title} object={object} content={content} deleteItem={deleteItem} dispatch={dispatch}/>
          );
      })
  ) :(
    <ul>
      <li>아직 등록된 게시물이 없습니다.</li>
</ul>
)}
</div>
</BoardListContainer>
);
});

export default BoardList;
