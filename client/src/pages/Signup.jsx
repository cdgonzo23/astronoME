import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import iconList from "../components/iconList";
import Auth from "../utils/auth";
const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    location: "",
    email: "",
    password: "",
    icon: null,
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [icons, setIcons] = useState(iconList);
  // console.log('FORM STATE', formState);

  const profileIconSelect = (id) => {
    setIcons((icons) => icons.map((icon) => (icon.id === id ? { ...icon, active: true } : { ...icon, active: false })));
    setFormState((formState) => ({
      ...formState,
      icon: id,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((formState) => ({
      ...formState,
      [name]: value,
    }));
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  const renderForm = () => {
    if (data) {
      return (
        <p>
          Success! You may now head <Link to="/">back to the homepage.</Link>
        </p>
      );
    }
    return (
      <form className="flex flex-col items-center" onSubmit={handleFormSubmit}>
        <input
          className="mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest"
          placeholder="Your username"
          name="username"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        <input
          className="mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest"
          placeholder="City"
          name="location"
          type="text"
          value={formState.location}
          onChange={handleChange}
        />
        <input
          className="mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest"
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className="mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest"
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <p className="mb-4">Select An Icon For Your Profile</p>
        <div style={{ display: "flex", maxWidth: "75%", marginBottom: "2rem" }}>
          {icons.map((icon) => {
            return (
              <div key={icon.id} className="mx-1">
                <img
                  src={icon.src}
                  alt={icon.label}
                  name="icon"
                  className={`hover:opacity-50 rounded-full ${icon.active ? "bg-white" : ""}`}
                  onClick={() => profileIconSelect(icon.id)}
                />
              </div>
            );
          })}
        </div>
        <button className="px-4 py-2 bg-div-gray hover:bg-hover-blue rounded" type="submit">
          Submit
        </button>
      </form>
    );
  };
  return (
    <main className="bg-darkest text-gray-300 flex flex-col items-center justify-center mt-32 font-body">
      <h4 className="mb-8 text-2xl font-heading">Sign Up</h4>
      <div>
        {renderForm()}
        {error && error.message.includes("email") && (
          <div className="m-8 rounded-md bg-black-700 shadow-[5px_2px_25px_5px_#6e91b8b6] p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-body text-white-800">Invalid login info</h3>
                <div className="mt-2 text-sm text-white-700">
                  <p>Please provide a unique email.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && error.message.includes("username") && (
          <div className="m-8 rounded-md bg-black-700 shadow-[5px_2px_25px_5px_#6e91b8b6] p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-body text-white-800">Invalid login info</h3>
                <div className="mt-2 text-sm text-white-700">
                  <p>Please provide a unique username.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && error.message.includes("location") && (
          <div className="m-8 rounded-md bg-black-700 shadow-[5px_2px_25px_5px_#6e91b8b6] p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-body text-white-800">Invalid login info</h3>
                <div className="mt-2 text-sm text-white-700">
                  <p>Please provide your location.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {error && error.message.includes("password") && (
          <div className="m-8 rounded-md bg-black-700 shadow-[5px_2px_25px_5px_#6e91b8b6] p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-body text-white-800">Invalid login info</h3>
                <div className="mt-2 text-sm text-white-700">
                  <p>Password must be at least 5 characters long.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default Signup;
