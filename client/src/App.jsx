import React, { memo } from 'react';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Account/Login';
import Join from './pages/Account/Join';
import Footer from "./components/Footer";
import Community from './pages/Community/Community';
import Main from './pages/Main';
import Attraction from './pages/Attraction';
import FindId from './pages/Account/FindId';
import FindPw from './pages/Account/FindPw';
import GoTop from './components/GoTop';
import MyPage from './pages/MyPage';
import EditBoard from './pages/Community/EditBoard';
import AddBoard from './pages/Community/AddBoard';
import EditComment from './components/Community/Section/EditComment';
import MenuBar from './components/MenuBar';
// import Pasing from './pages/Pasing';


const App = memo(() => {
  return (
    <div>
      <Header />
      <MenuBar />
      <Routes>
        <Route path='/' exact element={<Main/>}/>
        <Route path='/attraction/*' element={<Attraction/>}/>
        <Route path='/myPage' element={<MyPage/>}/>
        <Route path='/login'  element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/login/findId' element={<FindId />} />
        <Route path='/login/findPw' element={<FindPw />} />
        <Route path='/community' element={<Community/>}/>
        <Route path='/addBoard' element={<AddBoard/>} />
        <Route path='/editBoard/:id'  element={<EditBoard/>} />
        <Route path='/editComment/:id' element={<EditComment/>}/>
      </Routes>
      <GoTop />
      <Footer/>
    </div>
  );
});

export default App;