/**
 * @file: Community.jsx
 * @description: 커뮤니티 페이지 구현
 * @author: 천경재
 */

import React,{ memo } from 'react';
import MenuBar from '../../components/MenuBar';
import styled from 'styled-components';
import BoardList from '../../components/Community/BoardList';
import { Link } from "react-router-dom";
import writeImg from '../../assets/img/edit.png';


const CommunityContainer = styled.div`
position: relative;
 .addBoardIcon{
  position: absolute;
    width: 580px;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    
    @media (max-width: 640px) {
      width: 97%;
    }

    .fixIcon{
      position: fixed;
      width: 30px;
      img{
        width: 35px;
        height: 35px;
      }
    }
  }
`;

const Community = memo(() =>{


    return (
      <CommunityContainer> 
        <MenuBar/>
        <div className='containerSize media'>
        <div className="addBoardIcon">
          <Link to='/addBoard' className="fixIcon"><img className="iconImg" src={writeImg} alt="writImg"/></Link>
        </div>  
          <BoardList/>
        </div>
      </CommunityContainer>
  );
});

export default Community;