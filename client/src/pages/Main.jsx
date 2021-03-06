import React, { memo, useState, useEffect, useCallback } from "react";
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
`;

const Main = memo(() => {
    const { data, error } = useSelector((state) => state.rentalShop);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBicycles());
    }, [dispatch]);

    // ????????? ??? ?????? ?????? ???????????????
    const [ref, inView] = useInView({
        inView: false,
        delay: 700,
        root: null,
    });


    // ???????????? ?????? ?????? ??????
    const [keyword, setKeyword] = useState();
    const [searchData, setSearchData] = useState();

    useEffect(() => {
        if (keyword === null || keyword === undefined) {
            setSearchData(data && data.filter((it) => it.stationName.includes("??????")));
        } else {
            setSearchData(data && data.filter((it) => it.stationName.includes(String(keyword))));
        }
    }, [data, keyword]);


    // ????????? ????????? ??????, ?????? ????????? ????????? (?????? ????????? ??????)
    const [loading2, setLoading2] = useState(false);
    const [page, setPage] = useState(0);
    const [sliceData, setSliceData] = useState([]);

    useEffect(() => {
        setSliceData(searchData && searchData.slice(0, page * 8));
        if (inView && !loading2) {
            setLoading2(false);
            setPage(page + 1);
            setTimeout(() => {
                setLoading2(false);
            }, 700);
        }
    }, [searchData, inView, keyword, loading2, page]);

    const formik = useFormik({
        initialValues: {
            keyword: "",
        },
        validationSchema: Yup.object({
            keyword: Yup.string()
                .required("?????? ?????????????????????.")
                .max(20, "20??? ????????? ??????????????????."),
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
                        <h4>?????????</h4>
                    </label>
                    <input id="addrIpt" className="addrIpt" type="address" name='keyword' placeholder="????????? ??????." 
                        value={formik.values.keyword} {...formik.getFieldProps("keyword")} /> 
                    <button type='submit' className="searchBtn"> ?????? ?????? </button>
                </form>
                <div className="rtShopArea">
                    {error ? (
                        <p>??????!</p>
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
            </div>
            {/* ????????? ??? ?????? ?????? ?????? */}
            <div ref={ref}></div>
        </MainCss>
    );
});

export default Main;
