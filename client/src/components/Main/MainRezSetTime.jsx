import React, { memo, useEffect, useState } from "react";

const MainRezSetTime = memo(({ formik, class1, class2, class3, name1, name2, name3, name4, content, color }) => {

  const [hour, setHr] = useState([]);
  const [min, setMin] = useState([]);

  // 시간, 분 배열 만들기.
  useEffect(() => {
    let arry;
    const hr = [...new Array(0 + 12)].map((v, i) => {
      let sum = 1+i;
      1+i < 10 && (arry = ('0' + sum))
      sum >= 10 && (arry = ('' + sum))
      return arry;
    });
    const min = [...new Array(0 + 60)].map((v, i) => {
      let sum = 1+i;
      sum < 10 && (arry = ('0' + sum))
      sum >= 10 && (arry = ('' + sum))
      return arry;
    });
    setHr(hr);
    setMin(min);
  }, []);

  //console.log(hour);
  return (
    <div className={class1} name={name1} value={formik.values.name1} {...formik.getFieldProps(name1)}>
      <div className={class2}>
        <label htmlFor={name2}>
          <h4 style={content === '시작' ? {color: 'blue'} : content === '반납' && {color: 'red'}}>{content}</h4>
          <h4>시간</h4>
        </label>
        <select id={name2} className={class3} name={name2} value={formik.values.name2} {...formik.getFieldProps(name2)}>
          <option value="오전">오전</option>
          <option value="오후">오후</option>
        </select>
        <select className={class3} name={name3} value={formik.values.name3} {...formik.getFieldProps(name3)}>
          {hour.map((v, i) => <option key={i} value={v}>{v}</option> )}
        </select>
        <select className={class3} name={name4} value={formik.values.name4} {...formik.getFieldProps(name4)}>
          {min.map((v, i) => <option key={i} value={v}>{v}</option> )}
        </select>
      </div>
    </div>
  );
});

export default MainRezSetTime;
