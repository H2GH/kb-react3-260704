import Button from '@/components/Button'
import TextField from '@/components/ui/TextField'
import { useMovieStore } from '@/store/movie'
import { useState } from 'react'

export default function MovieSearch() {
  const [inputText, setInputText] = useState('')
  const setSearchText = useMovieStore(state => state.setSearchText)

  function fetchMovies() {
    setSearchText(inputText)
  }

  return (
    <div className="flex items-center gap-3">
      <TextField
        type="text"
        value={inputText}
        placeholder="영화 제목을 검색하세요 (3글자 이상)"
        onChange={e => setInputText(e.target.value)}
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) return
          if (e.key === 'Enter') fetchMovies()
        }}
        leading={
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <circle
              cx="11"
              cy="11"
              r="7"
            />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        }
      />
      <Button
        onClick={fetchMovies}
        className="shrink-0">
        검색
      </Button>
    </div>
  )
}
