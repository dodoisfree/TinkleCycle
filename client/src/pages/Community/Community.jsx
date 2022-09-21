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
import { useFormik } from "formik";
import * as Yup from "yup";

import Search1 from "../../assets/img/search-w.png";
import writeImg from "../../assets/img/edit.png";

const CommunityContainer = styled.div`
    .searchAddress {
        margin: 40px 0;
        width: 100%;
        height: 40px;
        background-color: #98d6f6;
        color: white;
        border-radius: 15px;
        display: flex;
        align-items: center;
        > label {
            width: 20%;
            height: 100%;
            border-right: 1px solid white;
            h4 {
                line-height: 40px;
                text-align: center;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .addrIpt {
            border: none;
            background-color: #98d6f6;
            color: white;
            width: 70%;
            height: 100%;
            padding: 0;
            padding-left: 30px;
            box-sizing: border-box;
            outline: none;
            font-size: 18px;
            border-right: 1px solid white;
            &::placeholder {
                color: white;
            }
        }
        .searchBtn {
            border: none;
            width: 15%;
            height: 100%;
            background: url(${Search1}) no-repeat;
            background-size: 30px, 30px;
            background-position: center, center;
            text-indent: -99999px;
            &:hover {
                background-color: #228ae6;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
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
                        <h4>새 글 작성</h4>
                    </label>
                    <input id="addrIpt" className="addrIpt" type="address" name="keyword" placeholder="게시글 검색." value={formik.values.keyword} {...formik.getFieldProps("keyword")} />
                    <button type="submit" className="searchBtn"> 검색 버튼 </button>
                </form>
                <Link to="/addBoard" className="addrIpt">
                    <img className="iconImg" src={writeImg} alt="writImg" />
                </Link>
                <BoardList />
            </div>
        </CommunityContainer>
    );
});

export default Community;
