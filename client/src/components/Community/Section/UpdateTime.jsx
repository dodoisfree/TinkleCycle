/**
 * @file: UpdateTime.jsx
 * @description: 글 작성 시, 시간 업로드를 위한 구현
 * @author: 천경재
 */
/* 
  import React,{ memo }  from 'react';

  const UpdateTime = memo((time)=> {
          const nowTime = new Date();
          const writtenTime = new Date(time.time);
  
          const TimeDate = Math.floor((nowTime.getTime() - writtenTime) / 1000 / 60);
          const TimeDiffHour = Math.floor(TimeDate / 60);
          const TimeDiffDay = Math.floor(TimeDate / 60 / 24);
  
          if (TimeDate < 1) {
              return '방금 전'
          } else if (TimeDate < 60) {
              return `${TimeDate}분 전`;
          } else if (TimeDiffHour < 24) {
              return `${TimeDiffHour}시간 전`;
          } else if (TimeDiffDay < 365) {
              return `${TimeDiffDay}일 전`;
          } else if (TimeDiffDay / 365){
            return `${TimeDiffDay}년 전`;
          }
  
          return (
              <div>
                    {`${Math.floor(TimeDiffDay / 365)}년 전`}
              </div>
          )
  })
  export default UpdateTime; */

  import React,{memo} from "react";    
  import dayjs from "dayjs";

  
  const UpdateTime = memo((time) =>{
    const nowTime = dayjs();
    const writtenTime = new Date(time.time);

    const TimeDate = Math.floor((nowTime.getTime() - writtenTime) / 1000 / 60);
    const TimeDiffHour = Math.floor(TimeDate / 60);
    const TimeDiffDay = Math.floor(TimeDate / 60 / 24);
    if (TimeDate < 1) {
        return '방금 전'
    } else if (TimeDate < 60) {
        return `${TimeDate}분 전`;
    } else if (TimeDiffHour < 24) {
        return `${TimeDiffHour}시간 전`;
    } else if (TimeDiffDay < 365) {
        return `${TimeDiffDay}일 전`;
    } else if (TimeDiffDay / 365){
      return `${TimeDiffDay}년 전`;
    }

    return (
        <div>
              {`${Math.floor(TimeDiffDay / 365)}년 전`}
        </div>
    );
  });
  
  export default UpdateTime;


