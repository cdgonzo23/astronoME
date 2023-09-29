
const ProfileAddComments = () => {
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
            console.log("TESTINNGGGG")
        } catch (err) {
          console.error(err);
        }
      };
    return (
        <>
            <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                    <img className="inline-block h-10 w-10 rounded-full" src="https://placehold.jp/150x150.png" alt=""></img>
                </div>
                <div className="min-w-0 flex-1">
                    <form onSubmit={handleFormSubmit}>
                        <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
                            <label htmlFor="comment" className="sr-only">Post your stargazing adventure!</label>
                            <textarea rows="3" name="comment" id="comment" className="block w-full resize-none border-0 border-b border-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Add your comment..."></textarea>
                        </div>
                        <div className="flex justify-between pt-2">
                            <div className="flex items-center space-x-5">
                                <div className="flow-root">
                                    <button type="button" className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                        </svg>
                                        <span className="sr-only">Attach a file</span>
                                    </button>
                                </div>
                            </div>
                            <div className="flex-shrink-0">
                                <button type="submit" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Post</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProfileAddComments