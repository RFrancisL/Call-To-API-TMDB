// createSession.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import '../login/styles/form.css'

export default function Login() {
  const [valueUser, setValueUser] = useState("");
  const [valuePassword, setValuePassword] = useState("");

  return (
    <div>
      <div className="div-semiglobal-form">
        <h1 className="title-form">Login</h1>
        <label>
          <h3>UserName</h3>
          <input
            placeholder="Insert UserName"
            type="text"
            className="input-form"
            value={valueUser}
            onChange={(e) => setValueUser(e.target.value)}
          />
        </label>
        <label>
          <h3>Password</h3>
          <input
            placeholder="Insert Password"
            type="password"
            className="input-form"
            value={valuePassword}
            onChange={(e) => setValuePassword(e.target.value)}
          />
        </label>
        {valueUser && valuePassword ? (
          <HandleLogin valueUser={valueUser} valuePassword={valuePassword}/>
        ):(null)}
        <h3>You do NOT have any account? <Link to={'/register'}>Register</Link></h3>
        </div>
        
    </div>
  );
}

const HandleLogin = ({ valueUser, valuePassword }) => {
  const { userState } = useContext(UserContext)
  const navigate = useNavigate()
  const [message, setMessage] = useState(' ')

  useEffect(()=>{
    localStorage.setItem('valueUser', valueUser)
    localStorage.setItem('valuePassword', valuePassword)
  },[])

  const USER = localStorage.getItem('user')
  const user = JSON.parse(USER)
  return (
    <div>
      <button
        className="btn-form"
        onClick={() => {
          if (user.userName === valueUser && user.userPassword === valuePassword && user.id) {
            navigate('/');
          } else {
            setMessage('You are NOT Registered!')
          }
        }}
      >
        Enter
      </button>
      <h3>{message}</h3>
    </div>
  );
}
