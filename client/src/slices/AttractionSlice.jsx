/**
 * @file: AttractionSlice.jsx
 * @description: 추천명소 slice
 * @author: 천경재
 */

 import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
 import axios from 'axios';
 
 const API_URL = {
    gangnam : 'http://localhost:3001/gangnam',
    gangdong : 'http://localhost:3001/gangdong',
    gangbuk : 'http://localhost:3001/gangbuk',
    gangseo : 'http://localhost:3001/gangseo',
    gwanak : 'http://localhost:3001/gwanak',
    gwangjin : 'http://localhost:3001/gwangjin',
    guro : 'http://localhost:3001/guro',
    geumcheon : 'http://localhost:3001/geumcheon',
    nowon : 'http://localhost:3001/nowon',
    dobong : 'http://localhost:3001/dobong',
    dongdaemun : 'http://localhost:3001/dongdaemun',
    dongjak : 'http://localhost:3001/dongjak',
    mapo : 'http://localhost:3001/mapo',
    seodaemun : 'http://localhost:3001/seodaemun',
    seocho : 'http://localhost:3001/seocho',
    seongdong : 'http://localhost:3001/seongdong',
    seongbuk : 'http://localhost:3001/seongbuk',
    songpa : 'http://localhost:3001/songpa',
    yangcheon : 'http://localhost:3001/yangcheon',
    yeongdeungpo : 'http://localhost:3001/yeongdeungpo',
    yongsan : 'http://localhost:3001/yongsan',
    eunpyeong : 'http://localhost:3001/eunpyeong',
    jongro : 'http://localhost:3001/jongro',
    junggu : 'http://localhost:3001/junggu',
    jungnang : 'http://localhost:3001/jungnang',
 };

 export const getAttraction = createAsyncThunk("CommentSlice/getAttraction", async(payload,{rejectWithValue})=>{
   let result = null;
 
   try{
     result = await axios.get(API_URL[payload.api ? payload.api : 'gangnam']);
   }catch(err) {
     result = rejectWithValue(err.response);
   }
   return result;
 });
 
 const AttractionSlice = createSlice({
   name: 'attraction',
   initialState: {
     data: null,       
     loading: false, 
     error:null        
   },
   reducers: {},
   extraReducers: {
     [getAttraction.pending]: (state, {payload})=>{
       return{ ...state, loading: true}
     },
     [getAttraction.fulfilled]: (state,{payload})=>{
       return{
         data: payload?.data,
         loading: false,
         error: null
       }
     },
     [getAttraction.rejected]: (state,{payload})=>{
       return{
         data: payload?.date,
         loading:false,
         error:{
           code: payload?.status ? payload.status:500,
           message: payload?.statusText ? payload.statusText:'Server Error'
         }
       }
     }
   },
 });
 
 export default AttractionSlice.reducer;
 