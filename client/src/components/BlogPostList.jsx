import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DeleteBtn from './DeleteBtn'
import iconList from './iconList';
const BlogPostList = ({ blogposts }) => {
  if (!blogposts.length) {
    return <h3 className="text-gray-300 text-center">No Posts Yet</h3>;
  }
  return (
    <div className="mx-12 my-12 text-gray-300 font-body">
      {blogposts &&
        blogposts.map((blogpost, index) => (
          <div key={blogpost._id} className="mb-8 px-4 sm:px-8 pt-8 pb-4 rounded shadow-[5px_2px_53px_5px_#6e91b8b6]">
            <div className="card-header tracking-wide pb-4 mb-4 border-b-[1px] border-dotted border-hover-blue">
              <div className="flex flex-row justify-start items-center">
                <div className="flex-shrink-0 mr-2 mb-2">
                  <img
                    className="mx-auto h-12 w-12 rounded-full"
                    src={iconList.find((icon) => icon.id === blogpost.blogpostAuthor.icon).src}
                    alt={iconList.find((icon) => icon.id === blogpost.blogpostAuthor.icon).label}
                  ></img>
                </div>
                <div>
                  <Link to={`/user/${blogpost.blogpostAuthor.username}`} className="hover:text-hover-blue text-lg font-heading">
                    {blogpost.blogpostAuthor.username}
                    {console.log(blogpost)}
                  </Link>
                  <div className="text-sm text-gray-500 italic">{blogpost.blogpostAuthor.location}</div>
                  <div className="text-sm text-gray-500 italic">{blogpost.createdAt}</div>
                </div>
              </div>
            </div>
            <div className="leading-7 text-gray-300 text-2xl">
              <p>{blogpost.blogpostText}</p>
            </div>
            {blogpost.imageUrl ? (
              <div className="flex justify-center">
                <img className="w-96 mt-6 rounded-md shadow-[2px_1px_26px_2px_#000000]" style={{ padding: '1px', backgroundColor: '#212C3B' }} src={blogpost.imageUrl} alt={blogpost.imageUrl} />
              </div>
            ) : (
              ""
            )}
            <div className="mt-6 w-full flex flex-col md:flex-row md:justify-between justify-center text-center md:items-center text-gray-300">
              <Link to={`/community/${blogpost._id}`}>
                {blogposts[index].comments.length === 1 ? (
                  <p className="hover:text-hover-blue text-gray-500 text-lg text-left">{blogposts[index].comments.length} comment</p>
                ) : (
                  <p className="hover:text-hover-blue text-gray-500 text-lg text-left">{blogposts[index].comments.length} comments</p>
                )}
              </Link>
              {(document.location.pathname === "/me") ? (
                <div className="flex md:flex-row flex-col">
                  <Link
                    className="text-gray-300 my-2 md:my-0 md:mx-2 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-4 py-2 text-sm font-body"
                    to={`/community/${blogpost._id}`}
                  >
                    View Post
                  </Link>
                  <DeleteBtn blogpostId={blogpost._id} />
                </div>
              ) : (
                <Link
                  className="text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-4 py-2 my-2 text-sm font-body"
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
export default BlogPostList;
BlogPostList.propTypes = {
  blogposts: PropTypes.array,
};