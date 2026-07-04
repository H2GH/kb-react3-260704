'use client'
import { fetchMovies } from '@/serverActions/movie'
import { useState, useEffect } from 'react'

export default function Home() {
  const [movies, setMovies] = useState('')

  useEffect(() => {
    fetchMovies().then(movies => {
      setMovies(movies)
    })
  }, [])

  return (
    <>
      <h1 onClick={() => fetchMovies()}>Home!!</h1>
      <pre>{JSON.stringify(movies, null, 2)}</pre>
    </>
  )
}
