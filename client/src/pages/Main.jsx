import React, { memo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBicycles } from "../slices/RentalShopSlice";
import Spinner from "../components/Spinner";
import styled from "styled-components";
import MainList from "../components/Main/MainList";
// import MainSearchBar from "../components/Main/MainSearchBar";
import Search1 from "../assets/img/search-w.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";

const MainCss = styled.div`
    .rtShopArea {
        width: 100%;
        height: auto;
    }
    .searchAddress {
        margin: 40px 0;
        width: 100%;
        height: 40px;
        background-color: #98d6f6;
        color: white;
        border-radius: 15px;
        display: flex;
        align-items: center;
        .defaultAddr {
            width: 20%;
            height: 100%;
            border: none;
            border-right: 1px solid white;
            background-color: #98d6f6;
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            line-height: 40px;
            text-align: center;
            font-size: 16px;
            color: white;
            font-weight: bold;
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
    .viewMore {
        width: 100%;
        height: 100%;
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 30px;
        border: 1px solid #98d6f6;
        background-color: #98d6f6;
        border-radius: 10px;
        color: white;
        &:hover {
            background-color: #228ae6;
        }
    }
`;

const Main = memo(() => {
    const { data, error } = useSelector((state) => state.rentalShop);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBicycles());
    }, [dispatch]);

    // 검색어에 맞게 배열 가공
    const [keyword, setKeyword] = useState();
    const [searchData, setSearchData] = useState();

    useEffect(() => {
        if (keyword === null || keyword === undefined) {
            // 전체 검색
            setSearchData(data && data.filter((it) => it.stationName.includes('')));
            // 키워드 기본값 검색
            // setSearchData(data && data.filter((it) => it.stationName.includes("강남")));
        } else {
            setSearchData(data && data.filter((it) => it.stationName.includes(String(keyword))));
        }
    }, [data, keyword]);

    // 내 주소 클릭 시 기본 설정된 주소 검색
    const refIpt = useRef();
    const defaultAddr = React.useCallback(() => {
        setKeyword('서초');
        refIpt.current.placeholder = '서초';
    }, []);
    console.log();

    /** 더보기 버튼 추가 후 클릭 시 데이터 추가로 변경 예정 */
    // 데이터 나눠서 출력, 무한 스크롤 구현
    const [loading2, setLoading2] = useState(false);
    const [page, setPage] = useState(1);
    const [sliceData, setSliceData] = useState([]);

    useEffect(() => {
        setSliceData(searchData && searchData.slice(0, page * 8));
    }, [page, searchData]);

    const addData = React.useCallback(() => {
        setLoading2(true);
        setTimeout(() => {
            setPage(page + 1);
            setLoading2(false);
        }, 700);
    }, [page]);

    const formik = useFormik({
        initialValues: {
            keyword: '',
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
        <MainCss> 
            <Spinner visible={loading2} />
            <div className="containerSize inside">
                <form className="searchAddress" onSubmit={formik.handleSubmit}>
                    <button className="defaultAddr" type="button" onClick={defaultAddr}>내 주소</button>
                    <input id="addrIpt" className="addrIpt" type="address" name='keyword' ref={refIpt} placeholder="주소 키워드 입력." 
                        value={formik.values.keyword} {...formik.getFieldProps("keyword")} /> 
                    <button type='submit' className="searchBtn"> 검색 버튼 </button>
                </form>
                <div className="rtShopArea">
                    {error ? (
                        <p>에러!</p>
                    ) : (
                        sliceData &&
                        sliceData.map((
                                { stationId, stationName, parkingBikeTotCnt }, i) => {
                                let rtShopId = stationId.substring(3, stationId.length);
                                let rtShopName = stationName.substring(5, stationName.length);
                                return (
                                    <MainList key={i} rtShopId={rtShopId} rtShopName={rtShopName} pakingTotal={parkingBikeTotCnt} />
                                );
                            }
                        )
                    )}
                </div>
                <button className="viewMore" type="button" onClick={addData}><b>•••</b></button>
            </div>
        </MainCss>
    );
});

export default Main;
