import React, { memo } from 'react';
import styled from 'styled-components';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { getInfo } from "../../slices/UserInfoSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";

const FindidCss = styled.div`
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
        .inputBox:nth-child(3) {
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

const FindId = memo(() => {
  React.useEffect(() => console.clear(), []);
  const { data, loading } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      codeNum: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("필수 입력사항입니다.")
        .matches(/^[a-zA-Z가-힣]{2,15}$/, "2~15자 한글과 영문 대 소문자만 사용 가능합니다."),
      email: Yup.string()
        .required("필수 입력사항입니다.")
        .email("이메일 주소를 다시 확인해주세요."),
      // codeNum: Yup.string()
      // .required("필수 입력사항입니다."),
    }),
    onSubmit: (values) => {
      console.log(values);
      let compare = (data.find((d) => {
        return d.name === values.name;
      }))
      if (compare !== undefined) {
        (compare.name === values.name && compare.email === values.email) ?
        (window.alert("회원님의 아이디는 " + compare.id + " 입니다.") (navigate("/login", { replace: true }))) : (window.alert("이름과 이메일을 다시 한번 확인해주세요.")) 
      } else {
        window.alert("이름과 이메일을 다시 한번 확인해주세요.");
        console.log(compare.name, compare.email);
      }
    },
  });

  return (
    <FindidCss className="containerSize inside">
      <Spinner visible={loading} />
      <form onSubmit={formik.handleSubmit}>
        <div className="title">
          <h1>아이디 찾기</h1>
          <h2>Find ID</h2>
        </div>

        <div className='findIdArea'>          
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
            {(formik.touched.email || formik.touched.codeNum) && (formik.errors.email ? <span className="alert">{formik.errors.email}</span> :
              formik.errors.codeNum ? <span className='alert'>{formik.errors.codeNum}</span> : null)}
          </section>

          <div className="inputBox">
            <button className="input" type="submit">
              <span className="span">아이디 찾기</span>
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
    </FindidCss>
  );
});

export default FindId;