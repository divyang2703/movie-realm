/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import {  useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { fetchDataFromApi } from './utils/api'
import { useSelector, useDispatch } from 'react-redux'
// import {BarLoader} from 'react-spinners'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import './App.css'


//page imports
import Hearder from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Details from './pages/details/Details'
import PageNotFound from './pages/404/PageNotFound'
import SearchResult from './pages/searchresult/SearchResult'
import Explore from './pages/explore/Explore'
import About from './pages/about/About'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import { AuthContextProvider } from './context/AuthContext'

function App() {
  
  const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    console.log(url);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            console.log(res);
            const url = {
              backdrop: res.images.secure_base_url + "original",
              poster: res.images.secure_base_url + "original",
              profile: res.images.secure_base_url + "original",
            }
            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async() => {
      let promises= [];
      const endPoints  = ["tv", "movie"]
      let allGenres = {};


      endPoints.forEach((endpoint) => {
        promises.push(fetchDataFromApi(`genre/${endpoint}/list`));
      });

      const data = await Promise.all(promises);
      data.map(({genres})=>{
       return genres.map((item)=>(allGenres[item.id] = item))
      })

      dispatch(getGenres(allGenres));
      
    };

  return (
    <AuthContextProvider>
       <Router>
        <Hearder />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
      
    </AuthContextProvider>
    
  )
}

export default App
