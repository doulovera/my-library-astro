import type { AuthorGoogle } from "../types/author";

const BASE_URL = import.meta.env.APP_URL || 'http://localhost:4321';

const AUTHORS_KEY = 'myLibrary-authors'

export const getAuthor = async (authorName: string): Promise<AuthorGoogle> => {
  try {
    const parsedAuthorName = encodeURIComponent(authorName)
    const authorId = encodeURIComponent(authorName.replace(/\s/g, '-').toLowerCase())

    const authors = localStorage.getItem(AUTHORS_KEY)

    const parsedAuthors: (AuthorGoogle & { id: string })[] = authors ? JSON.parse(authors) : []
    if (parsedAuthors) {
      const author = parsedAuthors.find(author => author.id === authorId)
      if (author) return author
    }

    const response = await fetch(`${BASE_URL}/api/author.json?author=${parsedAuthorName}`);
    const data = await response.json();

    if (data.error) throw new Error(data.error)

    const newBooks = [...parsedAuthors, { ...data, id: authorId }]

    localStorage.setItem(AUTHORS_KEY, JSON.stringify(newBooks))

    return data
  } catch (error) {
    throw new Error('Error fetching author data');
  }
}