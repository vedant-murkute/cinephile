import React,{ useEffect, useRef, useState} from 'react'
import { fetchAllMovies } from '../services/api';
import { Card } from './Card';

export const MovieList2 = () => {
  const [movies, setMovies] = useState([]); 
  const [page, setPage] = useState(1);

  const div = useRef(null)

  const fetchIniMovies = async (pageNumber) => {
    const movieData = await fetchAllMovies(pageNumber,10);
    console.log(movieData)
    setMovies(movies => [...movies,...movieData.movies]);
    // setMovies(movieData.movies)
  }

  useEffect(() => {
    fetchIniMovies(page);
  },[page])

  const handleScroll = (e) => {
    console.log(e.target.scrollHeight, "+++", e.target.scrollTop, "++ ", e.target.clientHeight)
    const bottom = (e.target.scrollHeight - e.target.scrollTop) === (e.target.clientHeight);
    
    if (bottom){
      console.log('reached bottom')
      setPage((page) => page+1);
    }
  }

  return (
    <div style={{overflowY:'scroll', height:'100vh'}} onScroll={handleScroll} ref={div}>
      {
        movies.map((movie) => 
          <Card key={movie.movie_id} {...movie}></Card>
        )
      }
    </div>
  )
}
