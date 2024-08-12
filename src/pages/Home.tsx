import { Link } from "react-router-dom";

function Home() {
  return (
    <div className='w-full h-[100dvh] flex flex-col items-center justify-center'>
      <h1 className='font-bold text-5xl text-midnight-950'>WELCOME</h1>
      <Link
        to='/auth/login/owner'
        className='mt-5 border px-5 py-2 rounded-xl hover:bg-midnight-950 hover:text-white duration-300 transition-colors'
      >
        Log in as owner
      </Link>
    </div>
  );
}

export default Home;

function Login() {}
