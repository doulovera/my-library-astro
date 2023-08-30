import BookCard from "./BookCard.tsx";

import type { BookListInfo } from "../../types/book-api";

type BookListProps = {
  books: BookListInfo[] | null
  removeBook: (bookId: string) => void
}
export default function BookList ({ books, removeBook }: BookListProps) {

  if (!books) return (
    <div>
      <h1>No books found</h1>
    </div>
  )

  if (!books.length) return (
    <div>
      <h1>Loading...</h1>
    </div>
  )

  const handleRemoveBook = (id: string) => (event: Event) => {
    event.stopPropagation()
    event.preventDefault()
    removeBook(id)
  }

  return (
    <div class="grid grid-cols-[repeat(auto-fit,_minmax(190px,_1fr))] gap-x-4 gap-y-8 justify-between">
      {books.map(({ title, author, publishDate, cover, id }) => (
        <BookCard 
          key={id}
          id={id}
          title={title}
          author={author}
          publishDate={publishDate}
          cover={cover}
          handleRemoveBook={handleRemoveBook}
        />
      ))}
    </div>
  )
}