/**
 * @file: AddComment.jsx
 * @description: 댓글 생성 구현
 * @author: 천경재
 */
 import React,{ memo,useEffect} from 'react';
 import styled from 'styled-components';
 import Spinner from '../../Spinner';
 import ErrorView from '../../ErrorView';
 import { useDispatch,useSelector } from "react-redux";
import {getItem, putItem} from '../../../slices/CommentSlice';
import { useParams,useNavigate} from 'react-router-dom';

import AddBtn from '../../../assets/img/next.png'

import regexHelper from '../libs/RegexHelper';

const CommentContainer =styled.div`
  border: 1px solid #d5d5d5;
  img {
    width: 50px;
    height: 50px;
  }
`;

const AddComment = memo(() =>{
  const navigate = useNavigate();
  const {id} = useParams();
     /** 저장 완료 후 목록 강제 이동을 처리하기 위한 navigate 함수 생성 */
    // navigate 리턴받는 자체가 함수인 경우를 클로저라고 한다.
    /** 리덕스 관련 초기화 */
    // data를 생성하기 때문에 data를 불러올 필요는 없다.
    const dispatch = useDispatch();
    const {data, loading, error} = useSelector((state)=> state.comment);

    
  /** 페이지가 열림과 동시에 id값에 대한 데이터를 조회하여 리덕스 상태값에 반영한다. */
  useEffect(()=>{
    dispatch(getItem({id: id}));  //리덕스가 data를 조회한 다음 그 결과를 data를 셋팅함 
  },[dispatch,id]);

  /**<form>의 submit 버튼이 눌러졌을 때 호출될 이벤트 핸들러 */
  const onSubmit = React.useCallback((e)=>{
    e.preventDefault();

    // 이벤트가 발생한 폼 객체
    const current = e.target;
    //입력값에 대한 유효성 검사
    try{
        regexHelper.value(current.comment, '댓글을 입력하세요.');
        regexHelper.minLength(current.comment, 2, '댓글은 최소 2글자 이상 입력해야합니다.');
        regexHelper.maxLength(current.comment, 20, '댓글은 최대 15글자 까지 가능합니다.');
    
        window.alert('댓글 수정이 되었습니다.');
      }catch(e){
      window.alert("댓글 수정을 하지 못했습니다.");
      e.field.focus();
      return;
    }

   //싱글페이지에서 사용할 수 있는 방법 구상
    dispatch(putItem({
      comment:current.comment.value
    })).then(()=>{    // then 함수를 처리하고 콜백을 넣어야함
      navigate("/community");
    });
  },[dispatch, navigate]);

 
    return (
      <CommentContainer className="containerSize inside">
          <Spinner visible={loading} /> 
       {error?(
        <ErrorView error={error}/>
       ) :(
      <form onSubmit={onSubmit}>
          <input type="text" placeholder="댓글을 작성해주세요" name="comment" defaultValue={data?.comment} />
          <button type="submit" className='addBtn'><img src={AddBtn} alt="addBtn" /></button>
        </form>
         )
        }
      </CommentContainer>
  );
});

export default AddComment;