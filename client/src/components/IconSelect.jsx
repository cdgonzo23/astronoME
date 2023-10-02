import iconList from "./iconList";

const IconSelect = () => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Background backdrop, show/hide based on modal state.

        Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
        Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0" */}

      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          {/*       
            Modal panel, show/hide based on modal state.

            Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
            Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        */}
          <div className="relative transform overflow-hidden rounded-lg bg-darkest text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-darkest px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-300"
                    id="modal-title"
                  >
                    Select Avatar
                  </h3>
                  <div className="mt-2">
                    {iconList &&
                      iconList.map((icon) => {
                        <div key={icon.id}>
                          <img src={icon.src} alt={icon.label}></img>
                        </div>;
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-darkest px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="text-gray-300 bg-galaxy-red hover:bg-[#692217] hover:text-white rounded-md px-4 py-2 text-sm font-md"
              >
                Done
              </button>
              <button
                type="button"
                className="text-gray-300 my-2 md:my-0 md:mx-2 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-4 py-2 text-sm font-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconSelect;
