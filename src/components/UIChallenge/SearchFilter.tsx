import {
  ArrowDropDown,
  Clear,
  HelpOutlineOutlined,
  Tune,
} from "@mui/icons-material";
import Hoverable from "./Nav/Hoverable";

function SearchFilter() {
  return (
    <div className='px-5 max-w-[1375px] mx-auto mt-4'>
      {/* Top filters */}
      <div className='flex flex-col sm:flex-row items-end gap-2 sm:items-center justify-between'>
        <div className='flex items-center gap-1 ui-btn-base w-fit py-1'>
          <Tune
            fontSize='inherit'
            sx={{
              fontSize: "16px",
            }}
          />
          <p className='hidden sm:block'>All Filters</p>
        </div>
        <div className='flex items-center gap-1'>
          <p className='text-[13px] text-gray-500 inline-flex items-center gap-2'>
            1,000+ results, with Ads Learn more
            <HelpOutlineOutlined color='inherit' />
          </p>
          <div className='ui-btn-base py-1 hidden sm:block'>
            <span className='font-medium ps-2'>Sort by:</span>{" "}
            <span className='pe-2 font-normal'>Most Relevant</span>
            <ArrowDropDown />
          </div>
        </div>
      </div>
      <div className='mt-5 ps-3'>
        <Hoverable defaultBg='stay'>
          <div className='font-medium gap-1 inline-flex items-center'>
            <span>Etsy's Pick</span>
            <Clear fontSize='inherit' />
          </div>
        </Hoverable>
      </div>
    </div>
  );
}

export default SearchFilter;
