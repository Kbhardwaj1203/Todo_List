import React from 'react'
import "../index.css";
const Navbar = () => {
  return (
    <nav className="flex justify-between bg-indigo-950 text-white py-2">
        <div className="logo">
            <span className='font-extrabold font-serif text-3xl mx-9'>iTask</span>
        </div>
        <ul className="flex gap-8 mx-9">
            <li className='cursor-pointer text-xl text-white hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer text-xl text-white hover:font-bold transition-all'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar
