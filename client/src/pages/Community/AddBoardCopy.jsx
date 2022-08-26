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
import { useFormik } from "formik";
import * as Yup from "yup";

import CancleYN from "../../components/Modal/CancelYN";
import regexHelper from "../../libs/RegexHelper";

const AddBoardContainer = styled.div`
    width: 100%;
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

    /**글 쓰기 */
    const formik = useFormik({
        initialValues: {
            object: "",
            title: "",
            content: "",
        },
        validationSchema: Yup.object({
            id: Yup.string().required("필수 입력사항입니다."),
            title: Yup.string().required("필수 입력사항입니다."),
            content: Yup.string().required("필수 입력사항입니다."),
        }),
        onSubmit: (values) => {
            dispatch(
                postItem({
                    object: values.object,
                    title: values.title,
                    content: values.content,
                })
            ).then(() => {
                window.alert("게시글이 등록되었습니다.");
                navigate("/community");
            });
        },
    });

    return (
        <AddBoardContainer className="containerSize inside">
            <Spinner visible={loading} />
            {error ? (
                <ErrorView error={error} />
            ) : (
                <form onSubmit={formik.handleSubmit}>
                    <select className="selectBox" name="object" selectedvalue={formik.values.object} {...formik.getFieldProps("object")}>
                        <option value="">게시글 주제 선택</option>
                        <option value="궁금해요">궁금해요</option>
                        <option value="함께해요">함께해요</option>
                        <option value="자랑해요">자랑해요</option>
                        <option value="기타">기타</option>
                    </select>

                    <input className="titleArea" type="text" name="title" placeholder="제목을 입력해주세요." value={formik.values.title} {...formik.getFieldProps("title")} />
                    <textarea className="textArea" type="text" name="content" placeholder="내용을 입력해주세요." value={formik.values.content} {...formik.getFieldProps("content")} />

                    <ButtonBox>
                        {modal && (
                            <CancleYN modal={modal} setModal={setModal} />
                        )}
                        <Link className="cancelBtn" onClick={onModalOpen} to="/community">취소하기</Link>
                        <button className="addBtn" type="submit">등록하기</button>
                    </ButtonBox>
                </form>
            )}
        </AddBoardContainer>
    );
});

export default AddCommunity;
