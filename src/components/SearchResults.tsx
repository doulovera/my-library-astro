import type { BookListInfo } from "../types/book-api";

export default function SearchResults ({ list }: { list: BookListInfo[] }) {
  return (
    <div className="absolute w-full shadow-md bg-white z-50 rounded-b-xl overflow-hidden">
      <div className="w-full max-h-64 overflow-y-auto h-auto">
        {
          list.map((book: BookListInfo) => (
            <button onClick={() => console.log('click!')} className="w-full text-left p-2 bg-white hover:bg-gray-100 border-b-slate-100">
              {book.title} - {book.author}
            </button>
          ))
        }
      </div>
    </div>
  )
}