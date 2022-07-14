/**
 * @file: Attraction.jsx
 * @description: 추천명소
 * @author: 천경재
 */
import React, { memo } from 'react';
import {Routes, Route} from 'react-router-dom';
import styled from 'styled-components';

import MenuBar from '../components/MenuBar';
import AttractionContent from '../components/Attraction/AttractionContent';
import AttractionMenu from '../components/Attraction/AttractionMenu';

const AttractionContainer = styled.div`
    
`;
const Attraction = memo(() => {
    return (
        <>
            <MenuBar />
            <AttractionMenu />

            <AttractionContainer className="containerSize media">
                <Routes>
                    <Route path="/:api" element={<AttractionContent />} />
                </Routes>
            </AttractionContainer>
        </>
    );
});

export default Attraction;