import { useBooks } from "../../hooks/useBooks";
import type { BookListInfo } from "../../types/book-api";

export default function BookList ({ books }: { books: BookListInfo[] }) {

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <h3>☀️{book.title}</h3>
          <p>{book.author}</p>
          <hr />
        </div>
      ))}
    </div>
  )
}