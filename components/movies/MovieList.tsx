import Link from 'next/link'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useMovieStore } from '@/store/movie'
import type { ResponseValue } from '@/store/movie'
import Button from '@/components/Button'
// import Ripple from '@/components/Ripple'
import { useOnInView } from 'react-intersection-observer'

function EmptyHint({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <div className="bg-md-field text-ink-4 grid h-16 w-16 place-items-center rounded-full">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle
            cx="11"
            cy="11"
            r="7"
          />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>
      <p className="text-ink-2 text-[15px] font-semibold">{title}</p>
      <p className="text-ink-4 text-[13px]">{desc}</p>
    </div>
  )
}

export default function MovieList() {
  const fetchMovies = useMovieStore(state => state.fetchMovies)
  const searchText = useMovieStore(state => state.searchText)
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<ResponseValue | null>({
      queryKey: ['movies', searchText],
      queryFn: ({ pageParam }) => {
        return fetchMovies({ pageParam: pageParam as number })
      },
      staleTime: 1000 * 60 * 60 * 2, // ms
      enabled: Boolean(searchText), // !!searchText
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage) {
          const maxPage = Math.ceil(Number(lastPage?.totalResults) / 10)
          if (pages.length < maxPage) {
            return pages.length + 1
          }
        }
        return null
      }
    })

  const ref = useOnInView(inView => {
    if (inView) {
      fetchNextPage()
    }
  })

  const movies = data?.pages.flatMap(page => page?.Search ?? []) ?? []
  const hasQuery = Boolean(searchText)
  const isFirstLoad = isFetching && !isFetchingNextPage && movies.length === 0

  if (!hasQuery) {
    return (
      <EmptyHint
        title="영화를 검색해 보세요"
        desc="제목을 3글자 이상 입력하면 결과가 나와요"
      />
    )
  }

  if (isFirstLoad) {
    return (
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i}>
            <div className="md-shimmer bg-md-field aspect-2/3 w-full rounded-2xl" />
            <div className="md-shimmer bg-md-field mt-2 h-3.5 w-3/4 rounded-full" />
          </li>
        ))}
      </ul>
    )
  }

  if (movies.length === 0) {
    return (
      <EmptyHint
        title="검색 결과가 없어요"
        desc={`"${searchText}"에 대한 영화를 찾지 못했어요`}
      />
    )
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie, i) => {
          const hasPoster = movie.Poster && movie.Poster !== 'N/A'
          return (
            <li
              key={`${movie.imdbID}-${i}`}
              className="md-item-in"
              style={{ animationDelay: `${Math.min(i % 10, 9) * 35}ms` }}>
              <Link
                href={`/movies/${movie.imdbID}`}
                className="group bg-md-surface md-elev-1 hover:md-elev-2 focus-visible:outline-kb-yellow relative block overflow-hidden rounded-2xl transition-shadow outline-none focus-visible:outline-2 focus-visible:outline-offset-2">
                <div className="bg-md-field relative aspect-2/3 overflow-hidden">
                  {hasPoster ? (
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="text-ink-4 grid h-full w-full place-items-center">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-8 w-8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M7 4v16M17 4v16M3 8h4M3 16h4M17 8h4M17 16h4M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="text-ink truncate text-[14px] font-bold">
                    {movie.Title}
                  </div>
                  <div className="text-ink-3 mt-0.5 text-[12px] tabular-nums">
                    {movie.Year}
                  </div>
                </div>
                {/* <Ripple /> */}
              </Link>
            </li>
          )
        })}
      </ul>

      <div
        className={`mt-6 flex justify-center ${hasNextPage && !isFetching ? '' : 'hidden'}`}>
        <Button
          ref={ref}
          variant="tonal"
          loading={isFetchingNextPage}
          onClick={() => {
            fetchNextPage()
          }}>
          더 보기
        </Button>
      </div>
    </>
  )
}
