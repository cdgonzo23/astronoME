import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const renderForm = () => {
    if (data) {
      return (
        <p className='font-body'>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      )
    } 
    return (
      <form className="flex flex-col items-center font-body" onSubmit={handleFormSubmit}>
        <input
          className='mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest'
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          className='mb-8 bg-gray-300 pl-2 pr-24 py-1 rounded text-darkest'
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit" className='px-4 py-2 bg-div-gray hover:bg-hover-blue rounded'>
          Submit
        </button>
      </form>
    );
  };

  return (
    <main className='bg-darkest text-gray-300 flex flex-col items-center justify-center mt-32'>
      <h4 className='mb-8 text-2xl font-heading'>Login</h4>
      <div>
        {renderForm()}
        {error && 
        <div className="m-8 rounded-md bg-black-700 shadow-[5px_2px_25px_5px_#6e91b8b6] p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-body text-white-800">Invalid login info</h3>
              <div className="mt-2 text-sm text-white-700">
                <p>Username/Password credentials are incorrect.</p>
              </div>
            </div>
          </div> 
        </div>
        }
      </div>
    </main>
  );
};

export default Login;