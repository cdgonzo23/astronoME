import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REMOVE_BLOGPOST } from "../utils/mutations";
import { QUERY_BLOGPOSTS } from "../utils/queries";

const BlogpostList = ({ blogposts }) => {
  const [removeBlogpost] = useMutation(REMOVE_BLOGPOST, {
    refetchQueries: [QUERY_BLOGPOSTS, "blogposts"],
  });
  // console.log("blogposts", blogposts);
  async function handlePostDelete(blogpostId) {
    // e.preventDefault();
    try {
      await removeBlogpost({
        variables: {
          blogpostId: blogpostId,
        },
      });
      document.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  if (!blogposts.length) {
    return <h3 className="text-gray-300 text-center">No Posts Yet</h3>;
  }
  return (
    <div className="mx-12 my-12 text-gray-300 font-normal">
      {blogposts &&
        blogposts.map((blogpost, index) => (
          <div key={blogpost._id} className="mb-8 px-4 sm:px-8 pt-8 pb-4 rounded shadow-[5px_2px_53px_5px_#6e91b8b6]">
            <div className="card-header tracking-wide pb-4 mb-4 border-b-[1px] border-dotted border-hover-blue">
              <Link to={`/user/${blogpost.blogpostAuthor}`} className="hover:text-hover-blue text-lg">
                {blogpost.blogpostAuthor}
              </Link>
              <div className="text-sm text-gray-500 italic">{blogpost.blogpostLocation}</div>
              <div className="text-sm text-gray-500 italic">{blogpost.createdAt}</div>
            </div>
            <div className="leading-7 text-gray-300 text-2xl">
              <p>{blogpost.blogpostText}</p>
            </div>
            {blogpost.imageUrl ? (
              <div>
                <img className="w-96 mt-6" src={blogpost.imageUrl} alt={blogpost.imageUrl} />
              </div>
            ) : (
              ""
            )}
            <div className="mt-6 w-full flex flex-row justify-between text-center text-gray-300">
              <Link to={`/community/${blogpost._id}`}>
                {blogposts[index].comments.length === 1 ? (
                  <p className="hover:text-hover-blue text-gray-500 text-lg">{blogposts[index].comments.length} comment</p>
                ) : (
                  <p className="hover:text-hover-blue text-gray-500 text-lg">{blogposts[index].comments.length} comments</p>
                )}
              </Link>
              {document.location.pathname === "/me" ? (
                <div>
                  <Link
                    className="text-gray-300 m-2 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-4 py-2 text-sm font-md"
                    to={`/community/${blogpost._id}`}
                  >
                    View Post
                  </Link>
                  <button
                    onClick={() => handlePostDelete(blogpost._id)}
                    className="text-gray-300 bg-galaxy-red hover:bg-[#692217] hover:text-white rounded-md px-4 py-2 text-sm font-md"
                  >
                    Delete Post
                  </button>
                </div>
              ) : (
                <Link
                  className="text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-4 py-2 text-sm font-md"
                  to={`/community/${blogpost._id}`}
                >
                  View Post
                </Link>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlogpostList;

BlogpostList.propTypes = {
  blogposts: PropTypes.array,
};
