import { useParams } from "react-router"
import { Link } from "react-router-dom"
import '../movies/styles/similar.css'
import { Carrousel } from "../movies/nowPlaying"
import useFetch from "../useFetchs"
export default function Recommendations(){
    const { id } = useParams()

    const {success} = useFetch(`https://api.themoviedb.org/3/tv/${id}/recommendations`)

    const allSuccess = success || []
    const series = allSuccess.results || []
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

