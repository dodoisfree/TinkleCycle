import React, { memo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import more from "../../assets/img/more.png";
import account from "../../assets/img/account-LB.png";
import styled from "styled-components";

const CommentListInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    .commentListBox {
        height: auto;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .commentInfo {
            &:first-child {
                padding-left: 5px;
                height: 25px;
                display: flex;
                flex-direction: row;
                & > span {
                    font-size: 15px;
                    padding-left: 10px;
                    line-height: 25px;
                }
            }
            &:nth-child(2) {
                font-size: 15px;
                line-height: 25px;
            }
        }
        .editDelBtnBox {
            width: 50px;
            height: 50px;
            display: flex;
            flex-direction: column;
            .editDelBtnItem {
                &:hover {
                    color: white;
                    font-weight: bold;
                    background-color: #228ae6;
                }
            }
        }
    }
`;
const CommentListInfo = memo( ({ id, comment, dispatch, deleteItem }) => {
    const navigate = useNavigate();

    // editDelBtn 버튼 토글 구현
    const [editDelBtn, setEditDelBtn] = useState(false);
    const onToggle = useCallback(() => {
      setEditDelBtn(!editDelBtn);
    }, [editDelBtn]); 

    /** 수정 버튼 클릭 이벤트 처리 --> 수정 페이지로 이동. 수정 대상에 대한 id를 path 파라미터로 전달함 */
    const onEditClick = (e) => {
      e.preventDefault();
      const current = e.target;
      const id = current.dataset.id; // 숨겨놓은 data-id 값을 가져오라는 의미
      navigate(`/editComment/${id}`);
    };

    /** 삭제 버튼 클릭시 이벤트 처리 --> 리덕스를 통해 삭제 처리 --> data 값이 갱신 되므로 화면에 자동 반영된다. */
    const onDeleteClick = (e) => {
      e.preventDefault();
      const current = e.target;
      if (window.confirm(`정말 ${current.dataset.comment}(을)를 삭제하시겠습니까?`)) {
        dispatch(deleteItem({id: current.dataset.id}));
      }
    };

    return (
      <CommentListInfoContainer>
        <ul className="commentListBox">
          {/* 데이터를 텍스트로 출력 */}
          <li className="commentInfo">
            <img className="userImg" src={account} alt="userImg" />
            <span>{id}</span>
          </li>
          <li className="commentInfo">{comment}</li>
          <li className="commentInfo" onClick={onToggle}>
              <img className="iconImg" src={more} alt="moreImg" />
          </li>
        </ul>
        {editDelBtn && (
            <ul className="editDelBtnBox">
              <li className="editDelBtnItem" data-id={id} onClick={onEditClick}>
                {/* data-id로 일련번호 숨겨놓기 -어떤항목을 수정할지 */}
                수정

              </li>
              <li className="editDelBtnItem" data-id={id} /*  data-comment 정말 이걸 삭제하는지 물어보기 위해 숨겨놓기 */ data-comment={comment} onClick={onDeleteClick}>
                {/* data-id로 일련번호 숨겨놓기 -어떤항목을 삭제할지 */}
                삭제
              </li>
            </ul>
          )}
      </CommentListInfoContainer>
    );
  }
);

export default CommentListInfo;
