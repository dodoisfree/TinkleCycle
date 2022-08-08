import React, { memo } from "react";
import styled from "styled-components";
import bicycle from "../../assets/img/bicycle.png";
import MainRezSet from "./MainRezSet";

const MainListCSS = styled.div`
  margin: 40px 0;
  h3 {
    text-indent: -99999px;
  }
  &:first-child {
    margin: 0;
  }
  .rtShopBox {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 230px;
    border: 2px solid gray;
    border-radius: 10px;
    transition: all 0.5s;
    .rtShopInfoBox {
      width: 90%;
      height: 145px;
      display: flex;
      margin: 0 auto;
      margin-top: 10px;
      .textBlind {
        width: 100%;
        height: inherit;
        background: url(${bicycle}) no-repeat;
        background-size: 120px 120px;
        background-position: center;
      }
      .rtShopInfo {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        li {
          font-size: ${(props) => props.theme.size.M};
          padding-left: 15px;
        }
      }
      
    }
  }
`;

const MainList = memo(({ rtShopId, rtShopName, pakingTotal }) => {
  // map 클릭 이벤트 개별 선택
  const [isOpen, setIsOpen] = React.useState(false);
  const open = React.useCallback((e) => {
    setIsOpen((isOpen) => !isOpen);
  }, []);
  
  return (
    <MainListCSS>
        <div className="rtShopBox" style={isOpen? {height: '525px'} : {height: '230px'}}>
          <div className="rtShopInfoBox">
            <p className="textBlind">자전거 아이콘</p>
            <ul className="rtShopInfo">
              <li>번호 : {rtShopId}번</li>
              <li>{rtShopName} 대여소</li>
            </ul>
          </div>
          <MainRezSet pakingTotal={pakingTotal} isOpen={isOpen} open={open}/>
        </div>
  </MainListCSS>
  );
});

export default MainList;
