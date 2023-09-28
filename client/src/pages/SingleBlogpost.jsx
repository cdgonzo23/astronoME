import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

import { QUERY_SINGLE_BLOGPOST } from '../utils/queries';

const SingleBlogpost = () => {
    const { blogpostId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_BLOGPOST, {
        // pass URL parameter
        variables: { blogpostId: blogpostId },
    });

    const blogpost = data?.blogpost || {};

    if (loading) {
        return <div>Loading...</div>
    }
    return (
    <div className="justify-center mx-12 lg:mx-32 my-12 lg:my-32 text-gray-300 font-normal">
        <h2 
            className="bg-darkest px-8 pt-8 pb-4 rounded shadow-[5px_15px_25px_-15px_#6e91b8b6]"
            style={{ fontSize: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center'  }}
        >
            <Link to={`/users/${blogpost.blogpostAuthor}`}>
                {blogpost.blogpostAuthor}
            </Link>
            <span style={{ fontSize: '1rem' }}>
                {blogpost.blogpostLocation}
            </span>
            <span style={{ fontSize: '1rem' }}>
              {blogpost.createdAt}
            </span>
        </h2>
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            lineHeight: '1.5',
          }}
        >
          {blogpost.blogpostText}
        </blockquote>

      <div className="my-5 px-4">
        <CommentList comments={blogpost.comments} />
      </div>
      <div className="m-3 p-4 flex justify-center">
        <CommentForm blogpostId={blogpost._id} />
      </div>
    </div>
    )

};

export default SingleBlogpost;