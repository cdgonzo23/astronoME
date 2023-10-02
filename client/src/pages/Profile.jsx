// Node Modules
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
// Utilities
import Auth from "../utils/auth";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { EDIT_USER } from "../utils/mutations";
import BlogpostList from "../components/BlogpostList";
import iconList from "../components/iconList";
// Components

const Profile = () => {
  const { username } = useParams();
  const { loading, data, error } = useQuery(username ? QUERY_USER : QUERY_ME, {
    variables: { username: username },
  });

  const user = data?.user || data?.me || {};

  if (error) console.log(error);

  // console.log(username);

  const [editUserDisplay, setEditUserDisplay] = useState(false);

  const [formState, setFormState] = useState({ email: "", location: "" });
  const [editUser] = useMutation(EDIT_USER, {
    refetchQueries: [QUERY_ME, "me"],
  });

  const handleChange = async (event) => {
    const { name, value, src } = event.target;

    setFormState({
      ...formState,
      [name]: value,
      icon: src
    });
  };

  const handleEditUser = async (event) => {
    event.preventDefault();
    try {
      if (formState.email === "") {
        formState.email = user.email;
      }
      if (formState.location === "") {
        formState.location = user.location;
      }
      if (formState.icon === "") {
        formState.icon = user.icon;
      }
     const { data } = await editUser({
        variables: { ...formState },
      });
      Auth.updateToken(data.editUser.token);
    } catch (e) {
      console.error(e);
    }

    setEditUserDisplay(false);
  };

  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === username) {
    return <Navigate to="/me" />;
  }
  // console.log("user: ", user);
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

  return (
    <>
      <div className="m-7">
        <div className=" flex justify-center bg-darkest p-6 rounded m-7 shadow-[5px_2px_53px_5px_#6e91b8b6] ">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="sm:flex sm:space-x-5">
              <div className="flex-shrink-0">
                <img
                  className="mx-auto h-20 w-20 rounded-full"
                  src={user.icon}
                  alt=""
                ></img>
              </div>
              <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                {username ? (
                  <>
                    <p className="text-sm font-body text-gray-300">
                      Now viewing,
                    </p>
                    <p className="text-xl font-heading text-gray-300 sm:text-2xl">
                      {user.username}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-body text-gray-300">
                      Welcome back,
                    </p>
                    <p className="text-xl font-heading text-gray-300 sm:text-2xl">
                      {user.username}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="m-8 px-4 sm:px-0 text-left w-full">
            <h3 className="text-lg font-body leading-7 text-gray-300">
              User Information
            </h3>
            {username ? null : (
              <>
                <button
                  className="text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-2 py-1 mt-2"
                  style={{ fontSize: "0.75rem" }}
                  onClick={() => setEditUserDisplay(!editUserDisplay)}
                >
                  Edit User Information
                </button>
              </>
            )}
          </div>
          {editUserDisplay ? (
            <div className="mt-6 border-t border-white/10 w-full flex flex-col items-start">
              <dl className="divide-y divide-white/10">
                <form onSubmit={handleEditUser}>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-body leading-6 text-gray-400">
                      Location
                    </dt>
                    <input
                      className="pl-2 pr-24 py-1 rounded text-darkest"
                      // placeholder={user.location}
                      name="location"
                      value={formState.location || user.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-body leading-6 text-gray-400">
                      Email address
                    </dt>
                    <input
                      className="pl-2 py-1 rounded text-darkest"
                      // placeholder={user.email}
                      name="email"
                      type="email"
                      value={formState.email || user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="mb-4 text-gray-300">Change Your Icon</p>
                  <div
                    style={{
                      display: "flex",
                      maxWidth: "75%",
                      marginBottom: "2rem",
                    }}
                  >
                    {iconList.map((icon) => {
                      return (
                        <div key={icon.id} className="mx-1">
                          <img
                            src={icon.src}
                            alt={icon.label}
                            name="icon"
                            className="hover:opacity-50"
                            onClick={handleChange}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <button
                    type="submit"
                    className="text-gray-300 bg-galaxy-red hover:bg-[#692217] hover:text-white rounded-md px-4 py-2 text-sm font-body"
                  >
                    Edit Information
                  </button>
                </form>
              </dl>
            </div>
          ) : (
            <div className="mt-6 border-t border-white/10 w-full flex flex-col items-start">
              <dl className="divide-y divide-white/10">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-body leading-6 text-gray-400">
                    Location
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">
                    {user.location}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-body leading-6 text-gray-400">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-200 sm:col-span-2 sm:mt-0">
                    {user.email}
                  </dd>
                </div>
              </dl>
            </div>
          )}
          {document.location.pathname === "/me" ? (
            <h3 className="text-base font-heading leading-7 text-gray-400 mt-12">
              Your Posts:
            </h3>
          ) : (
            <h3 className="text-base font-heading leading-7 text-gray-400 mt-12">
              {user.username}&apos;s Posts:
            </h3>
          )}
          <div className="w-full mb-2 md:w-[60%]">
            <BlogpostList blogposts={user.blogposts} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
