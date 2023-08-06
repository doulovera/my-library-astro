import { useEffect, useState } from "preact/hooks"
import type { BookListInfo } from "../types/book-api"
import { getAllBooks, saveOneBook } from "../services/book.service"

export const useBooks = () => { // if receive a prop, it will filter the book(s)
  const [books, setBooks] = useState<BookListInfo[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      const { list } = await getAllBooks()
      setBooks(list)
      setLoading(false)
    }

    fetchBooks()
  }, [])

  const addNewBook = async (book: BookListInfo) => {
    await saveOneBook({ data: book })
    setBooks((prev) => [...prev, book])
  }

  const removeBook = async (bookId: string) => {
    console.log('remove book')
  }

  return {
    books,
    loading,
    addNewBook,
    removeBook,
  }
}