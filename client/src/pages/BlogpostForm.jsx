import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_BLOGPOST } from "../utils/mutations";
import { QUERY_BLOGPOSTS } from "../utils/queries";

import Auth from "../utils/auth";

const BlogpostForm = () => {
  const [blogpostText, setBlogpostText] = useState('')

  const [addBlogpost, { error }] = useMutation(ADD_BLOGPOST, {
    refetchQueries: [
      QUERY_BLOGPOSTS,
        'blogposts'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await addBlogpost({
        variables: {
            blogpostText,
            blogpostAuthor: Auth.getProfile().data.username,
            blogpostLocation: Auth.getProfile().data.location,
        }
      });
      document.location.replace('/community');
      setBlogpostText('');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'blogpostText') {
      setBlogpostText(value)
    }
  };
  
  const renderForm = () => {
    // if (data) {
    //   return <Navigate to='/community' replace />
    // } 
      return (
        <form className="" onSubmit={handleFormSubmit}>
        <textarea
          className='mb-4 bg-gray-300 pl-2 pr-2 py-1 rounded text-darkest w-full'
          name="blogpostText"
          value={blogpostText}
          style={{ height: '150px', resize: 'vertical' }}
          onChange={handleChange}
        ></textarea>
        <div className="flex justify-end w-full">
          <button type="submit" className='px-4 py-2 bg-div-gray hover:bg-hover-blue rounded'>
          Add Post
          </button>
        </div>
          
        
      </form>
    )
  }
  return (
    <main className='bg-darkest text-gray-300 flex flex-col items-center justify-center mt-32'>
      <div className="flex flex-col w-full mx-8 mb-2 md:w-[60%]">
        <h4 className='mb-8 text-2xl'>What Do You See in the Stars Tonight?</h4>
          {renderForm()}
          {error && <div>{error.message}</div>}
      </div>
    </main>
  );
};

export default BlogpostForm;
