import { FavoriteBorder, KeyboardArrowRight, Star } from "@mui/icons-material";

function SearchResultTopItem() {
  return (
    <div className='px-5 max-w-[1375px] mx-auto mt-4'>
      <div className='flex gap-2 md:gap-[30px] border-b border-b-gray-300 pb-2 md:pb-5 px-5 '>
        {/* image container */}
        <div className='w-[60%]  md:w-[22rem] h-[14rem] md:h-[14rem rounded-2xl overflow-hidden relative'>
          <img
            src='https://i.etsystatic.com/18750500/r/il/833729/5101620968/il_680x540.5101620968_wca5.jpg'
            className='h-full w-full object-cover'
            alt='item-pic'
          />
          <div className='absolute top-3 right-3 p-1 rounded-full border border-gray-400 bg-white hover:shadow-lg hover:shadow-gray-500'>
            <FavoriteBorder fontSize={"small"} />
          </div>
        </div>
        {/* details */}
        <div className='grid grid-rows-[1fr_auto] w-[50%] sm:w-[60%]'>
          <div className='flex flex-col'>
            <div className='order-2 md-order-none flex flex-col md:flex-row gap-1 md:items-center text-[13px]'>
              <p className='underline'>RosemarineTextiles</p>
              <div className='flex items-center'>
                <div className='flex text-[15px]'>
                  <Star fontSize='inherit' />
                  <Star fontSize='inherit' />
                  <Star fontSize='inherit' />
                  <Star fontSize='inherit' />
                  <Star fontSize='inherit' />
                </div>
                <p className='ms-2'>(207)</p>
              </div>
            </div>
            <h1 className='order-1 md:order-none text-[14px] md:text-[19px] font-medium pt-2 leading-7 line-clamp-1 md:line-clamp-2'>
              Pink Silk Hair Bow, Classic Hair Bow, Coquette, Balletcore, Hair
              Ribbon Clip, Romancecore
            </h1>
            <div className='order-3 md-order-none'>
              <h3 className='text-[11px] md:text-[16px] font-medium mt-1'>
                USD 38.40
              </h3>
              <p className='text-green-700'>
                <span className='line-through text-[11px]'>USD 48.00</span>
                (20% off)
              </p>
              <p className='text-green-950 bg-[#a0e193] w-fit px-2  rounded-3xl text-[11px] font-medium'>
                FREE shipping
              </p>
            </div>
          </div>
          <div>
            <button className='ui-btn'>
              Shop this item
              <span>
                <KeyboardArrowRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResultTopItem;
