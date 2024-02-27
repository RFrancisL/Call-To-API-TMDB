import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import { AUTH } from "../../App"
import '../movies/styles/similar.css'
import { Carrousel } from "../movies/nowPlaying"
export default function Recommendations(){
    const { id } = useParams()

    const [dataSuccess, setDataSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)

        fetch(`https://api.themoviedb.org/3/tv/${id}/recommendations`, AUTH)
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
    
    const series = [...dataSuccess]
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

