/**
 * @file: Login.jsx
 * @description: 로그인 기능 구현
 * @author: 천경재
 */

import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../../slices/UserInfoSlice";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import Spinner from "../../components/Spinner";
import logoSub from "../../assets/img/logoSub.png"
import id from "../../assets/img/id.png"
import pw from "../../assets/img/pw.png"

const LoginCss = styled.div`
    form {
      display: block;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      .title {
        .textBlind {
          display: block;
          width: 150px;
          height: 150px;
          background: url(${logoSub}) no-repeat center;
          background-size: cover;
          margin: 0 auto;
        }
      }
      .loginArea {
        width: 100%;
        height: 100%;
        .loginBox {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          .alert {
            font-size: 12px;
            color: red;
            margin: 9px 0 2px;
            padding-left: 10px;
          }
          .input {
            box-sizing: border-box;
            width: 100%;
            height: 50px;
            padding-left: 20px;
            border: 1px solid gray;
            border-bottom-right-radius: 4px;
            border-top-right-radius: 4px;
            outline: none;
          }
          .inputArea {
            width: 100%;
            height: auto;
            .inputBox {
              display: flex;
              flex-direction: row;
              width: 100%;
              height: 50px;
              margin: 10px 0;
              background-color: #98D6F6;
              .imgBox {
                display: block;
                width: 10%;
                height: 50px;
                box-sizing: border-box;
                border: 1px solid gray;
                border-right: 0;
                border-bottom-left-radius: 4px;
                border-top-left-radius: 4px;
                background: url(${id}) no-repeat center;
                background-size: contain;
              }
            }
          }
          .inputArea:nth-child(2) {
            margin: 20px 0;
            .imgBox {
              background: url(${pw}) no-repeat center;
              background-size: contain;
            }
          }
          .inputArea:nth-child(3) {
            margin-top: 40px;
            margin-bottom: 40px;
            .input {
              border: 1px solid #98D6F6;
              border-radius: 5px;
              background-color: #98D6F6;
              color: #f6f3f2;
              &:active {
                background-color: #228AE6;
              }
              .span {
                font-weight: ${(props) => props.theme.weight.B};
                color: #f6f3f2;
                font-size: 20px;
              }
            }
          }
        }
      }
      .findArea {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: auto;
        padding: 30px 0;
        border-top: 1px solid gray;
        .findBox {
          width: auto;
          height: auto;
          margin-left: auto;
          .find {
            width: auto;
            height: auto;
            color: gray;
            text-align: center;
            padding-right: 20px;
            font-size: 15px;
            &:last-child {
              padding-right: 0;
            }
          }
        }
      }
    }
`;

const Login = memo(() => {
  React.useEffect(() => console.clear(), []);
  const { data, loading } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: "",
      pw: ""
    },
    onSubmit: (values) => {
      let compare = (data.find((d) => {
        return d.id === values.id;
      }))
      if (compare !== undefined) {
        (compare.id === values.id && compare.pw === values.pw) ?
        (window.alert("로그인 성공") (navigate("/", { replace: true }))) : (window.alert("아이디와 비밀번호를 다시 한번 확인해주세요.")) 
      } else {
        window.alert("아이디와 비밀번호를 다시 한번 확인해주세요.");
      }
    }
  });
  return (
    <LoginCss className="containerSize inside">
        <Spinner visible={loading} />
        <form onSubmit={formik.handleSubmit}>
          <div className="title">
            <h1 className="textBlind">우리동네 자전거 따르릉</h1>
          </div>
          
          <div className="loginArea" >
            <div className="loginBox">
              <section className="inputArea">
                <label htmlFor="id"><strong>아이디</strong></label>
                <div className="inputBox">
                <label className="imgBox textBlind" htmlFor="id">아이디 아이콘</label>
                  <input id="id" className="input" type="text" name="id" {...formik.getFieldProps("id")} maxLength="20" placeholder="아이디를 입력해주세요." />
                </div>
              </section>

              <section className="inputArea">
                <label htmlFor="pw"><strong>비밀번호</strong></label>
                <div className="inputBox">
                  <label className="imgBox textBlind" htmlFor="pw">비밀번호 아이콘</label>
                  <input id="pw" className="input" type="password" name="pw" {...formik.getFieldProps("pw")} maxLength="20" placeholder="비밀번호를 입력해주세요." />
                </div>
              </section>

              <section className="inputArea">
                <button className="input" type="submit">
                  <span className="span">로그인</span>
                </button>
              </section>
            </div>
          </div>

          <div className="findArea">
            <div className="findBox">
              <Link className="find" to='/login/findId'>아이디 찾기</Link>
              <Link className="find" to='/login/findPw'>비밀번호 찾기</Link>
            </div>
          </div>
        </form>
    </LoginCss>
  );
});

export default Login;
