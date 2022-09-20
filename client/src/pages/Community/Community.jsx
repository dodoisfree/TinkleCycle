/**
 * @file: Community.jsx
 * @description: 커뮤니티 페이지 구현
 * @author: 천경재
 */

import React, { memo } from "react";
import MenuBar from "../../components/MenuBar";
import styled from "styled-components";
import BoardList from "../../components/Community/BoardList";
import { Link } from "react-router-dom";
import writeImg from "../../assets/img/edit.png";
import { useFormik } from "formik";
import * as Yup from "yup";

const CommunityContainer = styled.div`
    position: relative;
    .addBoardIcon {
        position: absolute;
        width: 580px;
        height: 30px;
        display: flex;
        justify-content: flex-end;

        @media (max-width: 640px) {
            width: 97%;
        }

        .fixIcon {
            position: fixed;
            width: 30px;
            img {
                width: 35px;
                height: 35px;
            }
        }
    }
`;

const Community = memo(() => {
    const [loading2, setLoading2] = React.useState(false);
    const [keyword, setKeyword] = React.useState();

    const formik = useFormik({
        initialValues: {
            keyword: "",
        },
        validationSchema: Yup.object({
            keyword: Yup.string()
                .required("필수 입력사항입니다.")
                .max(20, "20자 이내로 입력해주세요."),
        }),
        onSubmit: (values) => {
            setLoading2(true);
            setTimeout(() => {
                setKeyword(values.keyword);
                setLoading2(false);
            }, 700);
        },
    });

    return (
        <CommunityContainer>
            <MenuBar />
            <div className="containerSize media">
                <form className="searchAddress" onSubmit={formik.handleSubmit}>
                    <label htmlFor="addrIpt">
                        <h4>내주소</h4>
                    </label>
                    <input id="addrIpt" className="addrIpt" type="address" name="keyword" placeholder="키워드 입력." value={formik.values.keyword} {...formik.getFieldProps("keyword")} />
                    <button type="submit" className="searchBtn"> 검색 버튼 </button>
                </form>
                <Link to="/addBoard" className="fixIcon">
                    <img className="iconImg" src={writeImg} alt="writImg" />
                </Link>
                <BoardList />
            </div>
        </CommunityContainer>
    );
});

export default Community;
