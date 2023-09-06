import TextEditor from "../shared/TextEditor";

export default function Comments () {
  const handleSubmit = (event: Event) => {
    event.preventDefault()
    console.log('bub!')
  }

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit}>
        <TextEditor />
        <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200hover:bg-blue-800">
          Publish post
        </button>
      </form>
    </div>
  )
}