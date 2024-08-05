import React from "react";

function AvailableBooks() {
  return (
    <div className='shadow-lg rounded-md shadow-gray-100 p-5 w-full'>
      {/* header */}
      <div className='flex items-center justify-between'>
        <h2 className='font-medium text-xl text-gray-600'>Available Books</h2>
        <div className='border py-1 px-2 rounded-md bg-gray-200 text-gray-600 text-sm'>
          Today
        </div>
      </div>
      {/* stats and graph */}
      <div className=''>
        {/* graph */}
        <div className='size-[10rem] rounded-full border-[1rem] border-green-500 mx-auto my-5'></div>
        {/* categories count */}
        <div className='space-y-2 py-2'>
          <div className='grid grid-cols-[auto_1fr_auto] items-center px-3'>
            <div className='size-[1rem] rounded-full bg-yellow-500 me-3'></div>
            <p>Fiction</p>
            <p>20</p>
          </div>
          <div className='grid grid-cols-[auto_1fr_auto] items-center px-3'>
            <div className='size-[1rem] rounded-full bg-blue-500 me-3'></div>
            <p>Self Help</p>
            <p>54</p>
          </div>
          <div className='grid grid-cols-[auto_1fr_auto] items-center px-3'>
            <div className='size-[1rem] rounded-full bg-red-500 me-3'></div>
            <p>Business</p>
            <p>26</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AvailableBooks;
