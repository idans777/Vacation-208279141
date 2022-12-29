import React, { useState, useContext, createContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Home from './components/home';

export const context = createContext<any>({});

function Router() {
  return (
    <BrowserRouter>
      <Link className='main_link' to='/home'> Home </Link>
      <Link className='main_link' to='/signin'> Signin </Link>
      <Link className='main_link' to='/signup'> Signup </Link>
      <Routes>
        <Route path='/' element={<Signin />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

function App() {
  const [login, set_login] = useState('0');
  const [user_name, set_user_name] = useState('');
  const [token, set_token] = useState('')
  const toggle_login = () => {
    set_login( x => x==='1'?'0':'1' )
  }
  return (
    <context.Provider value={ { login, toggle_login, user_name, set_user_name, token, set_token } }>
      <Router></Router>
    </context.Provider>
  );
}

export default App;
