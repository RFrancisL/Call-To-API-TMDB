import { useState } from "react";
import { Link } from "react-router-dom";
import AiringToday from "./series/airingToday";
import OnTheAir from "./series/onTheAir";
import PopularSeries from "./series/popularSeries";
import TopRatedSeries from "./series/topRatedSeries";
import useFetch, { useAllSeries } from "./useFetchs";
import { API_KEY } from "../App";
import "../series.css"

export default function Series(){
    const {success} = useFetch('https://api.themoviedb.org/3/genre/tv/list');
    const [isLoading, setIsLoading] = useState(false)

    const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null)

    const {allSeries} = useAllSeries();
    const getAllSeries = allSeries;
    const [currentGenre, setCurrentGenre] = useState([]);
    const uniqueSeries = Array.from(new Set(getAllSeries.map((serie => serie.id)))).map(id => getAllSeries.find(serie => serie.id === id))
    const [isClicked, setIsClicked] = useState(false)
    const [isClickedSearch, setIsClickedSearch] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        setIsClickedSearch(true)
        fetch (searchUrl + search)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR TV')
                }
                return res.json()
            })
            .then((data)=>{
                const allData = data.results || []
                setSearchResults(allData)
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const allSuccess = success || []
    const generes = allSuccess.genres || []

    const getTvGeneres = (genre) => {
        setIsLoading(true)
        setIsClicked(true)

        fetch(searchUrl + genre)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR getting generes')
                } return res.json()
            })
            .then((data)=>{
                const dataSeries = data.results || [];
                const allSeries = [...dataSeries, ...uniqueSeries]
                const filteredSeries = allSeries.filter((serie) => 
                    genre.length === 0 || serie.genre_ids.some((id) => id === genre.id));
                setCurrentGenre(filteredSeries);
                setIsLoading(false);
            })
            .catch((err)=>{
                console.log(err)
            })
    }

    if(isLoading){
        return <h1>LOADING...</h1>
    }

    return(
        <div>
            <div className="global-div-nav">
                <form onSubmit={handleSearch}>
                    <label className="label-search">
                        <input
                            className="search-bar"
                            type="text"
                            placeholder="Search TV Serie"
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <button type="submit" className="btn-search">🔎</button>
                    </label>
                </form>
                <div  className="div-semiglobal-seriesHome">
                    {searchResults && searchResults.map((serie)=>(
                        <Link to={`${serie.id}`} key={serie.id}>
                            <div className="div-serieHomes">
                                <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                                    alt={serie.name}
                                    className="img-serieHome"
                                />
                                <h1 className="title-serieHome">{serie.name}</h1>
                            </div>
                        </Link>
                    ))}
                    {isClickedSearch && searchResults && searchResults.length === 0 && !isLoading &&(
                        <h5>No results found! 😢 Did you type it correctly?</h5>
                    )}
                </div>
                <div className="nav-generes">
                    {generes.map((genere)=>(
                        <div key={genere.id}>
                            <button onClick={() => getTvGeneres(genere)} className="btn-genere">{genere.name}</button>
                        </div>
                    ))}
                </div>
                <div className="div-semiglobal-seriesHome">
                    {currentGenre && currentGenre.map((serie)=>(
                        <Link to={`${serie.id}`} key={serie.id}>
                            <div className="div-serieHome">
                                <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                                    alt={serie.name}
                                    className="img-serieHome"/>
                                <h1 className="title-serieHome">{serie.name}</h1>
                            </div>
                        </Link>
                    ))}
                    {isClicked && currentGenre.length === 0 && !isLoading &&(
                        <h5>There is no series of this genere at this time. 😢</h5>
                    )}
                </div>
            </div>
                <AiringToday/>
                <OnTheAir/>
                <PopularSeries/>
                <TopRatedSeries/>
        </div>
    )
}