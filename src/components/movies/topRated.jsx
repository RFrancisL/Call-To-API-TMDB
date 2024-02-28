import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AUTH } from "../../App"
import { Carrousel } from "./nowPlaying"
import '../movies/styles/nowPlaying.css'
import useFetch from "../useFetchs"

export default function TopRated(){
    const {success, loading, error} = useFetch('https://api.themoviedb.org/3/movie/top_rated')

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }

    const movies = success.results || []

    return(
        <div>
            <h1>Top Rated</h1>
            <div className="movie-div-semiglobal">
                <Carrousel  
                    item={movies}
                    renderItem={(movie, containerClass, animationClass) => (
                        movie && (
                          <Link to={`${movie.id}`} style={{textDecoration:'none', listStyle:'none'}}>
                            <div key={movie.id} className={`cardMovie ${containerClass} ${animationClass}`}>
                              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="movie-image" />
                              <h1 className="NowPlaying-movietitle">{movie.title}</h1>
                            </div>
                          </Link>
                        )
                      )}/>
            </div>
        </div>
    )
}