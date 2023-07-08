import React from 'react';
import './css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './pages/home';
import Signup from './pages/signup';
import PersonalList from './pages/personalList';
import Login from './pages/login';
import Favorites from './pages/favorite';
//import AddNewIngredient from './components/addNewIngredient';
//import ChatGPT from './components/chatGPT';


function MyFrigo() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />}></Route>
            <Route path="signup" element={<Signup />}></Route>
            <Route path="login" element={<Login />}></Route>
            <Route path="personalingredients" element={<PersonalList />}></Route>
            <Route path="favorite" element={<Favorites />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <AddNewIngredient /> */}
      {/* <ChatGPT /> */}
    </div>
  );
}

export default MyFrigo;
