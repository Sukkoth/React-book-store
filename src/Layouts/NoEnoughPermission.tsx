import { GppMaybe } from "@mui/icons-material";

function NoEnoughPermission() {
  return (
    <div className='bg-white text-3xl w-full p-5 h-full rounded-xl shadow-lg shadow-gray-100 pt-10 flex items-center justify-center'>
      <div className='text-center text-7xl '>
        <GppMaybe fontSize='inherit' color='error' />
        <h1 className='font-bold text-2xl text-red-600'>
          You do not have enough persmission to view this page
        </h1>
      </div>
    </div>
  );
}

export default NoEnoughPermission;
