/**
 * @file: AddCommunity.jsx
 * @description: 게시글 작성을 위한 구현
 * @author: 천경재
 */
import React, { memo, useEffect } from "react";
import styled from "styled-components";
import Spinner from "../../components/Spinner";
import { getItem, putItem } from "../../slices/CommunitySlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

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
    margin-bottom: 10px;
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
    const { id } = useParams();
    /** 저장 완료 후 목록 강제 이동을 처리하기 위한 navigate 함수 생성 */
    // navigate 리턴받는 자체가 함수인 경우를 클로저라고 한다.
    const navigate = useNavigate();

    /** 리덕스 관련 초기화 */
    // data를 생성하기 때문에 data를 불러올 필요는 없다.
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.community);

    /** 페이지가 열림과 동시에 id값에 대한 데이터를 조회하여 리덕스 상태값에 반영한다. */
    useEffect(() => {
        dispatch(getItem({ id: id })); //리덕스가 data를 조회한 다음 그 결과를 data를 셋팅함
    }, [dispatch, id]);

    /**글 쓰기 */
    const formik = useFormik({
        initialValues: {
            object: "",
            title: "",
            content: "",
        },
        validationSchema: Yup.object({
            object: Yup.string().required("필수 입력사항입니다."),
            title: Yup.string().required("필수 입력사항입니다."),
            content: Yup.string().required("필수 입력사항입니다."),
        }),
        onSubmit: (values) => {
            dispatch(
                putItem({
                    object: values.object,
                    title: values.title,
                    content: values.content,
                })
            ).then(() => {
                window.alert("게시글이 수정되었습니다.");
                navigate("/community");
            });
        },
    });

    return (
        <AddBoardContainer className="containerSize inside">
            <Spinner visible={loading} />
            {error ? (
                <p>에러!</p>
            ) : (
                data && data.map((v, i) => {
                    return (
                        <form key={i} onSubmit={formik.handleSubmit}>
                            <select className="selectBox" name="object" selectValue={v.object} {...formik.getFieldProps("object")}>
                                <option value="">게시글 주제 선택</option>
                                <option value="궁금해요">궁금해요</option>
                                <option value="함께해요">함께해요</option>
                                <option value="자랑해요">자랑해요</option>
                                <option value="기타">기타</option>
                            </select>
    
                            <input className="titleArea" type="text" name="title" placeholder="제목을 입력해주세요." defaultValue={v.title} {...formik.getFieldProps("title")} />
                            <textarea className="textArea" type="text" name="content" placeholder="내용을 입력해주세요." defaultValue={v.content} {...formik.getFieldProps("content")} />
    
                            <ButtonBox>
                                <Link className="cancelBtn" to="/community">취소</Link>
                                <button className="addBtn" type="submit">수정하기</button>
                            </ButtonBox>
                        </form>
                    );
                })
            )}
        </AddBoardContainer>
    );
});

export default AddCommunity;
