import React, { useState } from "react"
import Axios from "axios"

export default function (props: any) {
    const [first_name, set_first_name] = useState('')
    const [last_name, set_last_name] = useState('')
    const [user_name, set_user_name] = useState('')
    const [password, set_password] = useState('')

    const input_change_handler = (set_func: any, event: any) => {
        set_func(event.target.value)
    }

  const onSubmit = (event: any) => {
    event.preventDefault()
    
    const new_user = {
        first_name: first_name,
        last_name: last_name,
        user_name: user_name,
        password: password,
    }
    console.log(new_user)
    Axios.post('http://localhost:3000/signup', {}, {params: new_user}).then((res => {
        console.log(res.data)
    }))
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={(event) => {onSubmit(event)}}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <a className="link-primary" href="signin">
              Sign In
            </a>
          </div>
          <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane"
              onChange={(event) => {input_change_handler(set_first_name, event)}}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Doe"
              onChange={(event) => {input_change_handler(set_last_name, event)}}
            />
          </div>
          <div className="form-group mt-3">
            <label>User Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g JaneDoe123"
              onChange={(event) => {input_change_handler(set_user_name, event)}}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(event) => {input_change_handler(set_password, event)}}
            />
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