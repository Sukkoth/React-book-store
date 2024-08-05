import storeLogoBlue from "/storeLogoBlue.png";

function BookRentAuthHeader() {
  return (
    <div className='flex items-end justify-center gap-3 mx-auto md:m-0 md:w-fit'>
      <div className='relative w-[3rem] h-[2rem] md:w-[4rem] md:h-[3rem]'>
        <img src={storeLogoBlue} alt='store icon' />
      </div>
      <h1 className='text-2xl md:text-4xl'>Book Rent</h1>
    </div>
  );
}

export default BookRentAuthHeader;
