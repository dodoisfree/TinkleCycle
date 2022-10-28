/**
 * @file: Attraction.jsx
 * @description: 추천명소
 * @author: 천경재
 */
import React, { memo } from 'react';
import {Routes, Route} from 'react-router-dom';
import AttractionContent from '../components/Attraction/AttractionContent';
import AttractionMenu from '../components/Attraction/AttractionMenu';

const Attraction = memo(() => {
    return (
        <>
            <AttractionMenu />
            <div className='containerSize media'>
                <Routes>
                    <Route path="/:api" element={<AttractionContent />} />
                </Routes>
            </div>
        </>
    );
});

export default Attraction;