import React, { memo, useState, useEffect } from "react";
import MenuBar from "../components/MenuBar";
import { useSelector, useDispatch } from "react-redux";
import { getBicycles } from "../slices/RentalShopSlice";
import Spinner from "../components/Spinner";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import MainList from "../components/Main/MainList";
// import MainSearchBar from "../components/Main/MainSearchBar";
import Search1 from "../assets/img/search-w.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import viewMore from '../assets/img/viewMore.png';

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
    .viewMore {
        width: 100%;
        height: 100%;
        font-size: 20px;
        line-height: 30px;
        margin-bottom: 30px;
        border: 1px solid #eee;
        background-color: #eee;
        border-radius: 10px;
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

    // 스크롤 시 타겟 관측 라이브러리
    const [ref, inView] = useInView({
        inView: false,
        delay: 700,
        root: null,
    });


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
    
    /** 더보기 버튼 추가 후 클릭 시 데이터 추가로 변경 예정 */
    // 데이터 나눠서 출력, 무한 스크롤 구현중 (현재 로딩전 출력)
    const [loading2, setLoading2] = useState(false);
    const [page, setPage] = useState(1);
    const [sliceData, setSliceData] = useState([]);

    useEffect(() => {
        setSliceData(searchData && searchData.slice(0, page * 8));
        // if (inView && !loading2) {
        //     setLoading2(true);
        //     setPage(page + 1);
        //     setTimeout(() => {
        //         setLoading2(false);
        //     }, 700);
        // }
    }, [inView, page, searchData]);
    //console.log(sliceData);
    const addData = React.useCallback(() => {
            setLoading2(true);
            setPage(page + 1);
            setTimeout(() => {
                setLoading2(false);
            }, 700);
    }, [page]);

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
            setKeyword(values.keyword);
        },
    });

    return (
        <MainCss> 
            <MenuBar />
            <Spinner visible={loading2} />
            <div className="containerSize inside">
                <form className="searchAddress" onSubmit={formik.handleSubmit}>
                    <label htmlFor="addrIpt">
                        <h4>내주소</h4>
                    </label>
                    <input id="addrIpt" className="addrIpt" type="address" name='keyword' placeholder="키워드 입력." 
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
                <button className="viewMore" type="button" onClick={addData}><b>•••</b><br/>더 보기</button>
            </div>

            {/* 스크롤 시 타겟 관측 영역
            <div ref={ref}></div>   */}

        </MainCss>
    );
});

export default Main;
