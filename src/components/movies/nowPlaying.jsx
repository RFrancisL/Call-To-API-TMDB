import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AUTH } from "../../App"
import '../movies/styles/images.css'

export function Carrousel({ item, renderItem }) {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [animationDirection, setAnimationDirection] = useState(null);
  
    const prevPosition = () => {
      setAnimationDirection("slide-in-left");
      setCurrentPosition((prev) => (prev > 0 ? prev - 1 : 0));
    };
  
    const nextPosition = () => {
      setAnimationDirection("slide-in-right");
      setCurrentPosition((next) => (next < item.length - 1 ? next + 1 : next));
    };
  
    return (
      <div>
        <div className="div-nowPLaying-carrousel">
          <button onClick={prevPosition} disabled={currentPosition === 0} className="prevButton"></button>
          <div>
            {renderItem(item[currentPosition - 1], "Carrousel-prevImage", animationDirection)}
          </div>
          <div style={{ padding: "20px", width: "350px" }}>
            {renderItem(item[currentPosition], "Carrousel-image", "fade-in")}
          </div>
          <div>
            {renderItem(item[currentPosition + 1], "Carrousel-nextImage", animationDirection)}
          </div>
          <button onClick={nextPosition} disabled={currentPosition === item.length - 1} className="nextButton"></button>
        </div>
      </div>
    );
  }
  
  
  
export default function NowPlaying(){
    const [dataSuccess, setDataSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)

        fetch('https://api.themoviedb.org/3/movie/now_playing', AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR NOW PLAYING')
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

    const movies = [...dataSuccess]

    return(
        <div className="NowPlaying-div-global">
            <h1>Now Playing</h1>
            <div className="movie-div-semiglobal">
                <Carrousel 
                    item={movies}
                    renderItem={(movie, containerClass, animationClass) => (
                        movie && (
                          <Link to={`${movie.id}`} style={{textDecoration:'none', listStyle:'none'}}>
                            <div key={movie.id} className={`cardMovie ${containerClass} ${animationClass}`}>
                              <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className="movie-image" />
                              <h1 className="NowPlaying-movietitle">{movie.title}</h1>
                            </div>
                          </Link>
                        )
                      )}
                />
            </div>
        </div>
    )
}