import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className='h-[100dvh] w-full flex'>
      <div className='hidden w-1/2 bg-midnight-950 md:flex items-center justify-center'>
        <div className='relative object-cover size-[30rem]'>
          <img src='/storeLogo.png' alt='store icon' />
        </div>
      </div>
      <div className='md:w-1/2 w-full'>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
