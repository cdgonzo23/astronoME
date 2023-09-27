// import { Link } from 'react-router-dom';

const BlogpostList = ({ blogposts }) => {
  if (!blogposts.length) {
    return <h3 className="text-gray-300 text-center">No Posts Yet</h3>;
  }
  console.log(blogposts._id) 
  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {blogposts &&
          blogposts.map((blogpost) => (
            <div key={blogpost.blogpostId} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{blogpost.blogpostText}</span>
                </h4>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BlogpostList;
