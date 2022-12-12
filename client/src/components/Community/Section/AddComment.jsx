/**
 * @file: AddComment.jsx
 * @description: 댓글 생성 구현 ---- 파일 삭제 예정
 * @author: 천경재
 */
import React,{ memo} from 'react';
import styled from 'styled-components';
import Spinner from '../../Spinner';
import ErrorView from '../../ErrorView';
import { useDispatch,useSelector } from "react-redux";
import {postItem} from '../../../slices/CommentSlice';
import { useFormik } from "formik";
import * as Yup from "yup";

// import regexHelper from '../../../libs/RegexHelper';

import AddBtn from '../../../assets/img/next.png'

const CommentContainer = styled.div`
    height: 100%;
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

const AddComment = memo(() =>{
     /** 저장 완료 후 목록 강제 이동을 처리하기 위한 navigate 함수 생성 */
    // navigate 리턴받는 자체가 함수인 경우를 클로저라고 한다.
    /** 리덕스 관련 초기화 */
    // data를 생성하기 때문에 data를 불러올 필요는 없다.
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state)=> state.comment);

    const formik = useFormik({
        initialValues: {
          id: "",
          pw: "",
          pwCfm: "",
          name: "",
          email: "",
          codeNum: "",
          sex: "",
        },
        validationSchema: Yup.object({
            comment: Yup.string()
            .required("댓글을 입력하세요.")
            .min(2, '댓글은 최소 2글자 이상 입력해야합니다.')
            .max(15, "댓글은 최대 15글자 까지 가능합니다."),
        }),
        onSubmit: (values) => {
            window.alert('댓글이 등록 되었습니다.');
        },
      });

//   /**<form>의 submit 버튼이 눌러졌을 때 호출될 이벤트 핸들러 */
//   const onSubmit = React.useCallback((e)=>{
//     e.preventDefault();

//     // 이벤트가 발생한 폼 객체
//     const current = e.target;
//     //입력값에 대한 유효성 검사
//     try{
//         regexHelper.value(current.comment, '댓글을 입력하세요.');
//         regexHelper.minLength(current.comment, 2, '댓글은 최소 2글자 이상 입력해야합니다.');
//         regexHelper.maxLength(current.comment, 20, '댓글은 최대 15글자 까지 가능합니다.');
    
//         window.alert('댓글이 등록 되었습니다.');
//       }catch(e){
//       window.alert("댓글을 등록 하지 못했습니다.");
//       e.field.focus();
//       return;
//     }

//     // 리덕스(Ajax처리)를 통해 데이터 저장 요청 --> 처리가 완료된 후 목록 페이지로 강제 이동한다.
//     // 비동기 처리이기 때문에 리덕스의 함수를 dispatch한 다음에 그에 대한 후속 처리를 한다면 
//     // 리덕스 자체가 promise객체이기 때문에 then을 사용해야한다
//     dispatch(postItem({
//       comment:current.comment.value
//     }))
//   },[dispatch]);

 
    return (
      <CommentContainer>
          <Spinner visible={loading} /> 
       {error?(
        <ErrorView error={error}/>
       ) :(
      <form className='commentBox' onSubmit={formik.handleSubmit}>
          <input className='commentInput' type="text" placeholder="댓글을 작성해주세요" name="comment" />
          <button className='addBtn' type="submit"></button>
        </form>
         )
        }
      </CommentContainer>
  );
});

export default AddComment;