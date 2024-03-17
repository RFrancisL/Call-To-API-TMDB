import { Carrousel } from "../movies/nowPlaying"
import { Link } from "react-router-dom"
import useFetch from "../useFetchs"

export default function TopRatedSeries(){

    const {success} = useFetch('https://api.themoviedb.org/3/tv/top_rated')

    const allSuccess = success || []
    const series = allSuccess.results || []
    
    return (
        <div>
            <div className="NowPlaying-div-global">
            <h1>Top Rated Series</h1>
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