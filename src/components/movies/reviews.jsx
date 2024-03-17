import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { AUTH } from "../../App"
import '../movies/styles/reviews.css'
import useFetch from "../useFetchs"
export default function Reviews(){
    const { id } = useParams()

    const {success} = useFetch(`https://api.themoviedb.org/3/movie/${id}/reviews`)

    const allSuccess = success || []
    const reviews = allSuccess.results || []
    
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