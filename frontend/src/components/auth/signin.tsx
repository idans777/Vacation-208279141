import axios from "axios"
import React, { useState, useContext } from "react"
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import { context } from '../../App'

export default function (props: any) {
  // const [user_name_temp, set_username] = useState('');
  const [password, set_password] = useState('');
  const my_context = useContext(context);
  const {login, toggle_login, user_name, set_user_name, token, set_token} = my_context
  const navigate = useNavigate()

  const input_change_handler = (set_func: any, event: any) => {
    set_func(event.target.value)
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    axios.post("http://localhost:3000/signin", {}, {headers: {user_name: user_name, password: password}}).then((res) => {
      if(res.status == 200) {
        set_user_name(user_name)
        set_token(res.data.token)
        toggle_login()
        navigate('/home', {replace: true})
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