/**
 * @file: Join.jsx
 * @description: 로그인 기능 구현
 * @author: 천경재
 */

import React, { memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../../slices/UserInfoSlice";
import useAxios from "axios-hooks";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "../../components/Spinner";

const JoinCss = styled.div`
    form {
      display: block;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      .title {
        padding-top: 20px;
        padding-bottom: 20px;
        h1,
        h2 {
          text-align: center;
          color: ${(props) => props.theme.color.Main};
        }
      }
      .joinBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 20px;
        strong {
          padding-bottom: 10px;
        }
        .alert {
          font-size: 12px;
          color: red;
          margin: 9px 0 2px;
          padding-left: 10px;
        }
        .inputBox {
          width: 100%;
          height: auto;
          margin-top: 15px;
          b {
            color: red;
            margin-right: 5px;
          }
          &:first-child {
            margin-top: 0;
          }
          .input {
            box-sizing: border-box;
            width: 100%;
            height: 45px;
            padding: 0;
            padding-left: 20px;
            border: 0;
            border-bottom: 1px solid gray;
            outline: none;
            margin-bottom: 10px;
          }
        }
        .inputBox:nth-child(5) {
          .emailBox {
            display: flex;
            flex-direction: row;
            margin: 10px 0;
            .input {
              border: 0px;
              &:first-child {
                width: 80%;
                border-bottom: 1px solid gray;
              }
              &:last-child {
                width: 20%;
                margin-left: 5px;
                border: 1px solid #98d6f6;
                border-radius: 5px;
                background-color: #98d6f6;
                color: #f6f3f2;
                font-weight: ${(props) => props.theme.weight.B};
                font-size: 18px;
                padding: 0;
                cursor: pointer;
              }
            }
          }
        }
        .inputBox:nth-child(7) {
          margin-top: 20px;
          .input {
            border: 1px solid #98d6f6;
            border-radius: 5px;
            background-color: #98d6f6;
            padding: 0;
            &:active {
              background-color: #228ae6;
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
`;

const Join = memo(() => {
  const { data } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  const navigate = useNavigate();
  const [{ loading }, refetch] = useAxios(
    {
      url: "http://localhost:3001/userInfo",
      method: "POST",
    },
    { manual: true }
  );

  const formik = useFormik({
    initialValues: {
      id: "",
      pw: "",
      pwCfm: "",
      name: "",
      email: "",
      codeNum: "",
      sex: "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("필수 입력사항입니다.")
        .matches(/^[a-z0-9_-]{5,15}$/, "5~15자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."),
      pw: Yup.string()
        .required("필수 입력사항입니다.")
        .matches(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^*+=-])[a-zA-Z0-9!@#$%^*+=-]{8,16}$/, "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."),
      pwCfm: Yup.string()
        .required("필수 입력사항입니다.")
        .oneOf([Yup.ref("pw"), null], "비밀번호가 일치하지 않습니다."),
      name: Yup.string()
        .required("필수 입력사항입니다.")
        .matches(/^[a-zA-Z가-힣]{2,15}$/, "2~15자 한글과 영문 대 소문자만 사용 가능합니다."),
      email: Yup.string()
        .required("필수 입력사항입니다.")
        .email("이메일 주소를 다시 확인해주세요."),
      codeNum: Yup.string(),
      sex: Yup.string().required("필수 입력사항입니다."),
    }),
    onSubmit: (values) => {
      console.log(values);
      if (data.id !== values.id) {
        if (data.email !== values.email) {
          let json = null;
          (async () => {
            try {
              const response = await refetch({
                data: {
                  id: values.id,
                  pw: values.pw,
                  name: values.name,
                  email: values.email,
                  sex: values.sex,
                },
              });
              json = response.data;
            } catch (e) {
              window.alert("이미 사용중인 아이디 혹은 이메일 입니다.");
            }
            if (json !== null) {
              window.alert("회원가입이 완료 되었습니다..");
              navigate("/login", { replace: true });
            }
          })();
        }
      }
    },
  });

  return (
    <JoinCss className="containerSize inside">
        <Spinner visible={loading} />
        <form onSubmit={formik.handleSubmit}>
          <div className="title">
            <h1>회원가입</h1>
            <h2>Sing Up</h2>
          </div>

          <div className="joinBox">
            <section className="inputBox">
              <label htmlFor="id">
                <strong><b>*</b>아이디</strong>
              </label>
              <input id="id" className="input" type="text" name="id" maxLength="20" placeholder="아이디를 입력해주세요."
                value={formik.values.id} {...formik.getFieldProps("id")} />
              {formik.touched.id ? (<span className="alert">{formik.errors.id}</span>) : null}
            </section>

            <section className="inputBox">
              <label htmlFor="pw">
                <strong><b>*</b>비밀번호</strong>
              </label>
              <input id="pw" className="input" type="password" name="pw" maxLength="20" placeholder="비밀번호를 입력해주세요."
                value={formik.values.pw} {...formik.getFieldProps("pw")} />
              {formik.touched.pw ? (<span className="alert">{formik.errors.pw}</span>) : null}
            </section>

            <section className="inputBox">
              <label htmlFor="pwCfm">
                <strong><b>*</b>비밀번호 확인</strong>
              </label>
              <input id="pwCfm" className="input" type="password" name="pwCfm" maxLength="20" placeholder="비밀번호를 한번 더 입력해주세요."
                value={formik.values.pwCfm} {...formik.getFieldProps("pwCfm")} />
              {formik.touched.pwCfm ? (<span className="alert">{formik.errors.pwCfm}</span>) : null}
            </section>

            <section className="inputBox">
              <label htmlFor="name">
                <strong><b>*</b>이름</strong>
              </label>
              <input id="name" className="input" type="text" name="name" maxLength="20" placeholder="이름을 입력해주세요."
                value={formik.values.name} {...formik.getFieldProps("name")} />
              {formik.touched.name ? (<span className="alert">{formik.errors.name}</span>) : null}
            </section>

            <section className="inputBox">
              <label>
                <strong><b>*</b>이메일</strong>
              </label>
              <span className="emailBox">
                <input id="email" className="input" type="email" name="email" maxLength="50" placeholder="이메일을 입력해주세요."
                  value={formik.values.email} {...formik.getFieldProps("email")} />
                <input className="input" type="button" value="인증발송" disabled />
              </span>
              <span className="emailBox">
                <input className="input" type="text" name="codeNum" maxLength="6" placeholder="인증번호를 입력해주세요." disabled
                  value={formik.values.codeNum} {...formik.getFieldProps("codeNum")} />
                <input className="input" type="button" value="인증확인" disabled />
              </span>
              {formik.touched.email ? (<span className="alert">{formik.errors.email}</span>) : null}
            </section>

            <section className="inputBox">
              <label htmlFor="sex">
                <strong><b>*</b>성별</strong>
              </label>
              <select id="sex" className="input" name="sex" selectedvalue={formik.values.sex} {...formik.getFieldProps("sex")} >
                <option value="">성별선택</option>
                <option value="male">남자</option>
                <option value="female">여자</option>
              </select>
              {formik.touched.sex ? (<span className="alert">{formik.errors.sex}</span>) : null}
            </section>

            <section className="inputBox">
              <button className="input" type="submit">
                <span className="span">함께하기</span>
              </button>
            </section>
          </div>
        </form>
    </JoinCss>
  );
});

export default Join;
