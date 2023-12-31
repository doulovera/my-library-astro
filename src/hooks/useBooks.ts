import { useEffect, useState } from "preact/hooks"
import type { BookListInfo } from "../types/book-api"
import { getAllBooks, removeOneBook, saveOneBook } from "../services/book.service"

export const useBooks = () => { // if receive a prop, it will filter the book(s)
  const [books, setBooks] = useState<BookListInfo[] | null>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true)
      const { list } = await getAllBooks()
      const assignBooks = list.length ? list : null      

      setBooks(assignBooks)
      setLoading(false)
    }

    fetchBooks()
  }, [])

  const addNewBook = async (book: BookListInfo) => {
    await saveOneBook({ data: book })
    setBooks((prev) => [...prev || [], book])
  }

  const removeBook = async (bookId: string) => {
    await removeOneBook(bookId)
    setBooks((prev) => {
      if (!prev) return prev
      return prev?.filter((book) => book.id !== bookId)
    })
  }

  return {
    books,
    loading,
    addNewBook,
    removeBook,
  }
}