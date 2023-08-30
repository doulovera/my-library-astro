import Search from "./search/Search"
import BookList from "./book-list/BookList"
import { useBooks } from "../hooks/useBooks";

export default function BookContainer() {
  const { books, addNewBook, removeBook } = useBooks()

  return (
    <>
      <Search addNewBook={addNewBook} />
      <section class="mt-10 p-10 bg-gray-50 rounded-xl shadow-2xl">
        <div className="mb-10">
          <h2 className="text-xl mb-1 font-title font-medium">Saved Books.</h2>
          <p className="text-sm text-gray-500">Books are saved in Local Storage</p>
        </div>
        <BookList books={books} removeBook={removeBook} />
      </section>
    </>
  )
}