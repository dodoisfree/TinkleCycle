/**
 * @file: Community.jsx
 * @description: 커뮤니티 페이지 구현
 * @author: 천경재
 */

 import React, { memo, useEffect, useState } from "react";
 import MenuBar from "../../components/MenuBar";
 import { useSelector, useDispatch } from "react-redux";
 import { getList, deleteItem } from "../../slices/CommunitySlice";
 import Spinner from "../../components/Spinner";
 import styled from "styled-components";
 import BoardVeiwer from "../../components/Community/BoardVeiwer";
 import { Link } from "react-router-dom";
 import { useFormik } from "formik";
 import * as Yup from "yup";
 
 import Search1 from "../../assets/img/search-w.png";
 // import writeImg from "../../assets/img/edit.png";
 
 const CommunityContainer = styled.div`
     .searchAddress {
         display: flex;
         background-color: #98d6f6;
         border-radius: 15px;
         width: 95%;
         height: 40px;
         margin-top: 40px;
         margin-bottom: 30px;
         margin-left: auto;
         margin-right: auto;
         color: white;
         .addrIpt {
             width: 100%;
             height: 100%;
             border: none;
             border-right: 1px solid white;
             background-color: #98d6f6;
             border-top-left-radius: 15px;
             border-bottom-left-radius: 15px;
             color: white;
             padding-left: 30px;
             box-sizing: border-box;
             outline: none;
             font-size: 18px;
             font-weight: bold;
             &::placeholder {
                 color: white;
             }
         }
         .searchBtn {
             border: none;
             width: 20%;
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
     .addBoardBtn {
         display: block;
         background-color: #98d6f6;
         color: white;
         box-sizing: border-box;
         border-radius: 5px;
         width: auto;
         height: 40px;
         line-height: 40px;
         padding: 0px 10px;
         margin-bottom: 15px;
         margin-right: 15px;
         font-size: 18px;
         text-align: center;
         float: right;
         &::after {
             content: "";
             clear: both;
             display: block;
         }
         &:hover {
             background-color: #228ae6;
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
     .boardListArea {
         height: 100%;
         width: 100%;
         font-size: 12px;
     }
 `;
 
 const Community = memo(() => {
     const { data, error } = useSelector((state) => state.community);
     const dispatch = useDispatch();

     React.useEffect(() => {
        dispatch(getList());
    }, [dispatch]);
 
     const [loading2, setLoading2] = React.useState(false);
     const [keyword, setKeyword] = React.useState();
     const [searchData, setSearchData] = useState();
    
    console.log(data);
     useEffect(() => {
         if (keyword === null || keyword === undefined) {
             // 전체 검색
             setSearchData(data);
         } else {
             setSearchData(data && data.filter((it) => it.title.includes(String(keyword))));
         }
     }, [data, keyword]);

     const [page, setPage] = useState(1);
     const [sliceData, setSliceData] = useState([]);
     const addData = React.useCallback(() => {
         setLoading2(true);
         setTimeout(() => {
             setPage(page + 1);
             setLoading2(false);
         }, 700);
     }, [page]);

     useEffect(() => {
        setSliceData(searchData && searchData.slice(0, page * 4));
    }, [page, searchData]);
     
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
                     <input id="addrIpt" className="addrIpt" type="address" name="keyword" placeholder="제목으로 게시글 검색" value={formik.values.keyword} {...formik.getFieldProps("keyword")} />
                     <button type="submit" className="searchBtn">검색 버튼</button>
                 </form>
                 <Link to="/addBoard" className="addBoardBtn">게시글 작성하기</Link>
                 <div className="boardListArea">
                     <Spinner visible={loading2} />
                     {error ? (
                         <p>에러!</p>
                     ) : sliceData && sliceData.length > 0 && (
                        sliceData.map(({ id, title, object, content }, idx) => {
                             return (
                                 <BoardVeiwer key={idx} className="boardVeiwer" id={id} title={title} object={object} content={content} deleteItem={deleteItem} dispatch={dispatch} />
                             );
                         })
                     )}
                 </div>
                 <button className="viewMore" type="button" onClick={addData}><b>•••</b><br />더 보기</button>
             </div>
         </CommunityContainer>
     );
 });
 
 export default Community; 