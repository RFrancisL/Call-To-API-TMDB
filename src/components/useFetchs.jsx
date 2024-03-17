import { useEffect, useState } from "react"
import { AUTH } from "../App"

export default function useFetch (url){
    const [success, setSuccess] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(()=>{
        setLoading(true)
        fetch(url, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR')
                }
                return res.json()
            })
            .then((data) => { setSuccess(data) })
            .catch((err) => { setError(err) })
            .finally(() => setLoading(false))
    },[])
    
    if(loading){
      return <h1>LOADING...</h1>
    }

    if(error){
      return <h1>{error}</h1>
    }
    return { success }
}



export function useAllMovies() {
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const endpointMovies = [
      'https://api.themoviedb.org/3/movie/upcoming',
      'https://api.themoviedb.org/3/movie/top_rated',
      'https://api.themoviedb.org/3/movie/popular',
      'https://api.themoviedb.org/3/movie/now_playing'
    ];

    
    useEffect(() => {
        setLoading(true);
      
        Promise.all(
          endpointMovies.map((path) =>
            fetch(path, AUTH)
              .then((res) => {
                if (!res.ok) {
                  throw new Error('Fetching ERROR getting ALL MOVIES');
                }
                return res.json();
              })
              .then((data) => data.results)
              .catch((err) => {
                console.log(err);
                return []; // Handle error by returning an empty array or other default value
              })
          )
        )
          .then((results) => {
            // Concatenate all the results into a single array
            const mergedResults = results.flat();
            setAllMovies(mergedResults)
          })
          .finally(() => setLoading(false));
        }, []);
        
        
        return { allMovies };
      }
      
      
export function useAllSeries(){
        
  const [allSeries, setAllSeries] = useState([])
  const [loading, setLoading] = useState(false)

  const endpointSeries = [
    'https://api.themoviedb.org/3/tv/airing_today',
    'https://api.themoviedb.org/3/tv/on_the_air', 
    'https://api.themoviedb.org/3/tv/popular',
    'https://api.themoviedb.org/3/tv/top_rated'
  ];
        
   
  useEffect(() => {
    setLoading(true);
  
    Promise.all(
      endpointSeries.map((path) =>
        fetch(path, AUTH)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Fetching ERROR getting ALL MOVIES');
            }
            return res.json();
          })
          .then((data) => data.results)
          .catch((err) => {
            console.log(err);
            return []; // Handle error by returning an empty array or other default value
          })
      )
    )
      .then((results) => {
        // Concatenate all the results into a single array
        const mergedResults = results.flat();
        setAllSeries(mergedResults)
      })
      .finally(() => setLoading(false));
    }, []);
         
  return { allSeries } 
        
}