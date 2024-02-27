import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { AUTH } from "../../App"
import '../movies/styles/reviews.css'
export default function Reviews(){
    const { id } = useParams()

    const [dataSuccess, setDataSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)

        fetch(`https://api.themoviedb.org/3/movie/${id}/reviews`, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Reviews')
                }
                return res.json()
            })
            .then((data)=>{
                setDataSuccess(data.results)
                setLoading(false)
            })
            .catch((err)=>{
                setError(err)
                setLoading(false)
            })
    },[id])

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }
    
    return (
        <div className="global-reviews">
            {dataSuccess.map((review) => {
                return (
                    <div key={review.id} className="card-review">
                        <h1>{review.author}</h1>
                        <img src={review.author_details.avatar_path}/>
                        <h3>Username: {review.author_details.username}</h3>
                        <h3>Rating: {review.author_details.rating}</h3>
                        <h3 className="content-review">{review.content}</h3>
                        <a href={review.url}><p>Review URL</p></a>
                    </div>
                );
            })}
        </div>
    );
    
}