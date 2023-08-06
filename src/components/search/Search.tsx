import { useState } from 'preact/hooks'

import { searchBooks } from '../../services/book.service'
import SearchResults from '../search/SearchResults';
import type { BookListInfo } from '../../types/book-api';

type Props = {
  addNewBook: (book: BookListInfo) => void;
}

export default function Search ({ addNewBook }: Props) {
  const [booksFound, setBooksFound] = useState<BookListInfo[]>([]);
  const [status, setStatus] = useState({ loading: false, error: false, results: 0 });
  const [hasSearched, setHasSearched] = useState(false);
  
  const handleSubmit = async (event: Event) => {
    event.preventDefault();
    setStatus({ loading: true, error: false, results: 0 });
    setHasSearched(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const query = formData.get("query") as string;

    const { success, total, list } = await searchBooks(query);
    
    if (!success) {
      setStatus({ loading: false, error: true, results: 0 });
      return;
    }

    setStatus({ loading: false, error: false, results: total });
    setBooksFound(list);
  }

  const inputRounded = hasSearched ? 'rounded-t-lg' : 'rounded-lg';

  return (
    <section className="relative">
      <form onSubmit={handleSubmit}>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            name="query"
            id="default-search"
            className={`block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 ${inputRounded} bg-gray-50 focus:ring-blue-500 focus:border-blue-500`}
            placeholder="Search for books by title, author or ISBN"
            tabIndex={1}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <SearchResults list={booksFound} status={status} searched={hasSearched} setHasSearched={setHasSearched} addNewBook={addNewBook} />
    </section>
  )
}