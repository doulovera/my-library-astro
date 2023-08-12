
interface Props {
  title: string;
  author: string;
  publishDate: string;
  cover: string;
  id: string | number;
}

export default function BookCard ({ id, title, author, publishDate, cover }: Props) {
  const bookLink = '/book'

  return (
    <a className="max-w-xs mx-auto group" href={bookLink}>
      <div>
        <img
          className="aspect-auto min-h-[18rem] h-72 w-full object-cover bg-white border border-gray-200 rounded-lg shadow group-hover:scale-105 transition"
          src={cover}
          alt=""
          style={`view-transition-name: book-cover-${id};`}
        />
      </div>
      <div className="pt-4 px-1">
        <div>
          <p className="text-gray-400 text-sm">
            {author}
          </p>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">
              {title}
          </h5>
        </div>
      </div>
    </a>
  )
}
