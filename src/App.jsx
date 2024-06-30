import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import TvShow from './components/TvShow'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PersonDetails from './components/PersonDetails'
import Trailer from './components/partials/Trailer'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <div className='w-screen h-[110vh] bg-[#1F1E24] flex'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/trending' element={<Trending />}></Route>
        <Route path='/popular' element={<Popular />}></Route>
        <Route path='/movie' element={<Movies />}></Route>
        <Route path='/movie/details/:id' element={<MovieDetails />}>
          <Route path='/movie/details/:id/trailer' element={<Trailer />} /></Route>
        <Route path='/tv' element={<TvShow />}></Route>
        <Route path="/tv/details/:id" element={<TvDetails />}>
          <Route path='/tv/details/:id/trailer' element={<Trailer />} /></Route>

        <Route path='/person' element={<People />}>  </Route>
        <Route path='/person/details/:id' element={<PersonDetails />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App