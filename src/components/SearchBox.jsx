import React from 'react';
export default function SearchBox({ searchQuery, handleSearch }) {
  return (
    <div className="w-full h-10 my-4 flex justify-center ">
      <input
        type="text"
        className="p-4 bg-slate-300 text-black border-2 border-[#28edff] rounded-lg placeholder:text-gray-600 "
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search required data..."
      />
    </div>
  );
}
