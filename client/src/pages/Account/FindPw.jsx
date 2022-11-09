import React, { memo } from 'react';
import styled from 'styled-components';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../../slices/UserInfoSlice";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";

const FindPwCss = styled.div`
    form {
      display: block;
      height: 100%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      .title {
        box-sizing: border-box;
        padding-top: 40px;
        padding-bottom: 40px;
        h1, h2 {
          text-align: center;
          color: ${(props) => props.theme.color.Main};
        }
        h1 {
          margin-bottom: 10px;
        }
      }
      .findIdArea {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
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
            margin-top: 10px;
            margin-bottom: 10px;
          }
        }
        .inputBox:nth-child(2) {
          margin-top: 20px;
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
        .inputBox:nth-child(4) {
          margin: 30px 0 25px 0;
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
        .setPwBox {
          margin-top: 30px;
          display: none;
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

const FindPw = memo(() => {
  React.useEffect(() => console.clear(), []);
  const { data, loading } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  // const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: "",
      email: "",
      pw: "",
      pwCfm: "",
    },
    validationSchema: Yup.object({
      id: Yup.string()
        .required("필수 입력사항입니다.")
        .matches(/^[a-z0-9_-]{5,15}$/, "5~15자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."),
      email: Yup.string()
        .required("필수 입력사항입니다.")
        .email("이메일 주소를 다시 확인해주세요."),
      // pw: Yup.string()
      //   .required("필수 입력사항입니다.")
      //   .matches(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^*+=-])[a-zA-Z0-9!@#$%^*+=-]{8,16}$/, "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."),
      // pwCfm: Yup.string()
      //   .required("필수 입력사항입니다.")
      //   .oneOf([Yup.ref("pw"), null], "비밀번호가 일치하지 않습니다."),
    }),
    onSubmit: (values) => {
      console.log(values);
      let compare = (data.find((d) => {
        return d.id === values.id;
      }))
      if (compare !== undefined) {
        (compare.id === values.id && compare.email === values.email) ?
        (window.alert("비밀번호 재발급 기능 준비중")) : (window.alert("아이디와 이메일을 다시 한번 확인해주세요.")) 
      } else {
        window.alert("아이디와 이메일을 다시 한번 확인해주세요.");
        console.log(compare.id, compare.email);
      }
    },
  });

  return (
    <FindPwCss className="containerSize inside">
      <Spinner visible={loading} />
      <form onSubmit={formik.handleSubmit}>
        <div className="title">
          <h1>비밀번호 찾기</h1>
          <h2>Find PW</h2>
        </div>

        <div className='findIdArea'>
          <section className="inputBox">
            <label htmlFor="id">
              <strong><b>*</b>아이디</strong>
            </label>
            <input id="id" className="input" type="text" name="id" maxLength="20" placeholder="이름을 입력해주세요."
              value={formik.values.id} {...formik.getFieldProps("id")} />
            {formik.touched.id ? (<span className="alert">{formik.errors.id}</span>) : null}
          </section>

          <section className="inputBox">
            <label>
              <strong><b>*</b>이메일</strong>
            </label>
            <span className="emailBox">
              <input id="email" className="input" type="email" name="email" maxLength="50" placeholder="이메일을 입력해주세요."
                value={formik.values.email} {...formik.getFieldProps("email")} />
              <input className="input" type="button" value="인증발송" disabled/>
            </span>
            <span className="emailBox">
              <input className="input" type="text" name="codeNum" maxLength="6" placeholder="인증번호를 입력해주세요." disabled
                value={formik.values.codeNum} {...formik.getFieldProps("codeNum")} />
              <input className="input" type="button" value="인증확인" disabled />
            </span>
            {formik.touched.email ? (<span className="alert">{formik.errors.email}</span>) : null}
          </section>

          <div className='setPwBox'>
            <section className="inputBox">
              <label htmlFor="pw">
                <strong><b>*</b>새 비밀번호</strong>
              </label>
              <input id="pw" className="input" type="password" name="pw" maxLength="20" placeholder="비밀번호를 입력해주세요."
                value={formik.values.pw} {...formik.getFieldProps("pw")} />
              {formik.touched.pw ? (<span className="alert">{formik.errors.pw}</span>) : null}
            </section>

            <section className="inputBox">
              <label htmlFor="pwCfm">
                <strong><b>*</b>새 비밀번호 확인</strong>
              </label>
              <input id="pwCfm" className="input" type="password" name="pwCfm" maxLength="20" placeholder="비밀번호를 한번 더 입력해주세요."
                value={formik.values.pwCfm} {...formik.getFieldProps("pwCfm")} />
              {formik.touched.pwCfm ? (<span className="alert">{formik.errors.pwCfm}</span>) : null}
            </section>
          </div>

          <div className="inputBox">
            <button className="input" type="submit">
              <span className="span">비밀번호 찾기</span>
            </button>
          </div>
        </div>

        <div className="findArea">
          <div className="findBox">
            <Link className="find" to='/login/findId'>아이디 찾기</Link>
            <Link className="find" to='/login/findPw'>비밀번호 찾기</Link>
          </div>
        </div>
      </form>
    </FindPwCss>
  );
});

export default FindPw;