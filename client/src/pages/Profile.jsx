// Node Modules
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// Utilities
import Auth from "../utils/auth";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import BlogpostList from "../components/BlogpostList";
// Components

const Profile = () => {
  const { username } = useParams();
  const { loading, data, error } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });

  const user = data?.user || data?.me || {};

  if (error) console.log(error);

  console.log(username);
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to="/me" />;
  }
  // console.log("user: ", user);
  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return <h4>You need to be logged in to see this. Use the navigation links above to sign up or log in!</h4>;
  }

  // console.log(user.username)

  return (
    <>
      <div className="m-7">
        <div className=" flex justify-center bg-darkest p-6 rounded m-7 shadow-[5px_2px_53px_5px_#6e91b8b6] ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img className="mx-auto h-20 w-20 rounded-full" src="https://placehold.jp/150x150.png" alt=""></img>
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                {username ? (
                  <>
                    <p className="text-sm font-medium text-gray-300">Now viewing,</p>
                    <p className="text-xl font-bold text-gray-300 sm:text-2xl">{user.username}</p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-medium text-gray-300">Welcome back,</p>
                    <p className="text-xl font-bold text-gray-300 sm:text-2xl">{user.username}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="m-8 flex flex-col justify-center items-center">
          <div className=" px-4 sm:px-0 text-left w-full">
            <h3 className="text-lg font-semibold leading-7 text-gray-300">User Information</h3>
          </div>
          <div className="mt-6 border-t border-white/10 w-full flex flex-col items-start">
            <dl className="divide-y divide-white/10">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-400">Location</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{user.location}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-400">Email address</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">{user.email}</dd>
              </div>
            </dl>
          </div>
          <hr className="my-4" />
          <h3 className="text-base font-semibold leading-7 text-gray-400 mt-12">Your Posts:</h3>
          <div className="w-full mb-2 md:w-[60%]">
            <BlogpostList blogposts={user.blogposts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
