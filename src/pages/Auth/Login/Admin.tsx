import { Link } from "react-router-dom";
import BookRentAuthHeader from "../../../components/Auth/BookRentAuthHeader";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Link as MaterialLink } from "@mui/material";

function Admin() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-[80%] sm:w-[70%] mx-auto'>
        <BookRentAuthHeader />
        <h1 className='mt-5 md:mt-10 text-center md:text-start text-2xl md:text-4xl pb-1 border-b border-b-gray-200'>
          Login as Admin
        </h1>
        <form className='mt-5 space-y-5'>
          <TextField
            name='email'
            label='Email'
            variant='outlined'
            sx={{ width: "100%" }}
          />
          <TextField
            name='password'
            label='Password'
            variant='outlined'
            type='password'
            sx={{ width: "100%" }}
          />

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Remember me'
          />

          <div className='mt-10'>
            <Button
              color='primary'
              sx={{
                width: "100%",
                paddingBlock: "0.8rem",
              }}
              variant='contained'
            >
              Login
            </Button>
          </div>
        </form>

        <div className='mt-5 text-center'>
          <p className='text-lg'>
            Don't have an account?{" "}
            <Link to={"/auth/signup"}>
              <MaterialLink>Signup</MaterialLink>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
