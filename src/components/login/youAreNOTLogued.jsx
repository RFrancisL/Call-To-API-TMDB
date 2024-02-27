import { Link } from "react-router-dom"

export default function YouAreNotLogued(){
    return(
        <div style={{textAlign:'center'}}>
            <h1>You are NOT Logued 😢</h1>
            <h3>Have you an account? <Link to={'/login'}>Login</Link></h3>
        </div>
    )
}