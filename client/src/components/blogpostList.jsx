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
          <div key={blogpost._id} className="mb-8 px-8 pt-8 pb-4 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]">
            <h4 className="card-header tracking-wide" style={{ fontSize: '1.5rem', display: 'flex', flexDirection: 'column'}}>
              <Link to={`/users/${blogpost.blogpostAuthor}`} className='hover:text-hover-blue'>
                {blogpost.blogpostAuthor}
              </Link>
              <span style={{ fontSize: '1rem'}}>
                {blogpost.blogpostLocation}
              </span>
              <span style={{ fontSize: '1rem'}}>
                {blogpost.createdAt} 
              </span>
              </h4>
            <hr className="my-4" />
            <div className="leading-7">
              <p>{blogpost.blogpostText}</p>
            </div>
            <div className="mx-auto mt-4 px-6 flex justify-center text-gray-300">
              <Link 
                className='text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-3 py-2 text-sm font-md'
                to={`${blogpost._id}`}
              >
                Add a Comment
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
