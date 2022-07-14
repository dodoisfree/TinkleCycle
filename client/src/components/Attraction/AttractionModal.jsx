/**
 * @file: AttractionModal.jsx
 * @description: 추천명소 사진 modal
 * @author: 천경재
 */
import React, { memo } from 'react';
import styled from 'styled-components';

const ModalContain = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    z-index: 1000;
    background-color:rgba(0,0,0,.8);
    color:${props => props.theme.color.grayEL};

    .modalWrap{
        width:640px;
        position:absolute;
        left:50%;
        top:50%;
        transform: translate(-50%,-50%);
        @media (max-width: 640px) {width: 100%;}
    }
    img{
        width:100%;
        height:400px;
        object-fit: cover;
    }
    p{
        padding: 10px 0;
        font-size: ${props => props.theme.size.M};
    }
    h3{
        padding-top:10px;
        font-size: ${props => props.theme.size.XL};
        font-weight: ${props => props.theme.weight.EB};
    }
`;
const AttractionModal = memo(({title, address, clickedImg, setClickedImg}) => {
 
    const onModalClose = React.useCallback((e) => {
        setClickedImg(null);
    }, [setClickedImg])
    return (
        <ModalContain onClick={onModalClose}>
            <div className="modalWrap">
                <img src={clickedImg} alt={title}/>
                <h3>{title}</h3>
                <p>{address}</p>
            </div>
        </ModalContain>
    );
});
 
export default AttractionModal;