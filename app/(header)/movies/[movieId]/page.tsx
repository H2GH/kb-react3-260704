//-- Server Compenent --
import axios from 'axios'
import Image from 'next/image'

interface Props {
  params: Promise<{ movieId: string }>
}

export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}

export interface Rating {
  Source: string
  Value: string
}

// 정적 메타 데이터 제공 방법
// export const metadata = {
//   title: '영화 상세 정보',
//   description: '영화 상세 정보의 설명',
//   openGraph: {
//     type: 'website',
//     siteName: 'Next.js 연습 프로젝트',
//     title: '영화 상세 정보',
//     description: '영화 상세 정보의 설명',
//     images: 'https://picsum.potos/700/500'
//   }
// }

async function fetchMovie(movieId: string) {
  // const { data: movie } = await axios.get<Movie>(
  //   `https://omdbapi.com?apikey=${process.env.OMDB_APIKEY}&i=${movieId}`
  // )
  const res = await fetch(
    `https://omdbapi.com?apikey=${process.env.OMDB_APIKEY}&i=${movieId}`,
    {
      method: 'GET',
      cache: 'force-cache' // 서버에 캐시, Next.js 전용 기능
    }
  )

  const movie = await res.json()
  return movie
}

export async function generateMetadata({ params }: Props) {
  const { movieId } = await params
  const movie = await fetchMovie(movieId)
  // const { data: movie } = await axios.get<Movie>(
  //   `https://omdbapi.com?apikey=${process.env.OMDB_APIKEY}&i=${movieId}`
  // )

  return {
    title: movie.Title,
    description: movie.Plot,
    openGraph: {
      type: 'website',
      siteName: 'Next.js 연습 프로젝트',
      title: movie.Title,
      description: movie.Plot,
      images: movie.Poster
    }
  }
}

export default async function MovieDetails({ params }: Props) {
  const { movieId } = await params
  const movie = await fetchMovie(movieId)
  // const { data: movie } = await axios.get<Movie>(
  //   `https://omdbapi.com?apikey=${process.env.OMDB_APIKEY}&i=${movieId}`
  // )

  return (
    <>
      <h1>{movie.Title}</h1>
      <p>{movie.Plot}</p>
      <Image
        src={movie.Poster}
        alt={movie.Title}
        width={500}
        height={750}
      />
    </>
  )
}

//-- Client Compenent --
// 'use client'
// import { use } from 'react'

// export default function MovieDetails({ params }) {
//   const { movieId } = use(params) // Promise
//   return (
//     <>
//       <h1>MovieDetails!!</h1>
//     </>
//   )
// }
