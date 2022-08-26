/**
 * @file: Attraction.jsx
 * @description: 추천명소
 * @author: 천경재
 */
import React, { memo } from 'react';
import {Routes, Route} from 'react-router-dom';

import MenuBar from '../components/MenuBar';
import AttractionContent from '../components/Attraction/AttractionContent';
import AttractionMenu from '../components/Attraction/AttractionMenu';
import styled from 'styled-components';

const ATRT = styled.div`
    background-color: aliceblue;
`;

const Attraction = memo(() => {
    return (
        <ATRT>
            <MenuBar />
            <AttractionMenu />
            <div className='containerSize media'>
                <Routes>
                    <Route path="/:api" element={<AttractionContent />} />
                </Routes>
            </div>
        </ATRT>
    );
});

export default Attraction;