import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { AUTH } from "../../App"
import '../movies/styles/similar.css'
import { Carrousel } from "../movies/nowPlaying"
import useFetch from "../useFetchs"
export default function SimilarSeries(){
    const { id } = useParams()

    const {success, loading, error} = useFetch(`https://api.themoviedb.org/3/tv/${id}/similar`)

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }
    
    const series = success.results || []
    return(
        <div>
            <div className="similar-div-semiglobal">
                <Carrousel
                    item={series}
                    renderItem={(serie, containerClass, animationClass) => (
                        serie && (
                                serie.backdrop_path ? (
                                    <Link to={`/series/${serie.id}`} style={{textDecoration:'none', listStyle:'none'}}>
                                        <div key={serie.id} className={`cardMovie ${containerClass} ${animationClass}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`} className="movie-image" />
                                            <h1 className="similar-movietitle">{serie.name}</h1>
                                        </div>
                                    </Link>
                                ):(null)
                            ) 
                        )
                    }/>
            </div>
        </div>
    )
}

