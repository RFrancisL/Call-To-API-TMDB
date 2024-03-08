import { AUTH } from "../../App"
import useFetch from "../useFetchs"

let REQUEST_TOKEN = null
export default function RequestToken(){
    const {success, loading, error} = useFetch('https://api.themoviedb.org/3/authentication/token/new', AUTH)

    if(loading){
        return<h1>LOADING...</h1>
    }

    if(error){
        return<h1>{error}</h1>
    }

    REQUEST_TOKEN = success.request_token
    function Authenticate(){        
        const {success, loading, error} = useFetch(`https://www.themoviedb.org/authenticate/${REQUEST_TOKEN}?redirect_to=http://localhost:5173/approved`)
    }
    
    return  console.log(REQUEST_TOKEN)
}

