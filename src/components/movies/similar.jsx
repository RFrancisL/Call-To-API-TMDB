import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { AUTH } from "../../App"
import { Carrousel } from "./nowPlaying"
import '../movies/styles/similar.css'
import useFetch from "../useFetchs"
export default function SimilarMovies(){
    const { id } = useParams()

    const {success, loading, error} = useFetch(`https://api.themoviedb.org/3/movie/${id}/similar`)

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }
    
    const movies = [success.results]
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

