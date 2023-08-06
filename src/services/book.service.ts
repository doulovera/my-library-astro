import type { BookListInfo, SearchResponse } from "../types/book-api"

const BASE_URL = 'https://openlibrary.org'
const MAX_BOOKS = 12

type SearchBooksResponse = { success: boolean, total: number, list: BookListInfo[] }
export const searchBooks = async (query: string): Promise<SearchBooksResponse> => {
  try {
    const searchTerm = encodeURIComponent(query)
    const response = await fetch(`${BASE_URL}/search.json?q=${searchTerm}&limit=${MAX_BOOKS}`)
    
    if (!response.ok) throw new Error('Something went wrong')

    const data: SearchResponse = await response.json()

    const list = data.docs.map((book) => {
      const { title, publish_year, isbn, publisher, language, author_name } = book

      return {
        id: `${title}-${publish_year?.[0]}-${author_name?.[0]}`.toLowerCase().split(' ').join('-'),
        title,
        publishDate: `${publish_year?.[0] || 'N/A'}`,
        isbn,
        publisher,
        language,
        author: author_name?.join(', ') || 'N/A',
        cover: isbn?.[0] ? `http://covers.openlibrary.org/b/isbn/${isbn?.[0]}-M.jpg` : 'https://via.placeholder.com/130x180'
      }
    })

    return {
      success: true,
      total: data.numFound,
      list: list.slice(0, MAX_BOOKS)
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
  const key = 'myLibrary-books'
  try {
    const books = localStorage.getItem(key)
    const parsedBooks: BookListInfo[] = books ? JSON.parse(books) : []
    const newBooks = [...parsedBooks, data]

    localStorage.setItem(key, JSON.stringify(newBooks))

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
export const getAllBooks = (): GetAllBooksResponse => {
  try {
    const key = 'myLibrary-books'
    const books = localStorage.getItem(key)
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