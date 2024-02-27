import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { AUTH } from "../../App"
import { Carrousel } from "./nowPlaying"
import '../movies/styles/similar.css'
export default function SimilarMovies(){
    const { id } = useParams()

    const [dataSuccess, setDataSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)

        fetch(`https://api.themoviedb.org/3/movie/${id}/similar`, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Alternative Titles')
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
    
    const movies = [...dataSuccess]
    console.log(movies)
    return(
        <div>
            <div className="similar-div-semiglobal">
                <Carrousel  
                    item={movies}
                    renderItem={(movie, containerClass, animationClass) => (
                        movie ? (
                          <Link to={`/movies/${movie.id}`} style={{textDecoration:'none', listStyle:'none'}}>
                            <div key={movie.id} className={`cardMovie ${containerClass} ${animationClass}`}>
                              {movie.poster_path ? (
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="movie-image" />
                              ):(
                                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className="movie-image" />
                              )}
                              <h1 className="similar-movietitle">{movie.title}</h1>
                            </div>
                          </Link>
                        ) : (
                            null
                        )
                      )}/>
            </div>
        </div>
    )
}

