import React, { useState, useContext, createContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Home from './components/home/home';
import Header from './components/header/header';
import Add_vacation from './components/add_vacation/add_vacation';
import Update_vacation from './components/update_vacation/update_vacation';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

function App() {
  return (
    <div className='app-container'>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/add_vacation' element={<Add_vacation />} />
          <Route path='/update_vacation' element={<Update_vacation/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
