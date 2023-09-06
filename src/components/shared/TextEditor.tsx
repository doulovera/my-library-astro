export default function TextEditor () {
  return (
    <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50">
      <div className="flex items-center justify-between px-3 py-2 border-b">
        <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x">
          <div className="flex flex-wrap items-center space-x-1">
            <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
                  </svg>
                <span className="sr-only">Settings</span>
            </button>
          </div>
        </div>
        <div id="tooltip-fullscreen" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip">
          Show full screen
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <div className="bg-white rounded-b-lg">
        <label for="editor" className="sr-only">Publish post</label>
        <textarea id="editor" rows={8} className="block w-full px-4 py-2 text-sm text-gray-800 bg-white border-0" placeholder="Write an article..." required></textarea>
      </div>
    </div>
  );
}
