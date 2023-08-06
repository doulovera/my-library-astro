import type { BookListInfo, SearchResponse } from "../types/book-api"

const BASE_URL = 'https://openlibrary.org'
const MAX_BOOKS = 12

interface SearchBooksResponse { success: boolean, total: number, list: BookListInfo[] }
export async function searchBooks (query: string): Promise<SearchBooksResponse> {
  try {
    const searchTerm = encodeURIComponent(query)
    const response = await fetch(`${BASE_URL}/search.json?q=${searchTerm}`)
    
    if (!response.ok) throw new Error('Something went wrong')

    const data: SearchResponse = await response.json()

    const list = data.docs.map((book) => {
      const { title, publish_year, isbn, publisher, language, author_name } = book

      return {
        title,
        publishDate: `${publish_year?.[0] || 'N/A'}`,
        isbn,
        publisher,
        language,
        author: author_name?.join(', ') || 'N/A'
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
