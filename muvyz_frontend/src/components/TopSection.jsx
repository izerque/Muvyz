import React from 'react';

const TopSection = () => {
  return (
    <div className="h-[300px] border-2 border-white w-full bg-cover bg-center relative" style={{backgroundImage: 'url("/cover.jpg")'}}>
      <div className=" bg-gray-900 opacity-90 w-full h-full justify-center items-center flex flex-col text-center">
        <h1 className="text-4xl text-white font-bold">Movie <span className='text-[#3a6ed6]'> . Hub</span> </h1>
        <p className="text- font-light text-gray-200 mt-4">This is where I keep my faverate movies</p>
        <div className="p-4 text-white flex gap-4 ">
      <input type="text" placeholder="Search movies..." className="px-4 py-2 w-full rounded-full border border-gray-300 text-white bg-gray-900" />
      <button className="bg-[#3a6ed6] text-white font-bold py-2 px-4 rounded-full w-[150px] border-none" type="button">
        Search
      </button>
    </div>
      </div>
    
    </div>
  );
};

export default TopSection;
