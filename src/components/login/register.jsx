import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH, UserContext } from "../../App";
import '../login/styles/form.css'
export default function Register() {
  const [success, setSuccess] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  
  useEffect(() => {
    setLoading(true);

    fetch(`https://api.themoviedb.org/3/authentication/guest_session/new`, AUTH)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetching ERROR Register");
        }
        return res.json();
      })
      .then((data) => {
        setSuccess(data.guest_session_id)
        setLoading(false);
        })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <h1>LOADING...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }


  return (
    <div className="div-global-form">
      <div className="div-semiglobal-form">
        <h1 className="title-form">Register</h1>
        <label className="label-form">
          <h3>New Username</h3>
          <input
            placeholder="Insert new Username"
            type="text"
            className="input-form"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </label>
        <label className="label-form">
          <h3>New Password</h3>
          <input
            placeholder="Insert new Password"
            type="password"
            className="input-form"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label >
            <SaveUser success={success} 
            user={user} 
            password={password}/>
      </div>
    </div>
  );
}


const SaveUser = ({ success, user, password }) => {
  const { userState, setUserState } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const infoUser = { id: success, userName: user, userPassword: password };
    setUserState((prevUserState) => ({
      ...prevUserState,
      infoUser,
      isRegister: true,
    }));
    localStorage.setItem('user', JSON.stringify(infoUser))
    localStorage.setItem('registered', JSON.stringify(userState.isRegister))
  }, [success, user, password, setUserState]);

  return (
    <div>
      <button className="btn-form" onClick={() => {navigate('/login')}} disabled={!user || !password}>Create User</button>
    </div>
  );
};