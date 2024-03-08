import { useState } from "react";
import { Link } from "react-router-dom";
import AiringToday from "./series/airingToday";
import OnTheAir from "./series/onTheAir";
import PopularSeries from "./series/popularSeries";
import TopRatedSeries from "./series/topRatedSeries";
import useFetch from "./useFetchs";
import { API_KEY } from "../App";

export default function Series(){
    const {success, loading, error} = useFetch('https://api.themoviedb.org/3/genre/tv/list');
    const [isLoading, setIsLoading] = useState(false)

    const searchUrl = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=`;
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState(null)

    const [currentGenre, setCurrentGenre] = useState([])

    const handleSearch = (e) => {
        e.preventDefault()
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

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }

    const generes = success.genres || []

    const getTvGeneres = (genre) => {
        setIsLoading(true)

        fetch(searchUrl + genre)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR getting generes')
                } return res.json()
            })
            .then((data)=>{
                const dataSeries = data.results || [];
                const filteredSeries = dataSeries.filter((serie) => 
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
            <form onSubmit={handleSearch}>
                <label style={{display:'flex', margin:'auto', alignItems:'center', justifyContent:'center'}}>
                    <input
                        type="text"
                        placeholder="Search TV Serie"
                        value={search}
                        onChange={(e)=>setSearch(e.target.value)}
                    />
                    <button type="submit">🔎</button>
                </label>
            </form>
            <div style={{display:'flex', justifyContent:'space-between'}}>
                {generes.map((genere)=>(
                    <div key={genere.id}>
                        <button onClick={() => getTvGeneres(genere)}>{genere.name}</button>
                    </div>
                ))}
            </div>
            {searchResults && searchResults.map((serie)=>(
                <Link to={`${serie.id}`} key={serie.id}>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                            alt={serie.name}
                            className="img-movieHome"
                        />
                        <h1>{serie.name}</h1>
                    </div>
                </Link>
            ))}
            {currentGenre && currentGenre.map((serie)=>(
                <Link to={`${serie.id}`} key={serie.id}>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                            alt={serie.name}
                            className="img-movieHome"/>
                        <h1>{serie.name}</h1>
                    </div>
                </Link>
            ))}
            <AiringToday/>
            <OnTheAir/>
            <PopularSeries/>
            <TopRatedSeries/>
        </div>
    )
}