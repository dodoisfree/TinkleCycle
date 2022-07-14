/**
 * @file: AttractionContent.jsx
 * @description: 추천명소 사진 리스트
 * @author: 천경재
 */
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAttraction } from '../../slices/AttractionSlice';
import styled from 'styled-components';
import AttractionItem from './AttractionItem';
import Spinner from '../Spinner';
import ErrorView from '../ErrorView';
 
const ContentWrap = styled.div`
margin: 50px 0;
`;
const ItemContainer = styled.div`
display: flex;
flex-wrap: wrap;
    
    .itemBox{
        width:32.6%;
        height: 200px;
        margin-right:1%;
        margin-bottom: 5px;
            
        &:nth-child(3n+0){
            margin-right:0;
        }
        @media (max-width: 640px) {height: 130px;}
    }
`;
const AttractionContent = memo(() => {
    // 구 가져오기
    const {api} = useParams();
 
    const dispatch = useDispatch();
    const {data, loading, error} = useSelector((state) => state.attraction);
 
    React.useEffect(() => {
        dispatch(getAttraction({
            api: api
        }))
    }, [dispatch, api]);
 
    return (
        <ContentWrap>
            <Spinner visible = {loading} />

            {error ? (
                <ErrorView error={error} />
            ) : data && (
                <ItemContainer>
                    {data.map((v, i) => {
                        return(
                            <div key={i} className="itemBox">
                                <AttractionItem type={api} item={v} />
                            </div>
                        )
                    })}
                </ItemContainer>
            )}
        </ContentWrap>
    );
});
 
export default AttractionContent;