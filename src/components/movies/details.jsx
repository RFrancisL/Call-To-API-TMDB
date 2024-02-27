import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { AUTH, AUTHPOST } from "../../App"
import Images from "./images"
import Reviews from "./reviews"
import SimilarMovies from "./similar"
import Providers from "./watchProviders"
import '../movies/styles/details.css'

export default function DetailsMovie(){
    const { id } = useParams()

    const [dataSuccessMovie, setDataSuccessMovie] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showReviews, setShowReviews] = useState(false)
    const [showSimilarMovies, setShowSimilarMovies] = useState(false)
    const [watchProviders, setWatchProviders] = useState(false)

    const [favorites, setFavorites] = useState([])
    const [star, setStar] = useState('☆')

    const getIdUser = localStorage.getItem('user')
    const idUser = JSON.parse(getIdUser)

    const getUserName = localStorage.getItem('valueUser')
    const getUserPassword = localStorage.getItem('valuePassword')

    useEffect(()=>{
        setLoading(true)

        fetch(`https://api.themoviedb.org/3/movie/${id}`, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Details Movie')
                }
                return res.json()
            })
            .then((data)=>{
                setDataSuccessMovie(data)
                setFavorites({ id: data.id, poster: data.poster_path, title: data.title });
                if(getUserName === null || getUserPassword === null){
                    setStar('☆')
                } else {
                    // Ckeck if the movie is already in the favorite list and update the state of 'star'
                    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
                    const isAlreadyFavorite = storedFavorites.some((movie) => movie.id === data.id);
                    setStar(isAlreadyFavorite ? '⭐' : '☆');
                }
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


    const handleFavorites = () => {
        if(getUserName === null || getUserPassword === null){
            setStar(<p style={{fontSize:'10px'}}>You are NOT logued</p>)
        } else {
            // Make a new object newFavorite with the details of the movie
            const newFavorite = { id: favorites.id, poster: favorites.poster, title: favorites.title };
            
            // Get the favorites already exists in the localStorage or initialize an empty array if there are none
            const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
                
            // Check if the movie is already in favorites
            const isAlreadyFavorite = storedFavorites.some(movie => movie.id === newFavorite.id);
            
            if (!isAlreadyFavorite) {
                const updatedFavorites = [...storedFavorites, newFavorite];
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                setStar('⭐');
            } else {
                const updatedFavorites = storedFavorites.filter(movie => movie.id !== newFavorite.id);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                setStar('☆');
            }
        }
        
    };
    

    return(
        <div className="global-details">
            <div key={dataSuccessMovie.id} className="info-details">
                <div className="details-movie">
                    <img src={`https://image.tmdb.org/t/p/w500${dataSuccessMovie.poster_path}`} className="image-perfi-details"/>
                    <div>
                        <h1>{dataSuccessMovie.title}</h1>
                        <h3>{dataSuccessMovie.overview}</h3>
                        <div className="details-details">
                            <button className="btn-addToFavorites" onClick={handleFavorites}><h3>{star}</h3></button>
                            <div className="details-releaseDate">
                                <h5>{dataSuccessMovie.release_date}</h5>
                            </div>
                                <div className="div-generes-details">
                                    <h5>GENERES:</h5>
                                    {dataSuccessMovie.genres && (dataSuccessMovie.genres.map((genre, index) => (
                                            <ul key={index}> 
                                                <li>
                                                    <h5>{genre.name}</h5>
                                                </li>
                                            </ul>
                                    )))}
                                </div>
                        </div>
                        <div className="Image-details">
                            <Images/>
                        </div>
                    </div>
                </div>
                <div className="links-details">
                    <a href={dataSuccessMovie.homepage} className="homepage-link"><div>
                        <h2 style={{color: '#fff'}}>HOMEPAGE</h2>
                    </div></a>
                    <Link to={`/movies/${dataSuccessMovie.id}/credits`} className="credits-link"><div>
                        <h2 style={{color: '#fff'}}>CREDITS</h2>
                    </div></Link>
                </div>
            </div>
            <div className="reviews">
                <h1>Reviews</h1>
                {!showReviews?(
                    <button onClick={()=>setShowReviews(true)} className="btn-show-more">Show More</button>
                ):(
                    <div>
                        <Reviews/>
                        <button onClick={()=>setShowReviews(false)} className="btn-show-less">Show Less</button>
                    </div>
                )}
            </div>
            <div className="similar-movies">
                <h1>Similar Movies</h1>
                {!showSimilarMovies?(
                    <button onClick={()=>setShowSimilarMovies(true)} className="btn-show-more">Show More</button>
                ):(
                    <div>
                        <SimilarMovies/>
                        <button onClick={()=>setShowSimilarMovies(false)} className="btn-show-less">Show Less</button>
                    </div>)}
            </div>
            <div className="watch-providers">
                <h1>Providers</h1>
                {!watchProviders?(
                    <button onClick={()=>setWatchProviders(true)} className="btn-show-more">Show More</button>
                ):(
                    <div>
                        <Providers/>
                        <button onClick={()=>setWatchProviders(false)} className="btn-show-less">Show Less</button>
                    </div>
                )}
            </div>
        </div>
        
    )
}