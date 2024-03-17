import { useState } from "react";
import NowPlaying from "./movies/nowPlaying";
import Popular from "./movies/popular";
import TopRated from "./movies/topRated";
import Upcoming from "./movies/upcoming";
import useFetch, { useAllMovies } from "./useFetchs";
import { API_KEY } from "../App";
import { Link } from "react-router-dom";
import '../movies.css'

export default function Movies() {
  const { success } = useFetch("https://api.themoviedb.org/3/genre/movie/list");
  const searchEndpoint = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
  const [isLoading, setIsLoading] = useState(false)

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  const { allMovies } = useAllMovies();
  
  //Array.from Se utiliza para crear un nuevo array a partir de un objeto iterable o un objeto parecido a un array.
  /*Set es una estructura de datos en JavaScript que te permite almacenar valores únicos de cualquier tipo. 
  Un Set solo puede contener valores únicos, por lo que cualquier duplicado se eliminará automáticamente.*/
  const uniqueMovies = Array.from(new Set(allMovies.map(movie => movie.id))).map(id => allMovies.find(movie => movie.id === id));
  const [isClicked, setIsClicked] = useState(false)
  const [isClickedSearch, setIsClickedSearch] = useState(false)

  const allSuccess = success || []
  const generes = allSuccess.genres || [];

  const HandleSearch = (e) => {
    e.preventDefault();
    setIsClickedSearch(true)
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
    setIsClicked(true);

    fetch(searchEndpoint + genreId)
    .then((res) => {
      if (!res.ok) {
        throw new Error("fetching ERROR search");
      }
      return res.json();
    })
    .then((data) => {
      const allData = data.results || [];
      const getAllMovies = [...allData, ...uniqueMovies]
      const filteredMovies = getAllMovies.filter((movie) =>
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

  return (
    <div>
      <div className="global-div-nav">
        <form onSubmit={HandleSearch}>
          <label className="label-search">
            <input
              className="search-bar"
              type="text"
              placeholder="Search Movie"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="btn-search">🔎</button>
          </label>
        </form>
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
              {isClickedSearch && searchResults && searchResults.length === 0 && !isLoading &&(
                <p>No results found! 😢 Did you type it correctly?</p>
              )}
          </div>
          <div className="nav-generes">
            {generes.map((genere) => (
              <div key={genere.id}>
                <button type="button" onClick={() => handleGenreClick(genere)} className="btn-genere">
                  {genere.name}
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="div-semiglobal-moviesHome">
          {filteredMovies && filteredMovies.map((movie) => (
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
            {isClicked && filteredMovies.length === 0 && !isLoading && (
              <h3>There is no movies of this genere at this time. 😢</h3>
            )}
        </div>
      </div>
        <NowPlaying />
        <Popular />
        <TopRated />
        <Upcoming />
    </div>
  );
}
