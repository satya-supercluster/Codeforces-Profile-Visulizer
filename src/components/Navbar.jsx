import React from 'react'
import {motion} from 'framer-motion'
const Navbar = () => {
  return (
    <div className='flex justify-center'>
      <motion.div
        className="w-[90%] flex justify-center font-bold text-xl bg-black p-3 rounded-lg sm:gap-2 flex-col sm:flex-row  cursor-pointer"
        whileTap={{ scale: 0.9 }}
      >
        <span>
          <h1 className=" text-yellow-600 text-center">Codeforces</h1>
        </span>
        <span>
          <h1 className=" text-blue-600 text-center">Profile</h1>
        </span>
        <span>
          <h1 className=" text-red-600 text-center">Visualizer</h1>
        </span>
      </motion.div>
    </div>
  );
}

export default Navbar