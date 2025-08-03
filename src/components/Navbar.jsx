import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around  text-white py-2 bg-gradient-to-r   from-green-300 via-blue-500 to-purple-600'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>myTask</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className='cursor-pointer hover:font-bold transition-all'> Home </li>
        <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar;