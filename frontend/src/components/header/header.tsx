import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
//State
import { store, type RootState } from "../../state/store"
import { logout } from "../../state/login_slice"
import { clear_token } from "../../state/token_slice"
import { clear_username } from "../../state/user_slice"

export default function () {
    const auth = useSelector((state:RootState) => state.login_reducer.value)
    const dispatch = useDispatch()
    const signout = () => {
        dispatch(logout())
        dispatch(clear_token())
        dispatch(clear_username())
        console.log('logged out')
    }

    if(!auth)
        return(
            <div className="header-container">
                <Link className='main_link' to='/signin'> Signin </Link>
                <Link className='main_link' to='/signup'> Signup </Link>
            </div>
        )
    else
        return(
            <div className="header-container">
                <Link className='main_link' to='/signin' onClick={()=>{signout()}}> Signout </Link>
            </div>
        )
}