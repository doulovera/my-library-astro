interface Props {
  title: string;
  author: string;
  publishDate: string;
  cover: string;
  id: string;
  handleRemoveBook: (id: string) => (event: Event) => void;
}

export default function BookCard ({ id, title, author, publishDate, cover, handleRemoveBook }: Props) {
  const bookLink = `/book/${id}`

  return (
    <a className="max-w-xs mx-auto group" href={bookLink}>
      <div className="relative">
        <img
          className="aspect-auto min-h-[18rem] h-72 w-full object-cover bg-white border border-gray-200 rounded-lg shadow group-hover:scale-105 transition"
          src={cover}
          alt=""
          style={`view-transition-name: book-cover-${id};`}
        />
        <button
          className="p-1 opacity-0 group-hover:opacity-100 absolute right-1 top-1 transition-opacity bg-gray-50 rounded-md border-2 border-gray-300 hover:bg-red-500"
          title="Remove book from your list"
          onClick={handleRemoveBook(id)}
        >
          🗑️
        </button>
      </div>
      <div className="pt-4 px-1">
        <div>
          <p className="text-gray-500 text-sm">
            {author}
          </p>
          <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900">
              {title}
          </h5>
        </div>
      </div>
    </a>
  )
}
