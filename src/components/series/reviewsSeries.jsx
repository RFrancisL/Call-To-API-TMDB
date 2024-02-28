import { useParams } from "react-router"
import '../movies/styles/reviews.css'
import useFetch from "../useFetchs"
export default function ReviewsSeries(){
    const { id } = useParams()

    const {success, loading, error} = useFetch(`https://api.themoviedb.org/3/tv/${id}/reviews`)

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }
    
    return (
        <div className="global-reviews">
            {success.length === 0 ? (
                <h3>Reviews do NOT Exist!</h3>
            ):(
                success.map((review) => {
                    return (
                        <div key={review.id} className="card-review">
                            <h1>{review.author}</h1>
                            <img src={review.author_details.avatar_path}/>
                            <h3>Username: {review.author_details.username}</h3>
                            <h3>Rating: {review.author_details.rating}</h3>
                            <h5>Created at: {review.created_at}</h5>
                            <h5>Updated at: {review.updated_at}</h5>
                            <h3 className="content-review">{review.content}</h3>
                            <a href={review.url}><p>Review URL</p></a>
                        </div>
                    );
                })
            )}
        </div>
    );
    
}