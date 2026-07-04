'use server'

export async function fetchMovies() {
  const res = await fetch(`https://omdbapi.com?apikey=7035c60c&s=batman`)
  const movies = await res.json()
  return movies
}
