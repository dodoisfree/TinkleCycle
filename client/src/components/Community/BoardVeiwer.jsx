import React, { memo, useCallback, useState } from "react";
import userImage from "../../assets/img/account-LB.png";
import more from "../../assets/img/more.png";
import comment from "../../assets/img/comment.png";
import CommentList from "./CommentList";
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import LikeBtn from './Section/LikeBtn';

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
    border: 2px solid #d5d5d5;
   li{
    margin-left: 15px;
    margin-top: 8px;
    align-items: center;
   }
   .moreList{
    width: 40px;
   }
  }
  .writeBtn{
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: right;
    img{
    width: 25px;
    height: 25px;
    justify-items: right;
    }
  }
  .userInfo{
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: right;
    img{
      width: 25px;
      height: 25px;
      justify-items: right;
    }
  }
  .editDelBtnBox{
  width: 70px;
  height: 50px;

  .editDelBtnItem{
  margin: 0 auto;
  height: 12px;
  padding: 6px;
}
}
`;

const BoardVeiwer = memo(({ id, title, object, content, deleteItem, dispatch }) => {
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
  const onEditClick = useCallback((e) => {
    e.preventDefault();
    const current = e.target;
    const id = current.dataset.id; // 숨겨놓은 data-id 값을 가져오라는 의미
    navigate(`/editBoard/${id}`);
  }, [navigate]);

  /** 삭제 버튼 클릭시 이벤트 처리 --> 리덕스를 통해 삭제 처리 --> data 값이 갱신 되므로 화면에 자동 반영된다. */
const onDeleteClick =e =>{
  e.preventDefault();

  const current = e.target;
  
  if(window.confirm(`정말 이 게시물을 삭제하시겠습니까?`)){
      dispatch(deleteItem({
          id:current.dataset.id
      }));
  }
};

  return (
    <BVCss key={id}>
      <ul>
        <li className="userInfo">
          <img className="userImg" src={userImage} alt="userAccount" />
          {id}
        </li>
        <li className="moreList">
          <button className="Btn" type="button" onClick={onToggle}>
            <img className="iconImg" src={more} alt="moreImg" />
          </button>
        </li>
        {editDelBtn && (
          <ul className="editDelBtnBox">
            <li className="editDelBtnItem">
              {/* data-id로 일련번호 숨겨놓기 -어떤항목을 수정할지 */}
              <div className="moreBtn" data-id={id} onClick={onEditClick}>
                수정
              </div>
            </li>
            <li className="editDelBtnItem">
              {/* data-id로 일련번호 숨겨놓기 -어떤항목을 삭제할지 */}
              {/* data-content 정말 이걸 삭제하는지 물어보기 위해 숨겨놓기 */}
              <div className="moreBtn" data-id={id} data-content={content} onClick={onDeleteClick}>삭제</div>
            </li>
          </ul>
        )}
        <li className="objectSelect">{object}</li>
        <li className="titleTx">{title}</li>
        <li className="contentTx">{content}</li>
      </ul>
      <div className="LikeBtn">
      <LikeBtn/>
      </div>
      <div onClick={toggleComment}>
        <img className="iconImg" src={comment} alt="commentOpen" />
        <div style={{display: isOpen ? 'block' : 'none'}}>
        <CommentList/>
      </div>
      </div>
    </BVCss>
  );
});

export default BoardVeiwer;
