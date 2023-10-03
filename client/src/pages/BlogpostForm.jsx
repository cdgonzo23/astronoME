import { useState } from "react";
import CloudinaryUploadWidget from "../components/UploadWidget";
// import { Navigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_BLOGPOST } from "../utils/mutations";
import { QUERY_BLOGPOSTS } from "../utils/queries";

import Auth from "../utils/auth";

const BlogpostForm = () => {
  const [blogpostText, setBlogpostText] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [addBlogpost, { error }] = useMutation(ADD_BLOGPOST, {
    refetchQueries: [QUERY_BLOGPOSTS, "blogposts"],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(Auth.getProfile().data);
      await addBlogpost({
        variables: {
          blogpostText,
          blogpostAuthor: Auth.getProfile().data,
          imageUrl: imageUrl,
        },
      });
      document.location.replace("/community");
      setBlogpostText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "blogpostText") {
      setBlogpostText(value);
    }
  };

  // const renderForm = () => {
  // if (data) {
  //   return <Navigate to='/community' replace />
  // }
  return (
    <main className="bg-darkest text-gray-300 flex flex-col items-center justify-center mt-32">
      <div className="flex flex-col w-full mx-8 mb-2 md:w-[60%]">
        <h4 className="mb-8 text-2xl font-heading">What Do You See in the Stars Tonight?</h4>

        <form className="font-body" onSubmit={handleFormSubmit}>
          <textarea
            className="mb-4 bg-gray-300 pl-2 pr-2 py-1 rounded text-darkest w-full"
            name="blogpostText"
            value={blogpostText}
            style={{ height: "150px", resize: "vertical" }}
            onChange={handleChange}
          ></textarea>

          <div className="flex justify-end w-full font-body">
            <div className="mx-5">
              <CloudinaryUploadWidget setImg={setImageUrl} />
            </div>
            <button type="submit" className="px-4 py-2 bg-div-gray hover:bg-hover-blue rounded">
              Add Post
            </button>
          </div>
          {imageUrl !== "" ? (
            <>
              {/* <p className="text-xl text-green-400">Image Uploaded</p> */}
              <img className="w-96" src={imageUrl} alt={imageUrl} />
            </>
          ) : (
            ""
          )}
        </form>
        {error && (
          <div className="m-8 rounded-md bg-black-700 shadow-[5px_2px_25px_5px_#6e91b8b6] p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-body text-white-800">Post text is required.</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
// return (
//   <main className="bg-darkest text-gray-300 flex flex-col items-center justify-center mt-32">
//     <div className="flex flex-col w-full mx-8 mb-2 md:w-[60%]">
//       <h4 className="mb-8 text-2xl">What Do You See in the Stars Tonight?</h4>
//       {renderForm()}
//       {error && <div>{error.message}</div>}
//     </div>
//   </main>
// );
// };

export default BlogpostForm;
