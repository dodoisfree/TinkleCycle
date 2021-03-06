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
        .required("?????? ?????????????????????.")
        .matches(/^[a-z0-9_-]{5,15}$/, "5~15?????? ?????? ?????????, ????????? ????????????(_),(-)??? ?????? ???????????????."),
      email: Yup.string()
        .required("?????? ?????????????????????.")
        .email("????????? ????????? ?????? ??????????????????."),
      // pw: Yup.string()
      //   .required("?????? ?????????????????????.")
      //   .matches(/^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^*+=-])[a-zA-Z0-9!@#$%^*+=-]{8,16}$/, "8~16??? ?????? ??? ?????????, ??????, ??????????????? ???????????????."),
      // pwCfm: Yup.string()
      //   .required("?????? ?????????????????????.")
      //   .oneOf([Yup.ref("pw"), null], "??????????????? ???????????? ????????????."),
    }),
    onSubmit: (values) => {
      console.log(values);
      let compare = (data.find((d) => {
        return d.id === values.id;
      }))
      if (compare !== undefined) {
        (compare.id === values.id && compare.email === values.email) ?
        (window.alert("???????????? ????????? ?????? ?????????")) : (window.alert("???????????? ???????????? ?????? ?????? ??????????????????.")) 
      } else {
        window.alert("???????????? ???????????? ?????? ?????? ??????????????????.");
        console.log(compare.id, compare.email);
      }
    },
  });

  return (
    <FindPwCss className="containerSize inside">
      <Spinner visible={loading} />
      <form onSubmit={formik.handleSubmit}>
        <div className="title">
          <h1>???????????? ??????</h1>
          <h2>Find PW</h2>
        </div>

        <div className='findIdArea'>
          <section className="inputBox">
            <label htmlFor="id">
              <strong><b>*</b>?????????</strong>
            </label>
            <input id="id" className="input" type="text" name="id" maxLength="20" placeholder="????????? ??????????????????."
              value={formik.values.id} {...formik.getFieldProps("id")} />
            {formik.touched.id ? (<span className="alert">{formik.errors.id}</span>) : null}
          </section>

          <section className="inputBox">
            <label>
              <strong><b>*</b>?????????</strong>
            </label>
            <span className="emailBox">
              <input id="email" className="input" type="email" name="email" maxLength="50" placeholder="???????????? ??????????????????."
                value={formik.values.email} {...formik.getFieldProps("email")} />
              <input className="input" type="button" value="????????????" disabled/>
            </span>
            <span className="emailBox">
              <input className="input" type="text" name="codeNum" maxLength="6" placeholder="??????????????? ??????????????????." disabled
                value={formik.values.codeNum} {...formik.getFieldProps("codeNum")} />
              <input className="input" type="button" value="????????????" disabled />
            </span>
            {formik.touched.email ? (<span className="alert">{formik.errors.email}</span>) : null}
          </section>

          <div className='setPwBox'>
            <section className="inputBox">
              <label htmlFor="pw">
                <strong><b>*</b>??? ????????????</strong>
              </label>
              <input id="pw" className="input" type="password" name="pw" maxLength="20" placeholder="??????????????? ??????????????????."
                value={formik.values.pw} {...formik.getFieldProps("pw")} />
              {formik.touched.pw ? (<span className="alert">{formik.errors.pw}</span>) : null}
            </section>

            <section className="inputBox">
              <label htmlFor="pwCfm">
                <strong><b>*</b>??? ???????????? ??????</strong>
              </label>
              <input id="pwCfm" className="input" type="password" name="pwCfm" maxLength="20" placeholder="??????????????? ?????? ??? ??????????????????."
                value={formik.values.pwCfm} {...formik.getFieldProps("pwCfm")} />
              {formik.touched.pwCfm ? (<span className="alert">{formik.errors.pwCfm}</span>) : null}
            </section>
          </div>

          <div className="inputBox">
            <button className="input" type="submit">
              <span className="span">???????????? ??????</span>
            </button>
          </div>
        </div>

        <div className="findArea">
          <div className="findBox">
            <Link className="find" to='/login/findId'>????????? ??????</Link>
            <Link className="find" to='/login/findPw'>???????????? ??????</Link>
          </div>
        </div>
      </form>
    </FindPwCss>
  );
});

export default FindPw;