import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { AUTH } from "../../App"
import '../movies/styles/reviews.css'
import useFetch from "../useFetchs"
export default function Reviews(){
    const { id } = useParams()

    const {success, loading, error} = useFetch(`https://api.themoviedb.org/3/movie/${id}/reviews`)

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }
    
    const reviews = success.results || []
    
    return (
        <div className="global-reviews">
            {reviews.map((review) => {
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