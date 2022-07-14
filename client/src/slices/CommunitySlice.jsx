/**
 * @file: CommunitySlice.jsx
 * @description: 게시판 작성을 위한 slice
 * @author: 천경재
 */


import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios';


const API_URL ="http://localhost:3001/community";
/** 다중행 데이터 조회를 위한 비동기 함수 (게시판 목록조회) */
export const  getList= createAsyncThunk("CommunitySlice/getList", async(payload,{rejectWithValue})=>{
  let result = null;

  const board={}

  if(payload?.title){
    board.title=payload.title;
  }

  try{
    result = await axios.get(API_URL,{
      params:board
    });
  }catch(err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** 단일행 데이터 조회를 위한 비동기 함수 (게시판 읽기 기능) */
export const  getItem= createAsyncThunk("CommunitySlice/getItem", async(payload,{rejectWithValue})=>{
  let result = null;

  try{
    result = await axios.get(`${API_URL}/${payload.id}`);
  }catch(err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** 데이터 저장을 위한 비동기 함수 POST */
export const postItem= createAsyncThunk("CommunitySlice/postItem", async(payload,{rejectWithValue})=>{
  let result = null;

  try{
    result = await axios.post(API_URL,{
      object:payload.object,
      title: payload.title,
      content:payload.content,
      like_cnt: payload.like_cnt,
      comment_cnt: payload.comment_cnt,
      time: payload.time
    });
  }catch(err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** 데이터 수정을 위한 비동기 함수 PUT */
export const  putItem= createAsyncThunk("CommunitySlice/putItem", async(payload,{rejectWithValue})=>{
  let result = null;

  try{
    result = await axios.put(`${API_URL}/${payload.id}`,{
      object:payload.object,
      title: payload.title,
      content:payload.content,
      like_cnt: payload.like_cnt,
      comment_cnt: payload.comment_cnt,
      time: payload.time
    });
    
  }catch(err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

/** 데이터 삭제을 위한 비동기 함수 DELETE */
export const deleteItem= createAsyncThunk("CommunitySlice/deleteItem", async(payload,{rejectWithValue})=>{
  let result = null;

  try{
    result = await axios.delete(`${API_URL}/${payload.id}`);
  }catch(err) {
    result = rejectWithValue(err.response);
  }
  return result;
});

const CommunitySlice = createSlice({
  name: 'community',
  initialState: {
    data: null,       
    loading: false, 
    error:null,
     
  },
  reducers: {},
  extraReducers: {
    /** 다중행 데이터 조회를 위한 액션 함수 */
    [getList.pending]: (state, {payload})=>{
      return{ ...state, loading: true}
    },
    [getList.fulfilled]: (state,{payload})=>{
      return{
        data: payload?.data,
        loading: false,
        error: null
      }
    },
    [getList.rejected]: (state,{payload})=>{
      return{
        data: payload?.date,
        loading:false,
        error:{
          code: payload?.status ? payload.status:500,
          message: payload?.statusText ? payload.statusText:'Server Error'
        }
      }
    },
    /** 단일행 데이터 조회를 위한 액션 함수 */
    [getItem.pending]: (state, {payload})=>{
      return{ ...state, loading: true}
    },
    [getItem.fulfilled]: (state,{payload})=>{
      return{
        data: payload.data,
        loading: false,
        error: null
      }
    },
    [getItem.rejected]: (state,{payload})=>{
      return{
        data: payload?.date,
        loading:false,
        error:{
          code: payload?.status ? payload.status:500,
          message: payload?.statusText ? payload.statusText:'Server Error'
        }
      }
    },
    /** 데이터 저장를 위한 액션 함수 */
    [postItem.pending]: (state, {payload})=>{
      return{ ...state, loading: true}
    },
    [postItem.fulfilled]: (state,{payload})=>{
      let data=null;

      if(Array.isArray(state.data)){
        data=[...state.data];
        data.unshift(payload.data);
      }else{
        data=payload.data;
      }
      return{
        data: data,
        loading: false,
        error: null
      }
    },
    [postItem.rejected]: (state,{payload})=>{
      return{
        data: payload?.date,
        loading:false,
        error:{
          code: payload?.status ? payload.status:500,
          message: payload?.statusText ? payload.statusText:'Server Error'
        }
      }
    },
    
    /** 데이터 수정을 위한 액션 함수 */
    [putItem.pending]: (state, {payload})=>{
      return{ ...state, loading: true}
    },
    [putItem.fulfilled]: (state,{meta, payload})=>{
      let data=null;
      if(Array.isArray(state.data)){
        data=[...state.data];
        const index =data.findIndex(element => element.id === parseInt(meta.arg.id));

        if(index !== undefined){
          data.splice(index,1,payload.data);
        }
      }else{
        data= payload.data;
      }
      return{
        data: data,
        loading: false,
        error: null
      }
    },
    [putItem.rejected]: (state,{payload})=>{
      return{
        data: payload?.date,
        loading:false,
        error:{
          code: payload?.status ? payload.status:500,
          message: payload?.statusText ? payload.statusText:'Server Error'
        }
      }
    },
    /** 데이터 삭제를 조회를 위한 액션 함수 */
    [deleteItem.pending]: (state, {payload})=>{
      return{ ...state, loading: true}
    },
    [deleteItem.fulfilled]: (state,{meta,payload})=>{
      let data = null;
      if(Array.isArray(state.data)){
        data=[...state.data]
        const index = data.findIndex(element => element.id === parseInt(meta.arg.id))
          if(index !== undefined){
            data.splice(index,1);
          }
      }
      return{
        ...state,
        loading: false,
        error: null
      }
    },
    [deleteItem.rejected]: (state,{payload})=>{
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

export default CommunitySlice.reducer;
