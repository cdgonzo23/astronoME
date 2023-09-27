import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_BLOGPOST } from "../utils/mutations";

import Auth from "../utils/auth";

const BlogpostForm = () => {
  const [blogpostText, setBlogpostText] = useState('')

  const [addBlogpost, { error }] = useMutation(ADD_BLOGPOST);

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

      setBlogpostText('')
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

  return (
    <div>
      <h3>What do you see in the sky tonight?</h3>

      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="blogpostText"
                value={blogpostText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Post
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to post. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  )

};

export default BlogpostForm;
