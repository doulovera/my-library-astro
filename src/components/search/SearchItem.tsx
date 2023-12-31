import { NOT_FOUND, SUCCESS, LOADING } from "../../constants/status";

import type { BookListInfo } from "../../types/book-api";

function LoadingResults () {
  return (
    <div className="w-full h-24 grid place-items-center py-4">
      <img src="/icons/loader.svg" alt="" />
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
  onSelectItem: (book: BookListInfo) => void
}
export default function SearchItems ({ searchStatus, list, onSelectItem }: ShowResultsProps ) {
  if (searchStatus === NOT_FOUND) return <NoResults />
  if (searchStatus === LOADING) return <LoadingResults />
  if (searchStatus === SUCCESS) {
    return (
      <div className="w-full max-h-72 overflow-y-auto h-auto">
        {
          list.map((book: BookListInfo) => (
            <button key={book.id} onClick={() => onSelectItem(book)} className="flex justify-between w-full text-left px-2 py-4 bg-white hover:bg-gray-100 border border-b-slate-100">
              <div className="flex gap-2">
                <div>
                  <img
                    src={book?.cover}
                    alt=""
                    className="h-16 w-11 bg-cover rounded-sm"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-md font-semibold">{book.title} ({book.publishDate})</p>
                  <p className="text-sm text-gray-500">{book.author}</p>
                  <p className="text-xs text-gray-500">{book.publisher?.[0] || 'N/A'}</p>
                </div>
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