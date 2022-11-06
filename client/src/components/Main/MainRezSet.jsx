import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import MainRezSetTime from "./MainRezSetTime";

const MainRezSetCss = styled.form`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  margin-bottom: 20px;
  overflow: hidden;
  .h3 {
    text-indent: 0;
    padding-left: 5px;
  }
  .input {
    outline: none;
  }
  .btns {
    width: 100%;
    display: flex;
    padding: 5px 0;
    .rezBtn {
      width: 100%;
      height: 45px;
      border: 1px solid #98d6f6;
      border-radius: 5px;
      background-color: #98d6f6;
      padding: 0;
      font-weight: ${(props) => props.theme.weight.B};
      color: #f6f3f2;
      font-size: 20px;
      margin: 0 10px;
      &:hover {
        background-color: #228ae6;
      }
    }
    .prevBtn {
      width: 100%;
      height: 45px;
      border: 1px solid #98d6f6;
      border-radius: 5px;
      background-color: #98d6f6;
      padding: 0;
      font-weight: ${(props) => props.theme.weight.B};
      color: #f6f3f2;
      font-size: 20px;
      margin: 0 10px;
      &:hover {
        background-color: #228ae6;
      }
      &:disabled {
        border: 1px solid #ccc;
        background-color: #ccc;
      }
    }
  }
  .rezSetArea {
    width: 100%;
    height: 100%;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    .rezSetGroup {
      display: flex;
      &:first-child {
        height: 100%;
        .dateSetBox {
          width: 100%;
          height: 120px;
          display: flex;
          flex-direction: column;
          margin: 10px 10px;
          .dateSet {
            height: 100%;
            display: flex;
            justify-content: space-evenly;
            margin-top: 10px;
            border: 2px solid #aaa;
            border-radius: 5px;
            .dateIpt {
              width: 30px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              //border: 1px solid red;
              margin: 5px 0;
              > p {
                width: 100%;
                height: 30px;
                line-height: 30px;
                font-size: ${(props) => props.theme.size.L};
                text-align: center;
                box-sizing: border-box;
              }
              > input {
                appearance: none;
                width: 100%;
                height: 30px;
                margin: 0;
                margin-bottom: 5px;
                box-sizing: border-box;
                border-radius: 100%;
                font-size: ${(props) => props.theme.size.L};
                font-weight: ${(props) => props.theme.weight.B};
                &::before {
                  content: attr(data-day);
                  display: block;
                  width: 100%;
                  height: inherit;
                  line-height: 30px;
                  text-align: center;
                  padding-right: 1.5px;
                  border-radius: 100%;
                  box-sizing: border-box;
                }
                &:checked {
                  background-color: #228ae6;
                  border: 1px solid #228ae6;
                }
              }
              .today {
                height: auto;
                line-height: ${(props) => props.theme.size.S};
                font-size: ${(props) => props.theme.size.S};
                font-weight: ${(props) => props.theme.weight.B};
                color: #228ae6;
              }
              .notToday {
                height: auto;
                text-indent: -99999px;
                line-height: ${(props) => props.theme.size.S};
                font-size: ${(props) => props.theme.size.S};
              }
            }
          }
        }
      }
      &:last-child {
        .rezSetBox {
          width: 100%;
          height: 120px;
          display: flex;
          flex-direction: column;
          margin: 10px 10px;
          .rezSet {
            width: 100%;
            height: 100%;
            border: 2px solid #aaa;
            border-radius: 5px;
            box-sizing: border-box;
            margin-top: 10px;
            display: flex;
            > p {
              font-size: ${(props) => props.theme.size.M};
              margin: auto auto;
              padding-left: 10px;
            }
            .iptBox {
              width: 50%;
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              padding-right: 10px;
              .bicCnt {
                width: 80%;
                text-align: center;
                padding-left: 10px;
                margin: 0 auto;
              }
              > span {
                font-size: ${(props) => props.theme.size.M};
                margin: 0 auto;
              }
            }
          }
          &:last-child {
            .rezSet {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              height: 120px;
              .iptBox {
                width: 100%;
                height: 100%;
                box-sizing: border-box;
                padding: 0;
                margin: 0 auto;
                .one {
                  border-bottom: 1px solid #aaa;
                }
                .two {
                  border-top: 1px solid #aaa;
                }
                .timeBox {
                  width: 100%;
                  height: 100%;
                  display: flex;
                  box-sizing: border-box;
                  margin: 0 auto;
                  padding: 2px;
                  .time {
                    width: 100%;
                    height: 100%;
                    padding-left: 5px;
                    margin-right: 2px;
                    &:last-child {
                      margin-right: 0;
                    }
                  }
                  > label {
                    width: 50%;
                    height: 100%;
                    box-sizing: border-box;
                    padding-top: 3px;
                    > h4 {
                      line-height: 18px;
                      text-align: center;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const MainRezSet = memo(({ pakingTotal, isOpen, open }) => {

  // 예약 폼 펼치기 전 예약하기 클릭 시 서브밋 방지
  const [btnType, setBtnType] = useState();
  useEffect(() => {
    !isOpen ? setBtnType("button") : setBtnType("submit");
  }, [isOpen]);

  // 현재 날짜부터 2주 동안의 날짜 데이터를 JSON 배열에 담기
  const [twoWeek, setTwoWeek] = useState([]);
  const [defaultDay] = useState(dayjs());
  useEffect(() => {
    const today = dayjs();
    const srtDate = new Date(today);
    const edate = new Date(today.add(+2, "week").add(-1, "d"));
    let result = [];
    while (srtDate <= edate) {
      let fmDate = new dayjs(srtDate);
      result.push({
        year: fmDate.$y,
        month: fmDate.$M,
        day: fmDate.$D,
        Mday: fmDate.daysInMonth(),
        dayOfWeek: fmDate.locale("ko").format("ddd"),
      });
      srtDate.setDate(srtDate.getDate() + 1);
    }
    setTwoWeek(result);
  }, []);

  console.log();
  // 유효성 검사
  const formik = useFormik({
    initialValues: {
      bicCnt: "",
      date: defaultDay.format("D"),
      startTime: defaultDay.locale('ko').format("A") + defaultDay.format("hh") + ':' + defaultDay.format("mm"),
      sTime: defaultDay.locale('ko').format("A"),
      sHr: defaultDay.format("h"),
      sMin: defaultDay.format("mm"),
      endTime: "",
      eTime: defaultDay.locale('ko').format("A"),
      eHr: defaultDay.format("h"),
      eMin: defaultDay.format("mm"),
    },
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <MainRezSetCss onSubmit={formik.handleSubmit}>
      <div className="btns">
        <button type={btnType} onClick={isOpen ? null : open} className="rezBtn">예약하기</button>
        <button type="button" onClick={isOpen ? open : null} className="prevBtn" disabled={!isOpen ? true : false}>뒤로가기</button>
      </div>
      <div className="rezSetArea">
        <div className="rezSetGroup">
          <section className="dateSetBox">
            <h3 className="h3"><strong>날짜 선택</strong></h3>
            <div className="dateSet" {...formik.getFieldProps("date")}>
              {twoWeek && twoWeek.map(({day, dayOfWeek}, i) => {
                return (    
                  <label className="dateIpt" key={i} htmlFor={`day${day}`}>
                    <p>{dayOfWeek}</p>
                    <input id={`day${day}`} defaultChecked={i === 0} type="radio" name="date" value={day} data-day={day}/>
                    {i === 0 ? <p className="today">오늘</p> : <p className="notToday">X</p> }
                  </label>
                );
              })}
            </div>
          </section>
        </div>

        {/*  */}
        <div className="rezSetGroup">
          <section className="rezSetBox">
            <label htmlFor="bicCnt">
              <h3 className="h3"><strong>수량 선택</strong></h3>
            </label>
            <div className="rezSet">
              <p>1인용 자전거</p>
              <div className="iptBox">
                <input id="bicCnt" className="bicCnt input" type="number" name="bicCnt" placeholder={(pakingTotal <= 0) ? "보유 수량없음" : "수량선택"} max={pakingTotal} min={0} 
                disabled={(pakingTotal <= 0) ? true : false} {...formik.getFieldProps("bicCnt")} />
                <span><b style={Number(pakingTotal) === 0 ? { color: "red" } : { color: "blue" }}>{pakingTotal}</b> 대 (보유수량)</span>
              </div>
            </div>
          </section>

          <section className="rezSetBox">
            <label htmlFor="time">
              <h3 className="h3"><strong>대여시간 선택</strong></h3>
            </label>
            <div className="rezSet" >
              <MainRezSetTime formik={formik} class1="iptBox" class2="timeBox one" class3="time input" name1="startTime" name2="sTime" name3="sHr" name4="sMin" content="시작" />
              <MainRezSetTime formik={formik} class1="iptBox" class2="timeBox two" class3="time input" name1="endTime" name2="eTime" name3="eHr" name4="eMin" content="반납" />
            </div>
          </section>
        </div>
      </div>
    </MainRezSetCss>
  );
});

export default MainRezSet;