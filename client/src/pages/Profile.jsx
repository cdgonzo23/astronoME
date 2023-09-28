// Node Modules
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
// Utilities
import Auth from "../utils/auth";
import { QUERY_USERS, QUERY_USER, QUERY_ME } from "../utils/queries";
// Components
import UserList from "../components/UserList";

const Profile = () => {
  const { id } = useParams();
  const { loading, data, error } = useQuery(id ? QUERY_USER : QUERY_ME, {
    variables: { id },
  });

  // Get a list of all users
  const { usersLoading, data: usersData } = useQuery(QUERY_USERS);

  const user = data?.me || data?.user || {};
  const users = usersData?.users || [];

  if (error) console.log(error);

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === id) {
    return <Navigate to="/me" replace />;
  }
  // console.log("id: ", id)
  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  const renderUserList = () => {
    if (usersLoading) return null;
    // Only renders users who's profile we're not currently viewing
    const notMeUsers = users.filter((o) => o._id !== user._id);
    return <UserList users={notMeUsers} title="User List" />;
  };

  // Not useful as of now
  // const renderCurrentUserInfo = () => {
  //   if (id) return null;
  //   return (
  //     <ul>
  //       <li>username: {user.username}</li>
  //       <li>email: {user.email}</li>
  //     </ul>
  //   );
  // };

  return (
    <div>
      <h2 className="text-gray-300 flex justify-center">Viewing {id ? `${user.username}'s` : "your"} profile.</h2>
      <div className=" flex justify-center bg-darkest p-6 rounded m-7 shadow-[5px_2px_53px_5px_#6e91b8b6] ">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="sm:flex sm:space-x-5">
            <div className="flex-shrink-0">
              <img className="mx-auto h-20 w-20 rounded-full" src="https://placehold.jp/150x150.png" alt=""></img>
            </div>
            <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
              {id ? (
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
      <div className=" text-gray-300 font-normal">
        {renderUserList()}
      </div>
      {/* Display your info on the side 
      <div>
        {renderCurrentUserInfo()}
      </div> */}
      {/* Add Input Form to post online. Just add photos like a media page */}
      {/* Associate the person's blogpost (if posted) onto their profile page. To view THEIR posts */}
    </div>
  );
};

export default Profile;