import svgLoader from '../assets/icons/loader.svg'
import { NOT_FOUND, SUCCESS, LOADING } from "../constants/status";

import type { BookListInfo } from "../types/book-api";

type Props = {
  list: BookListInfo[]
  status: {
    loading: boolean,
    error: boolean,
    results: number
  }
}

function LoadingResults () {
  return (
    <div className="w-full h-24 grid place-items-center py-4">
      <img src={svgLoader} alt="" />
      <p className="text-sm text-gray-500">Fetching data from <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">openlibrary.org</a></p>
    </div>
  )
}

function NoResults () {
  return (
    <div className="w-full h-24 grid place-items-center py-4">
      <p className="text-sm text-gray-500">No results found</p>
    </div>
  )
}

type ShowResultsProps = {
  searchStatus: typeof NOT_FOUND | typeof SUCCESS | typeof LOADING
  list: BookListInfo[]
}
function ShowResults ({ searchStatus, list }: ShowResultsProps ) {
  if (searchStatus === NOT_FOUND) return <NoResults />
  if (searchStatus === LOADING) return <LoadingResults />
  if (searchStatus === SUCCESS) {
    return (
      <div className="w-full max-h-72 overflow-y-auto h-auto">
        {
          list.map((book: BookListInfo) => (
            <button onClick={() => console.log('click!')} className="flex justify-between w-full text-left px-2 py-4 bg-white hover:bg-gray-100 border border-b-slate-100">
              <div>
                <p className="text-md font-semibold">{book.title} ({book.publishDate})</p>
                <p className="text-sm text-gray-500">{book.author}</p>
                <p className="text-xs text-gray-500">{book.publisher[0]}</p>
              </div>
              <div className="text-right hidden md:inline-block">
                <p className="text-xs text-gray-500">ISBN:</p>
                {
                  (book?.isbn && book.isbn.length > 0)
                    ? book.isbn.slice(0,2).map((isbn: string) => <p className="text-xs text-gray-500">{isbn}</p>)
                    : <p className="text-xs text-gray-500">N/A</p>
                }
              </div>
            </button>
          ))
        }
      </div>
    )
  }

  return <></>
}

export default function SearchResults ({ list, status }: Props) {
  const isLoading = status.loading && 'LOADING'
  const isNotFound = (!isLoading && status.results === 0) && 'NOT_FOUND'
  const isSuccess = (!isLoading && status.results > 0) && 'SUCCESS'

  const searchStatus = isLoading || isNotFound || isSuccess || 'NOT_FOUND';

  return (
    <div className="absolute w-full text-gray-900 border border-gray-300 bg-gray-50 z-50 rounded-b-xl shadow-md overflow-hidden">
      <ShowResults searchStatus={searchStatus} list={list} />
      <div className="flex justify-between px-2 py-1 border text-gray-500 text-sm border-t-gray-300 bg-gray-100">
        <p>
          Results: {status.loading ? '...' : status.results}
        </p>
        <p>
          <span className="hidden sm:inline">Books saved persists in local storage. </span>
          Data from <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">openlibrary.org</a>
        </p>
      </div>
    </div>
  )
}