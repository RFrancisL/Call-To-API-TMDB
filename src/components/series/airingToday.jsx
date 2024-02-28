import { Link } from "react-router-dom"
import { Carrousel } from "../movies/nowPlaying"
import '../movies/styles/images.css'
import useFetch from "../useFetchs"

export default function AiringToday(){
    const {success, loading, error} = useFetch('https://api.themoviedb.org/3/tv/airing_today')

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }

    const series = success.results || []
    
    return (
        <div>
            <div className="NowPlaying-div-global">
            <h1>Airing Today</h1>
            <div className="movie-div-semiglobal">
                <Carrousel
                    item={series}
                    renderItem={(serie, containerClass, animationClass) => (
                        serie && (
                            <Link to={`${serie.id}`}><div key={serie.id} className={`cardMovie ${containerClass} ${animationClass}`}>
                              <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} className="movie-image" />
                              <h1 className="NowPlaying-movietitle">{serie.name}</h1>
                            </div></Link>
                        )
                      )}                 
                />
            </div>
        </div>
        </div>
    );
    
}