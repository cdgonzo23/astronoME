import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
// Utilities
import Auth from '../utils/auth';
import { QUERY_BLOGPOSTS } from '../utils/queries';
import BlogpostList from '../components/BlogpostList';

const Blogposts = () => {
    const { loading, data } = useQuery(QUERY_BLOGPOSTS);
    const blogposts = data?.blogposts || [];

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <main className='bg-darkest text-gray-300 flex flex-col items-center justify-center mt-16'>
            {Auth.loggedIn() ? (
                <>
                  <div className="mx-auto px-6 lg:px-8 flex justify-center text-gray-300">
                    <Link to="/blogpostform" className='text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-3 py-2 text-sm font-md'>
                      Add a Post!
                    </Link>
                </div>
                <div className="flex-column justify-center">
                  <BlogpostList
                    blogposts={blogposts}
                  />
                </div>
                </>
                ) : (
                <>
                <h4 className='mb-8 text-xl'>
                    You need to be logged in to view the community. Please{' '}
                    <Link to="/login" className="text-[#6e91b8] text-2xl hover:text-hover-blue">Login</Link> or <Link to="/signup" className="text-[#6e91b8] text-2xl hover:text-hover-blue">Signup.</Link>
                </h4>
                </>
                )
            }
        </main>
    )
}

export default Blogposts;
