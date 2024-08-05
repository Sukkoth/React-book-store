function IncomeCard() {
  return (
    <div className='p-5 shadow-lg rounded-md shadow-gray-100 w-full'>
      <div className='flex items-center justify-between pb-3 border-b border-b-gray-300'>
        <h2 className='font-medium text-xl text-gray-600'>Income</h2>
        <div className='border py-1 px-2 rounded-md bg-gray-200 text-gray-600 text-sm'>
          Today
        </div>
      </div>
      <div className='pt-5 flex items-end gap-2'>
        <h1 className='font-bold text-xl md:text-3xl'>ETB 9460.00</h1>
        <div className='text-red-500 inline-flex gap-1'>
          {/* <GoArrowDown size={15} /> */}
          <span className='text-sm'>1.5%</span>
        </div>
      </div>
      <div className='mt-5'>
        <p className='text-gray-500 text-lg md:text-xl font-light'>
          Compared to ETB9940 last month
        </p>
        <div className='inline-flex gap-4'>
          <p>Last Month Income</p>
          <p className='font-medium'>ETB 25658.00</p>
        </div>
      </div>
    </div>
  );
}

export default IncomeCard;
