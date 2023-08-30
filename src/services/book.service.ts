import type { BookListInfo, SearchResponse } from "../types/book-api"

const BASE_URL = 'https://openlibrary.org'
const MAX_BOOKS = 12
const TABLE_KEY = 'myLibrary-books'

type SearchBooksResponse = { success: boolean, total: number, list: BookListInfo[] }
export const searchBooks = async (query: string): Promise<SearchBooksResponse> => {
  try {
    const searchTerm = encodeURIComponent(query)
    const response = await fetch(`${BASE_URL}/search.json?q=${searchTerm}&limit=20`)
    
    if (!response.ok) throw new Error('Something went wrong')

    const data: SearchResponse = await response.json()

    const list = data.docs.map((book) => {
      const { title, publish_year, isbn, publisher, language, author_name } = book

      if (!isbn?.[0]) return

      return {
        id: `${title}-${publish_year?.[0]}-${author_name?.[0]}`.toLowerCase().split(' ').join('-'),
        title,
        publishDate: `${publish_year?.[0] || 'N/A'}`,
        isbn,
        publisher,
        language,
        author: author_name?.join(', ') || 'N/A',
        cover: `http://covers.openlibrary.org/b/isbn/${isbn?.[0]}-M.jpg`
      }
    })
    
    const filterNull = list.filter(Boolean)

    const filterRepeatedBooks = filterNull.filter((book, index, self) => (
      index === self.findIndex((b) => (b!.id === book!.id))
    ))

    const slicedBooks = filterRepeatedBooks.slice(0, MAX_BOOKS)

    return {
      success: true,
      total: slicedBooks.length,
      list: slicedBooks as BookListInfo[]
    }
  } catch (error) {
    console.error(error)
    return {
      success: false,
      total: 0,
      list: []
    }
  }
}

type SaveOneBook = { data: BookListInfo }
type SaveOneBookResponse = { success: boolean }

export const saveOneBook = async ({ data }: SaveOneBook): Promise<SaveOneBookResponse> => {
  try {
    const books = localStorage.getItem(TABLE_KEY)
    const parsedBooks: BookListInfo[] = books ? JSON.parse(books) : []
    const newBooks = [...parsedBooks, data]

    localStorage.setItem(TABLE_KEY, JSON.stringify(newBooks))

    return {
      success: true
    }
  } catch (error) {
    console.log(error)

    return {
      success: false
    }
  }
}

type GetAllBooksResponse = { success: boolean, list: BookListInfo[] }
export const getAllBooks = async (): Promise<GetAllBooksResponse> => {
  try {
    const books = localStorage.getItem(TABLE_KEY)
    const parsedBooks: BookListInfo[] = books ? JSON.parse(books) : []

    return {
      success: true,
      list: parsedBooks
    }
  } catch (error) {
    console.log(error)
    return { success: false, list: [] }
  }
}

export const removeOneBook = async (bookId: string) => {
  try {
    const books = localStorage.getItem(TABLE_KEY)
    const parsedBooks: BookListInfo[] = books ? JSON.parse(books) : []

    const filteredBooks = parsedBooks?.filter((book) => book.id !== bookId)
    localStorage.setItem(TABLE_KEY, JSON.stringify(filteredBooks))

    return {
      success: true,
      list: filteredBooks
    }
  } catch (error) {
    console.log(error)
    return { success: false, list: [] }
  }
}
