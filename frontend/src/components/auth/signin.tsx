
import axios from "axios"
import React, { useState } from "react"

export default function (props: any) {

  const [user_name, set_username] = useState('');
  const [password, set_password] = useState('');
  
  const input_change_handler = (set_func: any, event: any) => {
    set_func(event.target.value)
  }

  const onSubmit = (event: any) => {
    event.preventDefault()
    console.log(user_name, password);
    axios.post("http://localhost:3000/signin", {}, {auth: {username: user_name, password: password}}).then((res) => {
      console.log("lizard");
      console.log(res);
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
              onChange={(event) =>{input_change_handler(set_username, event)}}
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