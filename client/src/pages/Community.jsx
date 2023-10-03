import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
// Utilities
import Auth from "../utils/auth";
import { QUERY_BLOGPOSTS } from "../utils/queries";
import BlogPostList from "../components/BlogPostList";

const Blogposts = () => {
  const { loading, data } = useQuery(QUERY_BLOGPOSTS);
  const blogposts = data?.blogposts || [];
  console.log(blogposts);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="bg-darkest text-gray-300 flex flex-col items-center justify-center mt-16 font-body">
      {Auth.loggedIn() ? (
        <>
          <div className="mx-auto px-6 lg:px-8 flex justify-center text-gray-300">
            <Link to="/blogpostform" className="text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-4 py-2 text-lg font-body">
              Add a Post!
            </Link>
          </div>
          <div className="w-full mb-2 md:w-[60%]">
            <BlogPostList blogposts={blogposts} />
          </div>
        </>
      ) : (
        <>
          <h4 className="mb-8 text-xl font-body">
            You need to be logged in to view the community. Please{" "}
            <Link to="/login" className="text-[#6e91b8] text-2xl hover:text-hover-blue font-heading">
              Login
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="text-[#ae5446] text-2xl hover:text-galaxy-red font-heading">
              Signup.
            </Link>
          </h4>
        </>
      )}
    </main>
  );
};

export default Blogposts;
