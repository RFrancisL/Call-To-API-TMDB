import { useEffect, useState } from "react";
import DetailsAccount from "./perfilDetails";
import "./styles/perfil.css"
export default function Perfil(){
    
    const getUserName = localStorage.getItem('user');
    const userName = JSON.parse(getUserName);

    const [favoritesMovies, setFavoritesMovies] = useState([]);
    const [favoritesSeries, setFavoritesSeries] = useState([])

    useEffect(() => {
        const getFavoritesMovies = localStorage.getItem('favorites');
        const getFavoritesSeries = localStorage.getItem('favoritesSeries');

        const favoritesMoviesFromLocalStorage = JSON.parse(getFavoritesMovies) || [];
        setFavoritesMovies(favoritesMoviesFromLocalStorage);

        const favoritesSeriesFromLocalStorage = JSON.parse(getFavoritesSeries) || [];
        setFavoritesSeries(favoritesSeriesFromLocalStorage)

    }, []);

    const handleDeleteMovies = (favMovie) => {
        const updatedFavorites = favoritesMovies.filter((movie) => movie.id !== favMovie.id);
        setFavoritesMovies(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const handleDeleteSeries = (favSerie) => {
        const updatedFavorites = favoritesSeries.filter((serie) => serie.id !== favSerie.id);
        setFavoritesSeries(updatedFavorites);
        localStorage.setItem('favoritesSeries', JSON.stringify(updatedFavorites));
    }

    return (
        <div>
            <DetailsAccount/>        
            <div>
                <h2>Favorites Movies</h2>
                <div className="div-favorites-movies">
                    {favoritesMovies.map((movie)=>(
                        <div key={movie.id} className="div-movie">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} className="image-movie-perfil"/>
                            <h3>{movie.title}</h3>
                            <button onClick={() => handleDeleteMovies(movie)} className="btn-remove-perfil">Remove</button>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h2>Favorites Series</h2>
                <div className="div-favorites-series">
                    {favoritesSeries.map((serie)=>(
                        <div key={serie.id} className="div-serie">
                            <img src={`https://image.tmdb.org/t/p/w500${serie.poster}`} className="image-serie-perfil"/>
                            <h3>{serie.title}</h3>
                            <button onClick={() => handleDeleteSeries(serie)} className="btn-remove-perfil">Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
