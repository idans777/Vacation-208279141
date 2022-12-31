import axios from "axios"
import React, { useState, useContext } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { context } from '../../App'
import { useDispatch } from "react-redux"
//State
import { login, logout } from '../../state/login_slice'
import { set_username } from '../../state/username_slice'
import { set_token } from '../../state/token_slice'
import { useSelector } from "react-redux"//-------------
export default function (props: any) {
  const [password, set_password] = useState('');
  const [user_name, set_user_name] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const input_change_handler = (set_func: any, event: any) => {
    set_func(event.target.value)
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    axios.post("http://localhost:3000/signin", {}, {headers: {user_name: user_name, password: password}}).then((res) => {
      if(res.status == 200) {
        // const vacations = useSelector((state:any) => state.vacation_reducer.value)
        // console.log(vacations)
        dispatch(set_username(user_name))
        dispatch(set_token(res.data.token))
        dispatch(login())
        navigate('/home', {replace: true})
        console.log('Logged in')
      }
    })
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={onSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <a className="link-primary" href="signup">
              Sign Up
            </a>
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter user name"
              onChange={(event) =>{input_change_handler(set_user_name, event)}}
              required/>
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(event) =>{input_change_handler(set_password, event)}}
              required/>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  )
}