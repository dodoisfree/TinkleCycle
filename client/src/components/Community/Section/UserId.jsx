import React,{ memo,useEffect } from 'react';
import useAxios from 'axios-hooks';
import {getComment} from '../../../slices/CommentSlice';
import { useDispatch,useSelector } from "react-redux";

import { useFormik } from 'formik';


const UserId = memo((id) =>{
  const { data } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComment());
  }, [dispatch]);
  
    // 댓글을 모으는 배열
    const [listId, setListId] = React.useState([]);
  console.log(listId)
    /* 백엔드 데이터 저장을 위한 Ajax 요청 객체 생성 - 메뉴얼 전송 */
    const [refetch] =useAxios({
      url: 'http://localhost:3001/comment',
      method: 'GET'
    }, {manual: true});
    
        //입력값 유효성 검사
        const formik = useFormik({
        initialValues: {
          Id: "",
        },
          onSubmit: (values) => {
                console.log(values);
                setListId([...listId, values.id]);
            if (data.id === values.id) {
              let json = null;
              (async () => {
                try {
                  const response = await refetch({
                    data: {
                      id: values.id,
                    },
                  });
                  json = response.data;
                } catch (e) {
                  window.alert("로그인 후 사용이 가능합니다.");
                }
                if (json !== null) {
                }
              })();
            }
          },
          });
   
  
    return (
     <form onSubmit={formik.handleSubmit}>
     <div id="comment" value={formik.values.id}>{id}</div>
     </form>
  );
});

export default UserId;