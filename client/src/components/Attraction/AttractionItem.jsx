/**
 * @file: AttractionMenuItem.jsx
 * @description: 추천명소 이미지
 * @author: 천경재
 */
 import React, { memo } from 'react';
 import AttractionModal from './AttractionModal';
 import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    height:100%;
    .imgWrap{width:100%; height:100%;}
`;

const Imgbox = styled.div`
    position : relative;
    width:100%;
    height:100%;
    background-color: ${props => props.theme.color.Main};
    img{
        width:100%;
        height:100%;
        object-fit: cover;
        cursor: pointer;
    }

    &.hover img{
        filter: opacity(.2) drop-shadow(0 0 0 black);
    }

    p{
        width:80%;
        color: ${props => props.theme.color.grayEL};
        text-align: center;
        font-size: ${props => props.theme.size.L};
        font-weight: ${props => props.theme.weight.B};
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -20%);
        display: none;
        &.on{display:block; cursor: pointer;}
    }
`;

const AttractionItem = memo(({item: {src, title, address}}) => {
     
    // 마우스 hover
    const [mouseOn, setMouseOn] = React.useState(false);
    const mouseHover = React.useCallback((e) => {
        setMouseOn(on => true);
    }, []);

    // 마우스 leave
    const mouseLeave = React.useCallback((e) => {
        setMouseOn(on => false);
    },[])
 
    // 이미지 모달창
    const [clickedImg, setClickedImg] = React.useState(null);
    const onModalOpen = React.useCallback((e) => {
        setClickedImg(e.target.src);
    }, []);

 
    return (
        <Container>
            <div className="imgWrap">
                <Imgbox onClick={onModalOpen} onMouseOver={mouseHover} onMouseLeave={mouseLeave} className={mouseOn ? 'hover' : ''}>
                    <img src={src} alt={title} />
                    <p className={mouseOn ? 'on' : ''}>{title}</p>
                </Imgbox>
            </div>
            <div className="modal">
                {clickedImg && (<AttractionModal clickedImg={clickedImg} setClickedImg={setClickedImg} title={title} address={address}/>)}
            </div>
        </Container>
    );
});

export default AttractionItem;