import React, { memo } from "react";
import styled from "styled-components";
import Search1 from "../../assets/img/search-w.png";
import { useFormik } from "formik";
import * as Yup from "yup";

const MainSearchBarCss = styled.div`
    padding: 40px 0;
    .searchAddress {
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
                font-size: 20px;
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

const MainSearchBar = memo(({data, keyword}) => {

    const formik = useFormik({
        initialValues: {
            keyword: ''
        },
        validationSchema: Yup.object({
            keyword: Yup.string()
            .required("필수 입력사항입니다.")
            .max(20, "20자 이내로 입력해주세요.")
        }),
        onSubmit: (values) => {
          keyword(values.keyword);
        },
      });

    return (
        <MainSearchBarCss>
            <form className="searchAddress" onSubmit={formik.handleSubmit}>
                <label htmlFor="addrIpt">
                    <h4>내주소</h4>
                </label>
                <input id="addrIpt" className="addrIpt" type="address" name='keyword' placeholder="주소를 입력해주세요." value={formik.values.keyword} {...formik.getFieldProps("keyword")} /> 
                <button type='submit' className="searchBtn"> 검색 버튼 </button>
            </form>
        </MainSearchBarCss>
    );
});

export default MainSearchBar;
