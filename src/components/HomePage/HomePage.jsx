import React, { useState, useEffect } from 'react';
import { useNavigate, useContext } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const Navigate = useNavigate();
  const[toastShown, setToastShown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user && !toastShown) {
      toast.success(`Welcome, ${user.name}!`, {
        position: "top-center",
        autoClose: 3000,
      });
      setToastShown(true); 
    }
  }, [isAuthenticated, user, toastShown]);
 

  const handleRoomId = () => {
    const randomId = Math.random().toString(36).substring(2, 8);
    const timeStamp = Date.now().toString().substring(-5); 
    setRoomId(randomId + timeStamp);
  };

  const handleOneOnOneCalls = () => {
    if(!roomId){
      toast.info("Please Generate a Room ID to Proceed", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    Navigate(`room/${roomId}?type=one-on-one`);
  }

  const handleGroupCalls = () => {
    if(!roomId){
      toast.info("Please Generate a Room ID to Proceed", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    Navigate(`room/${roomId}?type=group-call`);
  }

  const handlegenerateId = () => {
    if(isAuthenticated){
      handleRoomId();
    }
    else{
      toast.info("Please Login To Generate Meeting ID", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  }
  
  return (
    <>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-8" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Swyft Video Call</span>
    </a>
    <button onClick={() => setIsMenuOpen(!isMenuOpen)} data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded={isMenuOpen}>
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          <a href="#" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
        </li>
        <li>
          <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
        </li>

        <li className='text-white font-serif'>
          {
            isAuthenticated && <p className='underline'>
              {user.name}
            </p>
          }
        </li>

        {
          isAuthenticated ? <li>
          <button onClick={() => 
          {
            logout({ logoutParams: { returnTo: window.location.origin } });
            setToastShown(false); // Reset the toastShown state
          }
        } 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
        </li>
          : <li>
          <button onClick={() => loginWithRedirect()} href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
        </li>
        }
 
      </ul>
    </div>
  </div>
</nav>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome
          </h1>
          <h4 className="text-center">Start a Video Call With a Randomly Generated ID</h4>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <div className="mt-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={roomId}
                  autoComplete="email"
                  readOnly 
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
                />
              </div>

              <button
                type="button"
                className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handlegenerateId}
                >
                Generate
              </button>
              
            </div>

            <div className="flex space-x-4">
            <button
                type="button"
                className="flex-1 text-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                //disabled={!roomId}
                onClick= {handleOneOnOneCalls}
              >
                One On One Call
              </button>
              <button
                type="button"
                className="flex-1 text-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                // disabled={!roomId}
                onClick={handleGroupCalls}
              >
                Group Call
              </button>
            </div>
            <ToastContainer />
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <button onClick={loginWithRedirect} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" type="button">
              Login/
            </button>
            <button onClick={loginWithRedirect} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" type="button">
              Signup
            </button>
          </p>
        </div>
      </div>
      
      <footer class="bg-gray-900 text-white pt-4 pb-4 px-4">
    <div class="mx-auto px-4 container overflow-hidden flex flex-col lg:flex-row justify-between">
        <div class="w-2/3 block sm:flex text-sm mt-6 lg:mt-0">
            <nav class="text-gray-700 list-none p-0 font-thin flex flex-col text-left w-full">
                <li class="inline-block py-2 px-3 text-white uppercase font-medium tracking-wide">Product</li>
                <li><a href="#" class="inline-block py-2 px-3 text-gray-500 hover:text-white transition duration-300 ease-in-out no-underline">Features</a></li>
                <li><a href="#" class="inline-block py-2 px-3 text-gray-500 hover:text-white transition duration-300 ease-in-out no-underline">Integrations</a></li>
                <li><a href="#" class="inline-block py-2 px-3 text-gray-500 hover:text-white transition duration-300 ease-in-out no-underline">Pricing</a></li>
                <li><a href="#" class="inline-block py-2 px-3 text-gray-500 hover:text-white transition duration-300 ease-in-out no-underline">FAQ</a></li>
            </nav>
            <nav class="text-gray-700 list-none p-0 font-thin flex flex-col text-left w-full">
                <li class="inline-block py-2 px-3 text-white uppercase font-medium tracking-wide">Company</li>
                <li><a href="#" class="inline-block py-2 px-3 text-gray-500 hover:text-white transition duration-300 ease-in-out no-underline">Privacy</a></li>
                <li><a href="#" class="inline-block py-2 px-3 text-gray-500 hover:text-white transition duration-300 ease-in-out no-underline">Terms of Service</a></li>
            </nav>
            <nav class="text-gray-700 list-none p-0 font-thin flex flex-col text-left w-full">
                <li class="inline-block py-2 px-3 text-white uppercase font-medium tracking-wide">Developers</li>
                <li><a href="#" class="inline-block py-2 px-3 text-gray-500 hover:text-white transition duration-300 ease-in-out no-underline">Developer API</a></li>
                <li><a href="#" class="inline-block py-2 px-3 text-gray-500 hover:text-white transition duration-300 ease-in-out no-underline">Documentation</a></li>
                <li><a href="#" class="inline-block py-2 px-3 text-gray-500 hover:text-white transition duration-300 ease-in-out no-underline">Guides</a></li>
            </nav>
            <div class="text-gray-700 flex flex-col w-full">
                <div class="inline-block py-2 px-3 text-white uppercase font-medium tracking-wide">Follow Us</div>
                <div class="flex pl-4 justify-start mt-2">
                    <a class="block flex items-center text-gray-300 hover:text-white mr-6 no-underline" href="#" aria-label="Facebook">
                        <svg viewBox="0 0 24 24" class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z" />
                        </svg>
                    </a>
                    <a class="block flex items-center text-gray-300 hover:text-white mr-6 no-underline" href="#" aria-label="Twitter">
                        <svg viewBox="0 0 24 24" class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                        </svg>
                    </a>
                    <a class="block flex items-center text-gray-300 hover:text-white no-underline" href="#" aria-label="GitHub">
                        <svg viewBox="0 0 24 24" class="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.295-1.553 3.3-1.23 3.3-1.23.646 1.653.241 2.873.118 3.176.77.84 1.235 1.91 1.235 3.22 0 4.609-2.804 5.626-5.474 5.93.428.37.812 1.097.812 2.215 0 1.598-.015 2.884-.015 3.272 0 .319.218.694.825.577A12.002 12.002 0 0024 12.297c0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-3 text-center text-sm text-gray-500">
        <p>Made By <span className='font-bold'>Shreyas & Ketan <span class="text-red-600">♥</span></span></p>
        <p className='mt-2'>&copy; 2024 Terna Engineering College. All rights reserved.</p>
    </div>
</footer>

    </>
  );
};

export default HomePage;
