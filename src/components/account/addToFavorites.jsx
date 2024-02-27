import { useEffect, useState } from "react"
import { AUTHPOST } from "../../App"
import DetailsMovie from "../movies/details"

//tengo que traer la lista y en esa lista hacer el POST
export default function AddToFavorites({movies, successAccount}){

    const getIdUser = localStorage.getItem('user')
    const idUser = JSON.parse(getIdUser)

    const [success, setSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const favoritesList = [movies]

    const config = {
        ...AUTHPOST,
        body: JSON.stringify(
            favoritesList
        )

    }

    useEffect(()=>{
        if (!idUser || !idUser.id) {
            console.error('Error: ID de usuario no válido');
            return;
        }

        setLoading(true)

        fetch(`https://api.themoviedb.org/3/account/${successAccount}/favorite`, config)
            .then((res)=>{
                console.log(res)
                if(!res.ok){
                    throw new Error('Fetching ERROR Add to Favorites')
                } 
                return res.json()
            })
            .then((data)=>{
                setSuccess(data)
                setLoading(false)
            })
            .catch((err)=>{
                setError(err)
                setLoading(false)
            })
    },[])

    if(loading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h1>{error.message}</h1>
    }

    console.log(success)

    return(
        <div>
        </div>
    )
}
