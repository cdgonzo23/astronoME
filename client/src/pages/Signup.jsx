import { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    city: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
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
        <input className='mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest' placeholder="Your username" name="username" type="text" value={formState.name} onChange={handleChange} />
        <input className='mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest' placeholder="City" name="city" type="text" value={formState.location} onChange={handleChange} />
        <input className='mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest' placeholder="Your email" name="email" type="email" value={formState.email} onChange={handleChange} />
        <input className='mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest' placeholder="******" name="password" type="password" value={formState.password} onChange={handleChange} />
        <button className='px-4 py-2 bg-div-gray hover:bg-hover-blue rounded' type="submit">Submit</button>
      </form>
    );
  };

  return (
    <main className='bg-darkest text-gray-300 flex flex-col items-center justify-center mt-32'>
      <h4 className='mb-8 text-2xl'>Sign Up</h4>
      <div>
        {renderForm()}
        {error && <div>{error.message}</div>}
      </div>
    </main>
  );
};

export default Signup;
