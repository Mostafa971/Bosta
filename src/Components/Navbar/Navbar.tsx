import React, { useEffect, useState } from 'react'
import logo from '../../assets/Bosta Logo.png'
export default function Navbar() {


  const toggleDarkMode = () => setIsDarkMode(prev => !prev);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark' || false);


  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  return (
  <>
      <nav className="fixed top-0 z-10 right-0 left-0 mainColor border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <button type="button" data-dropdown-toggle="language-dropdown-menu" className="inline-flex items-center font-medium justify-center px-4 py-2 text-sm text-gray-900 dark:text-white rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
    <svg className="w-5 h-5 rounded-full me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 3900 3900"><path fill="#b22234" d="M0 0h7410v3900H0z" /><path d="M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0" stroke="#fff" strokeWidth={300} /><path fill="#3c3b6e" d="M0 0h2964v2100H0z" /><g fill="#fff"><g id="d"><g id="c"><g id="e"><g id="b"><path id="a" d="M247 90l70.534 217.082-184.66-134.164h228.253L176.466 307.082z" /><use xlinkHref="#a" y={420} /><use xlinkHref="#a" y={840} /><use xlinkHref="#a" y={1260} /></g><use xlinkHref="#a" y={1680} /></g><use xlinkHref="#b" x={247} y={210} /></g><use xlinkHref="#c" x={494} /></g><use xlinkHref="#d" x={988} /><use xlinkHref="#c" x={1976} /><use xlinkHref="#e" x={2470} /></g></svg>
    English (US)
  </button>



  <button
          onClick={toggleDarkMode}
          className=" p-1 my-2  rounded  bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-100"
        >
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>

  
  <img width={100} src={logo} alt="" />



  </div>
</nav>


    </>
  )
}
