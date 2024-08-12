import { Link, useNavigate } from "react-router-dom";
import BookRentAuthHeader from "../../../components/Auth/BookRentAuthHeader";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "@/Providers/AuthProvider";
import { useLogin } from "@/queries/mutations";
import { AxiosError } from "axios";

function Admin() {
  const navigate = useNavigate();
  const { handleSetToken, handleSetUser } = useAuth();
  const login = useLogin();

  async function handleLogin() {
    try {
      await login.mutateAsync(
        {
          email: "suukootj@gmail.com",
          password: "password",
          userType: "admin",
        },
        {
          onSuccess: (data) => {
            handleSetToken(data.token);
            handleSetUser(data.user, data.userType as "admin" | "owner" | null);
          },
          onError: (error) => {
            const errorData = error.response?.data as {
              code: number;
              message: string;
            };
            console.log("Error", errorData.message);
          },
        }
      );

      navigate("/dashboard/admin");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-[80%] sm:w-[70%] mx-auto'>
        <BookRentAuthHeader />
        <h1 className='mt-5 md:mt-10 text-center md:text-start text-2xl md:text-4xl pb-1 border-b border-b-gray-200'>
          Login as Admin
        </h1>
        <Typography color='red' fontSize={15} marginTop={1}>
          {login.error?.response?.data?.message}
        </Typography>
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
              disabled={login.isPending}
              onClick={handleLogin}
              color={"primary"}
              sx={{
                width: "100%",
                paddingBlock: "0.8rem",
              }}
              variant='contained'
            >
              {login.isPending ? "Loging in . . . " : "Log in"}
            </Button>
          </div>
        </form>

        <div className='mt-5 text-center'>
          <p className='text-lg'>
            Don't have an account? <Link to={"/auth/signup"}>Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Admin;
