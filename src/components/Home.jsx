import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { AUTH } from "../App"
import '../home.css' 
import useFetch from "./useFetchs";
import RequestToken from "./login/requestToken";

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

function GetImagesMovie(){
  const {success, loading, error} = useFetch('https://api.themoviedb.org/3/movie/popular')

  if(loading){
    return <h1>LOADING...</h1>
  }

  if(error){
    return <h1>{error}</h1>
  }

  const movies = success.results
  return (
    movies && (
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
  )
  )
}

function GetImagesSeries(){
  const {success, loading, error} = useFetch('https://api.themoviedb.org/3/tv/popular')

  if(loading){
    return <h1>LOADING...</h1>
  }

  if(error){
    return<h1>{error}</h1>
  }

  const series = success.results

  return(
    series && (
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
    )
  )
}

function GetUser(){
  const getIdUser = localStorage.getItem('user')
  const idUser = JSON.parse(getIdUser)
  const {success, loading, error} = useFetch(`https://api.themoviedb.org/3/account/${idUser}`)

  if(loading){
    return <h1>LOADING...</h1>
  }

  if(error){
    return<h1>{error}</h1>
  }
  
  const USER = localStorage.getItem('user')
  const user = JSON.parse(USER)

  const USERVALUE = localStorage.getItem('valueUser')

  return(
    <nav className="nav-home">
      {USERVALUE === user.userName ?(
        success.avatar && success.avatar.tmdb && success.avatar.tmdb.avatar_path &&(
          <div className="div-nav-perfil">
              <Link to={'/perfil'}><img src={`https://image.tmdb.org/t/p/w500${success.avatar.tmdb.avatar_path}`} className="btn-home-perfil"/></Link>
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
  )
}
export default function Home(){
        
    return (
        <div>
          <GetUser/>
            <h1 className="title-home">HOME</h1>
            <div className="cards">
                <Link to={'/movies'}  style={{listStyle:'none', textDecoration:'none'}}>
                    <div className="movie-card">
                        <h1 className="card-title">MOVIES</h1>
                        <GetImagesMovie/>
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
                        <GetImagesSeries/>
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
