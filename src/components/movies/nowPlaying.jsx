import { useState } from "react";
import { Link } from "react-router-dom";
import '../movies/styles/images.css';
import useFetch from "../useFetchs";

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
          {renderItem(item[currentPosition - 1 ], "Carrousel-prevImage", animationDirection)}
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

export default function NowPlaying() {
  const { success, loading, error } = useFetch('https://api.themoviedb.org/3/movie/now_playing')

  if (loading) {
    return <h1>LOADING...</h1>
  }

  if (error) {
    return <h1>{error}</h1>
  }

  //Me aseguro de que success.results no sea undefined o null antes de intentar acceder a sus propiedades. 
  const movies = success.results || []
  return (
    <div className="NowPlaying-div-global">
      <h1>Now Playing</h1>
      <div className="movie-div-semiglobal">
        <Carrousel
          item={movies}
          renderItem={(movie, containerClass, animationClass) => (
            movie && (
              <Link to={`${movie.id}`} key={movie.id}>
                <div className={`cardMovie ${containerClass} ${animationClass}`}>
                  <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="movie-image" />
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
