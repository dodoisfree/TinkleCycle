/**
 * @file: OkTemplate.jsx
 * @description: 확인 모달창 틀
 * @author: 천경재
 */

import React, { memo } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    position:fixed;
    top:50%;
    left:50%;
    z-index: 100;
    width: 250px;
    height:150px;
    transform: translate(-50%,-50%);
    background: white;
    border:1px solid #7e7e7e;
    
    .modalInner{
        padding : 10px;
        
        button{
            width:100%;
            height:30px;
            margin-top:10px;
            border: none;
            background-color: ${props => props.theme.color.BG};
            color: #fff;
            border-radius: 3px;
        }
    }
    .textWrap{
        padding:27px 5%;
        height: 33px;
        p{
            text-align: center;
            line-height:1.3;
        }
    }
`;
const OkTemplate = memo(({children}) => {
    return (
        <ModalContainer>
            <div className="modalInner">
                <div className="textWrap">
                    <p>{children}</p>
                </div>
                <button>확인</button>
            </div>
        </ModalContainer>
    );
});

export default OkTemplate;