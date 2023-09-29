import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const BlogpostList = ({ blogposts }) => {
  if (!blogposts.length) {
    return <h3 className="text-gray-300 text-center">No Posts Yet</h3>;
  }
  return (
    <div className="mx-12 my-12 text-gray-300 font-normal">
      {blogposts &&
        blogposts.map((blogpost) => (
          <div key={blogpost._id} className="mb-8 px-4 sm:px-8 pt-8 pb-4 rounded shadow-[5px_2px_53px_5px_#6e91b8b6]">
            <div className="card-header tracking-wide flex flex-col pb-4 mb-4 border-b-[1px] border-dotted border-hover-blue">
              <Link to={`/user/${blogpost.blogpostAuthor}`} className="hover:text-hover-blue text-lg">
                {blogpost.blogpostAuthor}
              </Link>
              <span className="text-sm text-gray-500 italic">
                {blogpost.blogpostLocation}
              </span>
              <span className="text-sm text-gray-500 italic">
                {blogpost.createdAt} 
              </span>
            </div>
            <div className="leading-7 text-gray-300 text-2xl">
              <p>{blogpost.blogpostText}</p>
            </div>
            <div className="mt-4 w-full flex flex-row justify-end text-gray-300">
              <Link 
                className='text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-4 py-2 text-sm font-md'
                to={`/community/${blogpost._id}`}
              >
                View Post
              </Link>
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
