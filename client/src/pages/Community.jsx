import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
// Utilities
import Auth from '../utils/auth';
import { QUERY_BLOGPOSTS } from '../utils/queries';
import BlogpostList from '../components/blogpostList';

const Blogposts = () => {
    const { loading, data } = useQuery(QUERY_BLOGPOSTS);
    const blogposts = data?.blogposts || [];

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <main>
            {Auth.loggedIn() ? (
                <>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                      <Link to="/blogpostform" className='text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-3 py-2 text-lg font-md'>
                        Add a Post!
                      </Link>
                  </div>
                </div>
                <div className="flex-row justify-center">
                  <div className="col-12 col-md-10 my-3">
                      <BlogpostList
                        blogposts={blogposts}
                      />
                  </div>
                </div>
                </>
                ) : (
                <>
                <p>
                    You need to be logged in to view the community. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
                </>
                )
            }
        </main>
    )
}

export default Blogposts;
