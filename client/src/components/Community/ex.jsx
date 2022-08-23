import React, { memo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {getList, deleteItem} from '../../slices/CommunitySlice';

import Spinner from '../Spinner';
import ErrorView from '../ErrorView';

import AddBoard from '../../pages/AddBoard'
// import EditBoard from '../../pages/EditBoard'
// import CommentList from "./CommentList";
import writeImg from '../../assets/img/edit.png';
import userImage from '../../assets/img/account-LB.png';

import AddComment from "./Section/EditComment";



const BoardList = memo(() => {
    const navigate = useNavigate();

/** 리덕스 관련 초기화 */
const dispatch = useDispatch();
const {data, loading, error} = useSelector((state)=> state.community);

/** 페이지 마운트와 동시에 실행되는 hook -> 리덕스를 통해 getList를 통해 data 값을 가져와서 목록을 조회한다 */
React.useEffect(()=>{
    dispatch(getList());
},[dispatch]);

/** 수정 버튼 클릭 이벤트 처리 --> 수정 페이지로 이동. 수정 대상에 대한 id를 path 파라미터로 전달함 */
const onEditClick = e =>{
    e.preventDefault();
    const current = e.target;
    const id = current.dataset.id;  // 숨겨놓은 data-id 값을 가져오라는 의미
    navigate(`/editBoard/${id}`);
  };

/** 삭제 버튼 클릭시 이벤트 처리 --> 리덕스를 통해 삭제 처리 --> data 값이 갱신 되므로 화면에 자동 반영된다. */
const onDeleteClick =e =>{
    e.preventDefault();

    const current = e.target;
    
    if(window.confirm(`정말 ${current.dataset.title}(을)를 삭제하시겠습니까?`)){
        dispatch(deleteItem({
            id:current.dataset.id
        }));
    }
};


const [isOpen, setComment] = React.useState(false);
const toggleComment = React.useCallback(() => {
    setComment((isOpen) => !isOpen);  
    }, []);
console.log(isOpen);
return (
    <>
       <Spinner visible={loading}/>
       {error ?(
              <ErrorView error={error}/>
              /* data가 있을 때만 표시하기 */
          ) : data && data.length > 0 ?(
              data.map((item, index)=>{
                  return(
                    <>
                      <ul key={item.id}>
                          {/* 데이터를 텍스트로 출력 */}
                          <li>{item.id}</li>
                          <li>{item.object}</li>
                          <li>{item.title}</li>
                          <li>{item.content}</li>
                          <li>
                              {/* data-id로 일련번호 숨겨놓기 -어떤항목을 수정할지 */}
                              <button type='button' data-id={item.id}
                              onClick={onEditClick}>
                                  수정하기
                              </button>
                          </li>
                          <li>
                              {/* data-id로 일련번호 숨겨놓기 -어떤항목을 삭제할지 */}
                              <button type='button' data-id={item.id}
                              /*  data-comment 정말 이걸 삭제하는지 물어보기 위해 숨겨놓기 */
                              data-comment={item.comment} onClick={onDeleteClick}>
                                  삭제하기
                              </button>
                          </li>
                      </ul>
                      <AddComment/>
                      </>
                  );
              })
          ) :  
      <ul className="ul" style={isOpen ? { height: "300px" } : { height: "100px" }}>
        <li className="writeBtn"><img src={writeImg} alt="writImg"/></li>
        <li className="userInfo"><img src={userImage} alt="userAccount"/></li>
        <button onClick={toggleComment}>
            {/* <img src={comment} alt="commentOpen"/> */}
        </button>
        {isOpen && (
          <div>
            <li>댓글창</li>
             <AddBoard/>   
          </div>
        )}
      </ul>
    }
    </>
  );
  });