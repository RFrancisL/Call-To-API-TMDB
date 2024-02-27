import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AUTH } from "../App"
import '../home.css' 

function Carrousel({ item, renderItem }) {
    const [currentPosition, setCurrentPosition] = useState(0);
    const [animationDirection, setAnimationDirection] = useState(null);
  
  
    const nextPosition = () => {
      setAnimationDirection("slide-in-right");
      setCurrentPosition((next) => (next < item.length - 1 ? next + 1 : 0));
    };
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        // Cambiar automáticamente hacia la derecha cada 3 segundos
        nextPosition();
      }, 2500);
  
      return () => {
        // Limpiar el intervalo cuando el componente se desmonta
        clearInterval(intervalId);
      };
    }, [currentPosition, item.length]);
  
    return (
      <div>
        <div>
          {renderItem(item[currentPosition], "Carrousel-image", "fade-in")}
        </div>
      </div>
    );
  }
  
export default function Home(){
    const [dataSuccessMovies, setDataSuccessMovies] = useState([])
    const [dataSuccessSeries, setDataSuccessSeries] = useState([])
    const [dataSuccessUser, setDataSuccessUser] = useState([])

    const getIdUser = localStorage.getItem('user')
    const idUser = JSON.parse(getIdUser)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')    

    useEffect(()=>{
        setLoading(true)

        fetch('https://api.themoviedb.org/3/movie/popular', AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Popular')
                }
                return res.json()
            })
            .then((data)=>{
                setDataSuccessMovies(data.results)
                setLoading(false)
            })
            .catch((err)=>{
                setError(err)
                setLoading(false)
            })

            fetch(`https://api.themoviedb.org/3/tv/popular`, AUTH)
            .then((res)=>{
                if(!res.ok){
                    throw new Error('Fetching ERROR Popular Series')
                }
                return res.json()
            })
            .then((data)=>{
                setDataSuccessSeries(data.results)
                setLoading(false)
            })
            .catch((err)=>{
                setError(err)
                setLoading(false)
            })

            fetch(`https://api.themoviedb.org/3/account/${idUser}`, AUTH)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Fetching ERROR Deatils Account');
                }
                return res.json();
            })
            .then((data) => {
                setDataSuccessUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    },[])

    if(loading){
        return <h1>LOADING...</h1>
    }

    if(error){
        return <h1>{error}</h1>
    }
    
    const movies = [...dataSuccessMovies]
    const series = [...dataSuccessSeries]
    
    const USER = localStorage.getItem('user')
    const user = JSON.parse(USER)

    const USERVALUE = localStorage.getItem('valueUser')
    
    return (
        <div>
            <nav className="nav-home">
                {USERVALUE === user.userName ?(
                      dataSuccessUser.avatar && dataSuccessUser.avatar.tmdb && dataSuccessUser.avatar.tmdb.avatar_path &&(
                        <div className="div-nav-perfil">
                          <Link to={'/perfil'}><img src={`https://image.tmdb.org/t/p/w500${dataSuccessUser.avatar.tmdb.avatar_path}`} className="btn-home-perfil"/></Link>
                          <h1 className="title-nav">WELCOME {USERVALUE}😋!</h1>
                        </div>
                      ) 
                    ):
                (
                    <div className="div-nav-btns-home">
                        <Link to={'/login'}>
                            <button className="btn-home"><h4 style={{textAlign:'center', margin: 'auto'}}>↪ Sign in</h4></button>
                        </Link>
                        <Link to={'/register'}>
                            <button className="btn-home"><h4 style={{textAlign:'center', margin: 'auto'}}>↪ Register</h4></button>
                        </Link>
                    </div>
                )}
            </nav>
            <h1 className="title-home">HOME</h1>
            <div className="cards">
                <Link to={'/movies'}  style={{listStyle:'none', textDecoration:'none'}}>
                    <div className="movie-card">
                        <h1 className="card-title">MOVIES</h1>
                        {movies && (
                            <Carrousel
                            item={movies}
                            renderItem={(movie) => (
                              movie && (
                              <img
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                alt={movie.title}
                                className="image-home"
                              />)
                            )}
                          />                            
                        )}
                        <h4>Discover the latest Now Playing movies, 
                            featuring blockbuster hits and hidden gems. 
                            Explore the Top Rated movies, as rated by audiences worldwide. 
                            Get a sneak peek into upcoming releases and plan your movie nights in advance. 
                            Dive into the most popular movies, a collection curated based on global viewership.</h4>
                    </div>
                </Link>
                <Link to={'/series'}  style={{listStyle:'none', textDecoration:'none'}}>
                    <div className="serie-card">
                        <h1 className="card-title">SERIES</h1>
                        {series && (
                            <Carrousel
                            item={series}
                            renderItem={(serie) => (
                              serie && (
                              <img
                                src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`}
                                alt={serie.title}
                                className="image-home"
                              />)
                            )}
                          />                            
                        )}
                        <h4>Immerse yourself in series Airing Today, 
                            catch up on the latest episodes On the Air, 
                            and stay connected with the most popular TV series trending globally. 
                            Explore the top-rated series, carefully selected based on viewer reviews, 
                            ensuring you do not miss out on the best of the small screen.</h4>
                    </div>
                </Link>
            </div>
        </div>
    )
}