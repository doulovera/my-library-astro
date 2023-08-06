import { useEffect, useState } from "preact/hooks"
import type { BookListInfo } from "../../types/book-api"
import SearchItems from "./SearchItem"

type Props = {
  list: BookListInfo[]
  status: {
    loading: boolean,
    error: boolean,
    results: number
  },
  searched: boolean
  setHasSearched: (hasSearched: boolean) => void
  addNewBook: (book: BookListInfo) => void
}

export default function SearchResults ({ list, status, searched, setHasSearched, addNewBook }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const isLoading = status.loading && 'LOADING'
  const isNotFound = (!isLoading && status.results === 0) && 'NOT_FOUND'
  const isSuccess = (!isLoading && status.results > 0) && 'SUCCESS'

  const searchStatus = isLoading || isNotFound || isSuccess || 'NOT_FOUND'

  useEffect(() => {
    setIsOpen(searched)
  }, [searched])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        setHasSearched(false)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const searchBox = document.getElementById('search-box-container')
      if (searchBox && !searchBox.contains(event.target as Node)) {
        setIsOpen(false)
        setHasSearched(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const onSelectItem = (book: BookListInfo) => {
    addNewBook(book)
    setIsOpen(false)
    setHasSearched(false)
  }

  if (!isOpen) return <></>

  return (
    <div id="search-box-container" className="absolute w-full text-gray-900 border border-gray-300 bg-gray-50 z-50 rounded-b-xl shadow-md overflow-hidden">
      <SearchItems searchStatus={searchStatus} list={list} onSelectItem={onSelectItem} />
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