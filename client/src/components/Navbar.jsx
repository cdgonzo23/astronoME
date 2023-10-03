import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
} 

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Disclosure as="nav" className="bg-darkest">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 font-body">
            <div className="relative flex h-20 items-center">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-300 hover:bg-div-gray hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                      <Link to="/" className='text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-3 py-2 text-lg font-body'>
                        Home
                      </Link>
                      <Link to="/community" className='text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white rounded-md px-3 py-2 text-lg font-body'>
                        Community
                      </Link>

                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white hover:bg-hover-blue text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-12 w-12 sm:h-16 sm:w-16 p-[1px] rounded-full"
                        src="../../grav-logo-png-transparent.png"
                        alt="profile-icon"
                        />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                    >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-div-gray text-gray-300 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {Auth.loggedIn() ? ( 
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/me" className={classNames(active ? 'bg-hover-blue' : '', 'block px-4 py-2 text-sm text-gray-300 w-full text-left')}>
                            {Auth.getProfile().data.username}&lsquo;s profile
                          </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button onClick={logout} className={classNames(active ? 'bg-hover-blue' : '', 'block px-4 py-2 text-sm text-gray-300 w-full text-left')}>
                            Logout
                          </button>
                          )}
                        </Menu.Item>
                      </>
                      ) : (
                      <>
                      <Menu.Item>
                        {({ active }) => (
                        <Link to="/login" className={classNames(active ? 'bg-hover-blue' : '', 'block px-4 py-2 text-sm text-gray-300 w-full text-left')}>
                          Login
                        </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                        <Link to="/signup" className={classNames(active ? 'bg-hover-blue' : '', 'block px-4 py-2 text-sm text-gray-300 w-full text-left')}>
                          Signup
                        </Link>
                        )}
                      </Menu.Item>
                    </>
                      )
                      }
                     
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link to="/" className="text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white block rounded-md px-3 py-2 text-base font-body">
                Home
              </Link>
              <Link to="/community" className="text-gray-300 bg-div-gray hover:bg-hover-blue hover:text-white block rounded-md px-3 py-2 text-base font-body">
                Community
              </Link>

            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar;