import React from 'react'
import {motion} from 'framer-motion'
const Navbar = () => {
  return (
    <div className='flex justify-center py-5 w-full '>
      <motion.div
        className="w-[90%] flex justify-center font-bold lg:text-xl shadow-md bg-white md:bg-black border-2 border-black p-3 rounded-lg gap-2 flex-row  cursor-pointer fixed z-10"
        whileTap={{ scale: 0.9 }}
      >
        <span>
          <h1 className=" text-yellow-600 text-center">Codeforces</h1>
        </span>
        <span>
          <h1 className=" text-blue-600 text-center max-[300px]:hidden">Profile</h1>
        </span>
        <span>
          <h1 className=" text-red-600 text-center">Visualizer</h1>
        </span>
      </motion.div>
    </div>
  );
}

export default Navbar