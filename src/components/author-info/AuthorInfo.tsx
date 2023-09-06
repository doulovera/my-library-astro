import { useEffect, useState } from 'preact/hooks';

import type { AuthorGoogle } from '../../types/author';
import { getAuthor } from '../../services/author.service';

type AuthorInfoProps = {
  authorName?: string;
}
export default function AuthorInfo ({ authorName }: AuthorInfoProps) {
  const [result, setResult] = useState<AuthorGoogle | null>(null); // need to get image

  useEffect(() => {
    const getAuthorInformation = async () => {
      if (!authorName) return
      const data = await getAuthor(authorName)
      setResult(data);
    }
    getAuthorInformation();
  }, [])

  if (!authorName) return null;

  return (
    <div className="p-10 bg-gray-50 rounded-xl shadow-xl">
      {
        result && (
          <div className="flex flex-col gap-2">
            <img src={result.image} alt={result.name} className="h-64 sm:h-48 bg-gray-100 rounded-md object-cover" />
            <h3 className="font-title">{result.name}</h3>
            <p className="text-sm">{result.description}</p>
          </div>
        )
      }
    </div>
  )
}
