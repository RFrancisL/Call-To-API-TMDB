import './App.css'
import './home.css'
import { Link, Routes, Route, BrowserRouter, Outlet } from "react-router-dom"
import NowPlaying from './components/movies/nowPlaying';
import Popular from './components/movies/popular';
import TopRated from './components/movies/topRated';
import Upcoming from './components/movies/upcoming';
import DetailsMovie from './components/movies/details';
import Credits from './components/movies/credits';
import SimilarMovies from './components/movies/similar';
import Home from './components/Home';
import AiringToday from './components/series/airingToday';
import OnTheAir from './components/series/onTheAir';
import PopularSeries from './components/series/popularSeries';
import TopRatedSeries from './components/series/topRatedSeries';
import DetailsSeries from './components/series/detailsSeries';
import CreditsSeries from './components/series/creditsSeries';
import Login from './components/login/login';
import React, { createContext, useContext, useState, useEffect } from 'react';
import Register from './components/login/register';
import Logout from './components/login/logout';
import YouAreNotLogued from './components/login/youAreNOTLogued';
import Perfil from './components/account/perfil';

export const API_KEY = '69d13bef26faaeec0d61f7925f5b502d'

export const AUTH = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWQxM2JlZjI2ZmFhZWVjMGQ2MWY3OTI1ZjViNTAyZCIsInN1YiI6IjY1YjhkZDNkNDZlNzVmMDE4M2JiNzU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WidhUoKZpuCBGtKoJwS0sHQ3eKe7-irQ6Q297E-ZNXg'
  }
};

export const AUTHPOST = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWQxM2JlZjI2ZmFhZWVjMGQ2MWY3OTI1ZjViNTAyZCIsInN1YiI6IjY1YjhkZDNkNDZlNzVmMDE4M2JiNzU0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WidhUoKZpuCBGtKoJwS0sHQ3eKe7-irQ6Q297E-ZNXg'
  }
};

export const UserContext = createContext()
  
function App() {
  const [ userState, setUserState ] = useState({
    infoUser: {id: null, userName: null, userPasssword: null},
    isRegister: null
  })

  const USER = localStorage.getItem('user')
  const user = JSON.parse(USER)

  const USERVALUE = localStorage.getItem('valueUser')

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={{userState, setUserState}}>
          <Routes>
              <Route path="/register" element={<Register/>}/>
              <Route path="/login" element={<Login/>} />
              <Route index element={<Home/>}/>
              <Route path='/' element={<Layout/>}>
                  <Route path='/perfil' element={<Perfil/>}/>
                  <Route path='/movies' element={
                  <React.Fragment>
                    <NowPlaying/> <Popular/> <TopRated/> <Upcoming/>
                  </React.Fragment>}/>
                  <Route path='/series' element={
                    <React.Fragment>
                      <AiringToday/> <OnTheAir/> <PopularSeries/> <TopRatedSeries/>
                    </React.Fragment>
                  }/>
                  <Route path='series/:id' element={<DetailsSeries/>}/>
                  <Route path='movies/:id' element={<DetailsMovie/>}/>
                  <Route path='movies/:id' element={<SimilarMovies/>}/>
                  <Route path='movies/:id/credits' element={
                    <React.Fragment>
                      {USERVALUE === user.userName ?(
                        <Credits/>
                      ):(
                        <div>
                          <YouAreNotLogued/>  
                        </div>
                        )}
                    </React.Fragment>
                  }/>
                  <Route path='/series/:id/credits' element={
                    <React.Fragment>
                      {USERVALUE === user.userName?(
                        <CreditsSeries/>
                      ):(
                        <div>
                          <YouAreNotLogued/>  
                        </div>
                        )}
                    </React.Fragment>
                  }/>
              </Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  )
}


function Layout(){
  const { userState } = useContext(UserContext)

  const [dataSuccessUser, setDataSuccessUser] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const USER = localStorage.getItem('user')
  const user = JSON.parse(USER)

  const USERVALUE = localStorage.getItem('valueUser')

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/account/${user}`, AUTH)
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

  return (
    <div>
      <ul className='nav-home'>
        <li>
          <Link to={'/'}><button className='btn-home'>Home</button></Link>
        </li>
        <li>
          <Link to={'/movies'}><button className='btn-home'>Movies</button></Link>
        </li>
        <li>
          <Link to={'/series'}><button className='btn-home'>Series</button></Link>
        </li>
        {USERVALUE === user.userName ?
          (
            <li>
              {dataSuccessUser.avatar && dataSuccessUser.avatar.tmdb && dataSuccessUser.avatar.tmdb.avatar_path &&(
                <div className='div-app-login'>
                  <Logout/>
                  <Link to={'/perfil'}><img src={`https://image.tmdb.org/t/p/w500${dataSuccessUser.avatar.tmdb.avatar_path}`} className="btn-home-perfil"/></Link>
                </div>
              )}
            </li>
          ):
          (
            <li>
              <Link to={'/login'}><button className='btn-home'>Login</button></Link>
            </li>
          )}
      </ul>
      <Outlet/>
    </div>
  )
}
export default App
