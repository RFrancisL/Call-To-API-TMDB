import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { AUTH } from "../../App"
import '../movies/styles/details.css'
import ImagesSeries from "./imageSeries"
import SimilarSeries from "./similarSeries"
import ReviewsSeries from "./reviewsSeries"
import ProvidersSeries from "./providersSeries"
import Recommendations from "./recomendationsSeries"

export default function DetailsSeries(){
    const { id } = useParams()

    const getUserName = localStorage.getItem('valueUser')
    const getUserPassword = localStorage.getItem('valuePassword')

    const [dataSuccess, setDataSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const [favorites, setFavorites] = useState([])
    const [star, setStar] = useState('☆')

    const [showReviews, setShowReviews] = useState(false)
    const [showSimilarSeries, setShowSimilarSeries] = useState(false)
    const [showRecommendations, setRecommendations] = useState(false)
    const [watchProviders, setWatchProviders] = useState(false)

    useEffect(()=>{
        setLoading(true)

        fetch(`https://api.themoviedb.org/3/tv/${id}`, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Details Movie')
                }
                return res.json()
            })
            .then((data)=>{
                setDataSuccess(data)
                setFavorites({ id: data.id, poster: data.poster_path, title: data.title });
                
                if(getUserName === null || getUserPassword === null){
                    setStar('☆')
                } else {
                    // Ckeck if the movie is already in the favorite list and update the state of 'star'
                    const storedFavorites = JSON.parse(localStorage.getItem('favoritesSeries')) || [];
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
            const storedFavorites = JSON.parse(localStorage.getItem('favoritesSeries')) || [];
            
            // Check if the movie is already in favorites
            const isAlreadyFavorite = storedFavorites.some(movie => movie.id === newFavorite.id);
        
            if (!isAlreadyFavorite) {
                const updatedFavorites = [...storedFavorites, newFavorite];
                localStorage.setItem('favoritesSeries', JSON.stringify(updatedFavorites));
                setStar('⭐');
            } else {
                const updatedFavorites = storedFavorites.filter(movie => movie.id !== newFavorite.id);
                localStorage.setItem('favoritesSeries', JSON.stringify(updatedFavorites));
                setStar('☆');
            }
        }
        
    };
    
    return(
        <div className="global-details">
            <div key={dataSuccess.id} className="info-details">
                <div className="details-movie">
                    <img src={`https://image.tmdb.org/t/p/w500${dataSuccess.poster_path}`} className="image-perfi-details"/>
                    <div>
                        <h1>{dataSuccess.name}</h1>
                        <h3>{dataSuccess.overview}</h3>
                        <div className="details-details">
                            <button className="btn-addToFavorites" onClick={handleFavorites}><h3>{star}</h3></button>
                            <div className="details-releaseDate">
                                <h5>FIRST AIR DATE: {dataSuccess.first_air_date}</h5>
                            </div>
                            <div className="div-generes-details">
                                    <h5>GENERES:</h5>
                                        {dataSuccess.genres && (dataSuccess.genres.map((genre, index) => (
                                                <ul key={index}> 
                                                    <li>
                                                        <h5>{genre.name}</h5>
                                                    </li>
                                                </ul>
                                        )))}
                                </div>
                        </div>
                        <div className="Image-details">
                            <ImagesSeries/>
                        </div>
                    </div>
                </div>
                <div className="links-details">
                    <a href={dataSuccess.homepage} className="homepage-link"><div>
                        <h2 style={{color: '#fff'}}>HOMEPAGE</h2>
                    </div></a>
                    <Link to={`/series/${dataSuccess.id}/credits`} className="credits-link"><div>
                        <h2 style={{color: '#fff'}}>CREDITS</h2>
                    </div></Link>
                    </div>
            </div>
            <div className="reviews">
                <h1>Reviews Series</h1>
                {!showReviews?(
                    <button onClick={()=>setShowReviews(true)} className="btn-show-more">Show More</button>
                ):(
                    <div>
                        <ReviewsSeries/>
                        <button onClick={()=>setShowReviews(false)} className="btn-show-less">Show Less</button>
                    </div>
                )}
            </div>
            <div className="similar-movies">
                <h1>Similar Series</h1>
                {!showSimilarSeries?(
                    <button onClick={()=>setShowSimilarSeries(true)} className="btn-show-more">Show More</button>
                ):(
                    <div>
                        <SimilarSeries/>
                        <button onClick={()=>setShowSimilarSeries(false)} className="btn-show-less">Show Less</button>
                    </div>)}
            </div>
            <div className="recommendations-series">
                <h1>Recommendations</h1>
                {!showRecommendations?(
                    <button onClick={()=>setRecommendations(true)} className="btn-show-more">Show More</button>
                ):(
                    <div>
                        <Recommendations/>
                        <button onClick={()=>setRecommendations(false)} className="btn-show-less">Show Less</button>
                    </div>)}
            </div>
            <div className="watch-providers">
                <h1>Providers</h1>
                {!watchProviders?(
                    <button onClick={()=>setWatchProviders(true)} className="btn-show-more">Show More</button>
                ):(
                    <div>
                        <ProvidersSeries/>
                        <button onClick={()=>setWatchProviders(false)} className="btn-show-less">Show Less</button>
                    </div>
                )}
                </div>
        </div>
        
    )
}