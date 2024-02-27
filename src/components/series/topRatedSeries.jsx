import { useEffect, useState } from "react"
import { Carrousel } from "../movies/nowPlaying"
import { AUTH } from "../../App"
import { Link } from "react-router-dom"
export default function TopRatedSeries(){

    const [dataSuccess, setDataSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)

        fetch(`https://api.themoviedb.org/3/tv/top_rated`, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Top Rated Series')
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
    },[])

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }

    const series = [...dataSuccess]
    
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
                              <img src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`} className="movie-image" />
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