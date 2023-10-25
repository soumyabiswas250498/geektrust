import React from 'react';

function Pagination({ allUsers, rowsOnePage, currentPage, handlePagination }) {
  const pageNumbers = [];
  const totalPages = Math.ceil(allUsers / rowsOnePage);
  for (let pageButton = 0; pageButton < totalPages; pageButton++) {
    pageNumbers.push(pageButton + 1);
  }
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  console.log(currentPage);
  return (
    <div className="w-full flex justify-center">
      <div className="flex justify-evenly items-center h-18 text-yellow-50">
        <button
          type="button"
          className="border-2 hover:border-[#bffaff] hover:text-[#bffaff] rounded-lg m-[3px] md:m-[12px]"
          onClick={() => handlePagination(1)}
          disabled={isFirstPage}
        >
          <p className="mx-1 text-sm md:text-xl  w-6">{'<<'}</p>
        </button>
        <button
          type="button"
          className="border-2 hover:border-[#bffaff] hover:text-[#bffaff] rounded-lg m-[3px] md:m-[12px]"
          onClick={() => handlePagination(currentPage - 1)}
          disabled={isFirstPage}
        >
          <p className="mx-1 text-sm md:text-xl w-6">{'<'}</p>
        </button>
        {pageNumbers.map(number => (
          <button
            key={number}
            type="button"
            className={`border-2 hover:border-[#bffaff] hover:text-[#bffaff] rounded-lg m-[3px] md:m-[12px] ${
              number === currentPage
                ? 'bg-[#bffaff] text-slate-700 hover:text-slate-700'
                : ''
            }`}
            onClick={() => handlePagination(number)}
          >
            <p className="mx-1 text-sm md:text-xl w-4">{number}</p>
          </button>
        ))}
        <button
          type="button"
          className="border-2 hover:border-[#bffaff] hover:text-[#bffaff] rounded-lg m-[3px] md:m-[12px]"
          onClick={() => handlePagination(currentPage + 1)}
          disabled={isLastPage}
        >
          <p className="mx-1 text-sm md:text-xl w-6">{'>'}</p>
        </button>
        <button
          type="button"
          className="border-2 hover:border-[#bffaff] hover:text-[#bffaff] rounded-lg m-[3px] md:m-[12px]"
          onClick={() => handlePagination(pageNumbers.length)}
          disabled={isLastPage}
        >
          <p className="mx-1 text-sm md:text-xl w-6">{'>>'}</p>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
