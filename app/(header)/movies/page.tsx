// import { resolve } from 'path'

// // http://localhost:3000/movies
// export default async function Movies() {
//   await new Promise(resolve => {
//     setTimeout(resolve, 2000)
//   })
//   throw new Error('애러가 발생했습니다!!')
//   return (
//     <>
//       <h1>Movies Page!</h1>
//     </>
//   )
// }

'use client'
import MovieList from '@/components/movies/MovieList'
import MovieSearch from '@/components/movies/MovieSearch'

// http://localhost:3000/movies/tt123455123
export default function Movies() {
  return (
    <>
      <h1>Movies Page!!</h1>
      <MovieSearch />
      <MovieList />
    </>
  )
}
