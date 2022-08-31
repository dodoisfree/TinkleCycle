/**
 * @file: AddCommunity.jsx
 * @description: 게시글 작성을 위한 구현
 * @author: 천경재
 */
 import React, { memo } from "react";
 import styled from "styled-components";
 import { useNavigate } from "react-router-dom";
 import Spinner from "../../components/Spinner";
 import ErrorView from "../../components/ErrorView";
 import { postItem } from "../../slices/CommunitySlice";
 import { useSelector, useDispatch } from "react-redux";
 import { Link } from "react-router-dom";
 
 import CancleYN from "../../components/Modal/CancelYN";
 import regexHelper from "../../libs/RegexHelper";
 
 const AddBoardContainer = styled.div`
     margin-top: 40px;
     .selectBox {
         width: 100%;
         border: 1px solid #d5d5d5;
         height: 30px;
         font-size: ${(props) => props.theme.size.S};
         color: #535353;
     }
     .titleArea {
         width: 100%;
         border: 1px solid #d5d5d5;
         height: 30px;
         font-size: ${(props) => props.theme.size.S};
         color: #535353;
         margin-top: 10px;
         padding: 0 5px;
         box-sizing: border-box;
     }
     .textArea {
         width: 100%;
         border: 1px solid #d5d5d5;
         font-size: ${(props) => props.theme.size.S};
         color: #535353;
         margin-top: 10px;
         padding: 5px;
         box-sizing: border-box;
         height: 500px;
     }
 `;
 const ButtonBox = styled.div`
     display: flex;
     justify-content: right;
     align-items: center;
     margin: 10px 0;
     .cancelBtn {
         border: 1px solid #f6f3f2;
         background-color: #f6f3f2;
         padding: 7px 20px;
         margin-right: 10px;
     }
     .addBtn {
         border: 1px solid #d5d5d5;
         background-color: #d5d5d5;
         color: white;
         padding: 4px 10px;
         &:hover {
             background-color: #98d6f6;
             border: 1px solid #98d6f6;
         }
     }
 `;
 
 const AddCommunity = memo(() => {
     /** 저장 완료 후 목록 강제 이동을 처리하기 위한 navigate 함수 생성 */
     // navigate 리턴받는 자체가 함수인 경우를 클로저라고 한다.
     const navigate = useNavigate();
 
     // 취소확인 모달창
     const [modal, setModal] = React.useState(false);
     const onModalOpen = React.useCallback(() => {
         setModal(true);
     }, []);
     /** 리덕스 관련 초기화 */
     // data를 생성하기 때문에 data를 불러올 필요는 없다.
     const dispatch = useDispatch();
     const { loading, error } = useSelector((state) => state.community);
 
     /**<form>의 submit 버튼이 눌러졌을 때 호출될 이벤트 핸들러 */
     const onSubmit = React.useCallback(
         (e) => {
             e.preventDefault();
 
             // 이벤트가 발생한 폼 객체
             const current = e.target;
             //입력값에 대한 유효성 검사
             try {
                 regexHelper.value(current.object, "주제를 선택하세요.");
 
                 regexHelper.value(current.title, "제목을 입력하세요");
                 regexHelper.minLength(current.title, 2, "제목은 최소 2글자 이상 입력해야합니다.");
                 regexHelper.maxLength(current.title, 10, "제목은 최대 10글자 까지 가능합니다.");
 
                 regexHelper.value(current.content, "내용을 입력하세요.");
                 regexHelper.minLength(current.content, 2, "내용은 최소 2글자 이상 입력해야합니다.");
                 regexHelper.maxLength(current.content, 150, "내용은 최대 150글자 까지 가능합니다." );
 
                 window.alert("게시글이 등록되었습니다.");
             } catch (e) {
                 window.alert("게시글을 저장하지 못했습니다");
                 e.field.focus();
                 return;
             }
 
             // 리덕스(Ajax처리)를 통해 데이터 저장 요청 --> 처리가 완료된 후 목록 페이지로 강제 이동한다.
             // 비동기 처리이기 때문에 리덕스의 함수를 dispatch한 다음에 그에 대한 후속 처리를 한다면
             // 리덕스 자체가 promise객체이기 때문에 then을 사용해야한다
             dispatch(
                 postItem({
                     object: current.object.value,
                     title: current.title.value,
                     content: current.content.value,
                 })
             ).then(() => {
                 // then 함수를 처리하고 콜백을 넣어야함
                 navigate("/community");
             });
         },
         [dispatch, navigate]
     );
 
     return (
         <AddBoardContainer className="containerSize inside">
             <Spinner visible={loading} />
             {error ? (
                 <ErrorView error={error} />
             ) : (
                 <form onSubmit={onSubmit}>
                     <select className="selectBox" name="object">
                         <option value="">게시글 주제 선택</option>
                         <option value="궁금해요">궁금해요</option>
                         <option value="함께해요">함께해요</option>
                         <option value="자랑해요">자랑해요</option>
                         <option value="기타">기타</option>
                     </select>
 
                     <input className="titleArea" type="text" name="title" placeholder="제목을 입력해주세요." />
                     <textarea className="textArea" type="text" name="content" placeholder="내용을 입력해주세요." />
 
                     <ButtonBox>
                         {modal && (
                             <CancleYN modal={modal} setModal={setModal} />
                         )}
                         <Link className="cancelBtn" onClick={onModalOpen} to="/community">
                             취소하기
                         </Link>
                         <button className="addBtn" type="submit">
                             등록하기
                         </button>
                     </ButtonBox>
                 </form>
             )}
         </AddBoardContainer>
     );
 });
 
 export default AddCommunity;
 