import { useContext, useEffect } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import '../../home.css'

export default function Logout(){
    const { setUserState } = useContext(UserContext)
    const navigate = useNavigate()

    localStorage.getItem('valueUser')
    localStorage.getItem('valuePassword')

    const CloseSession = () => {
        localStorage.removeItem('valueUser')
        localStorage.removeItem('valuePassword')
        navigate('/')
    }
    return(
        <div>
            <div>
                <button className="btn-home" onClick={CloseSession}>Logout</button>
            </div>
        </div>
    )
}