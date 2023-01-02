/**
 * @file: AddComment.jsx
 * @description: 댓글 생성 구현
 * @author: 천경재
 */
import React,{ memo,useEffect} from 'react';
import styled from 'styled-components';
import Spinner from '../Spinner';
import ErrorView from '../ErrorView';
// import regexHelper from '../../../libs/RegexHelper';
import { useDispatch,useSelector } from "react-redux";
import { getItem, putItem } from '../../slices/CommentSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";

import AddBtn from '../../assets/img/next.png'

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
        window.alert('댓글이 수정 되었습니다.');
        dispatch(putItem({
            comment:values.comment
        })).then(()=>{    // then 함수를 처리하고 콜백을 넣어야함
            navigate("/community");
        });;
    },
  });

  console.log(data?.comment);

    return (
      <CommentContainer className="containerSize inside">
          <Spinner visible={loading} /> 
       {error?(
        <ErrorView error={error}/>
       ) :(
        <form onSubmit={formik.handleSubmit}>
            <input type="text" placeholder="댓글을 작성해주세요" name="comment" defaultValue={data?.comment} {...formik.getFieldProps("comment")} />
            <button className='addBtn' type="submit"><img src={AddBtn} alt="addBtn" /></button>
            {formik.touched.comment ? (<span className="alert">{formik.errors.comment}</span>) : null}
        </form>
         )
        }
      </CommentContainer>
  );
});

export default AddComment;