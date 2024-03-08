import { useEffect, useState } from "react";
import NowPlaying from "./movies/nowPlaying";
import Popular from "./movies/popular";
import TopRated from "./movies/topRated";
import Upcoming from "./movies/upcoming";
import useFetch from "./useFetchs";
import { API_KEY } from "../App";
import { Link } from "react-router-dom";
import '../movies.css'

export default function Movies() {
  const { success, loading, error } = useFetch("https://api.themoviedb.org/3/genre/movie/list");
  const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
  const [isLoading, setIsLoading] = useState(false)

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  const [filteredMovies, setFilteredMovies] = useState([]);


  if (loading) {
    return <h1>LOADING...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const generes = success.genres || [];

  const HandleSearch = (e) => {
    e.preventDefault();

    fetch(searchEndpoint + search)
      .then((res) => {
        if (!res.ok) {
          throw new Error("fetching ERROR search");
        }
        return res.json();
      })
      .then((data) => {
        const allData = data.results || [];
        setSearchResults(allData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handleGenreClick(genreId) {
    setIsLoading(true);
  
    fetch(searchEndpoint + genreId)
      .then((res) => {
        if (!res.ok) {
          throw new Error("fetching ERROR search");
        }
        return res.json();
      })
      .then((data) => {
        const allData = data.results || [];
        const filteredMovies = allData.filter((movie) =>
          genreId.length === 0 || movie.genre_ids.some((id) => id === genreId.id)
        );
        setFilteredMovies(filteredMovies);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
    }
    
    if(isLoading){
      return <h1>LOADING...</h1>
    }
    
  const renderMovies = (
    <div className="div-semiglobal-moviesHome">
      {filteredMovies.map((movie) => (
        movie && movie.poster_path ? (
          <Link to={`${movie.id}`} key={movie.id}>
          <div className="div-movieHome">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="img-movieHome"
            />
            <h1 className="title-movieHome">{movie.title}</h1>
          </div>
        </Link>
        ) : ( null )))}
    </div>
  );
  

  return (
    <div>
      <form onSubmit={HandleSearch}>
        <label style={{ display: "flex", margin: "auto", alignItems: "center", justifyContent: "center" }}>
          <input
            type="text"
            placeholder="Search Movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">🔎</button>
        </label>
      </form>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {generes.map((genere) => (
          <div key={genere.id}>
            <button type="button" onClick={() => handleGenreClick(genere)}>
              {genere.name}
            </button>
          </div>
        ))}
      </div>
      {renderMovies}
      <div>
        <div className="div-semiglobal-moviesHome">
        {searchResults && searchResults.map((movie) => (
               movie && movie.poster_path ? (
                <Link to={`${movie.id}`} key={movie.id}>
                <div className="div-movieHome">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="img-movieHome"
                  />
                  <h1 className="title-movieHome">{movie.title}</h1>
                </div>
              </Link>
              ) : ( null )
            ))
          }
      </div>
      </div>
      <NowPlaying />
      <Popular />
      <TopRated />
      <Upcoming />
    </div>
  );
}
