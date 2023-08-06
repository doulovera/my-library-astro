import Search from "./search/Search"
import BookList from "./book-list/BookList"
import { useBooks } from "../hooks/useBooks";

export default function BookContainer() {
  const { books, addNewBook } = useBooks()

  return (
    <>
      <Search addNewBook={addNewBook} />
      <section class="mt-10">
        <BookList books={books} />
      </section>
    </>
  )
}