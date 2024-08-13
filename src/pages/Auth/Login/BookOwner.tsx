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
import { LoginSchema, loginValidation } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import getErrorMessage from "@/utils/getErrorMessage";

function BookOwner() {
  const navigate = useNavigate();
  const { handleSetToken, handleSetUser } = useAuth();
  const loginUser = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm<{
    email: string;
    password: string;
    userType: "admin" | "owner";
  }>({
    resolver: zodResolver(loginValidation),
  });

  async function submitForm(data: LoginSchema) {
    await loginUser.mutateAsync(
      {
        email: data.email,
        password: data.password,
        userType: "owner",
      },
      {
        onSuccess: (data) => {
          handleSetToken(data.token);
          handleSetUser(data.user, data.userType as "admin" | "owner" | null);
          navigate("/dashboard/owner");
        },
      }
    );
  }
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-[80%] sm:w-[70%] mx-auto'>
        <BookRentAuthHeader />
        <h1 className='mt-5 md:mt-10 text-center md:text-start text-2xl md:text-4xl pb-1 border-b border-b-gray-200'>
          Login as Book Owner
        </h1>
        <Typography color='red' fontSize={15} marginTop={1}>
          {loginUser.isError && getErrorMessage(loginUser.error)}
        </Typography>
        <form className='mt-5 space-y-5' onSubmit={handleSubmit(submitForm)}>
          <TextField
            label='Email'
            variant='outlined'
            sx={{ width: "100%" }}
            {...register("email")}
            error={!!formErrors.email}
            helperText={formErrors.email?.message}
          />
          <TextField
            label='Password'
            variant='outlined'
            type='password'
            sx={{ width: "100%" }}
            {...register("password")}
            error={!!formErrors.password}
            helperText={formErrors.password?.message}
          />

          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Remember me'
          />

          <div className='mt-10'>
            <Button
              disabled={loginUser.isPending}
              type='submit'
              color={"primary"}
              sx={{
                width: "100%",
                paddingBlock: "0.8rem",
              }}
              variant='contained'
            >
              {loginUser.isPending ? "Loging in . . . " : "Log in"}
            </Button>
          </div>
        </form>

        <div className='mt-5 text-center'>
          <p className='text-lg'>
            Don't have an account?
            <Link
              className='text-picton-400 underline font-medium ps-1'
              to={"/auth/signup"}
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookOwner;
