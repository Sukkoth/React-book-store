import { ScaleLoader } from "react-spinners";

function MainFallback() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <ScaleLoader />
    </div>
  );
}

export default MainFallback;
