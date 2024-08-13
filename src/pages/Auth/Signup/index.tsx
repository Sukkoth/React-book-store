import { Link, useNavigate } from "react-router-dom";
import BookRentAuthHeader from "../../../components/Auth/BookRentAuthHeader";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useSignup } from "@/queries/mutations";
import { useAuth } from "@/Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, signupValidation } from "@/schemas/auth";
import parseServerFormError from "@/utils/parseServerFormError";
import getErrorMessage from "@/utils/getErrorMessage";

function Signup() {
  const navigate = useNavigate();
  const { handleSetToken, handleSetUser } = useAuth();
  const signupUser = useSignup();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: formErrors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupValidation),
  });

  async function submitForm(data: SignupSchema) {
    await signupUser.mutateAsync(
      { ...data, userType: "owner" },
      {
        onSuccess: (data) => {
          handleSetToken(data.token);
          handleSetUser(data.user, data.userType as "admin" | "owner" | null);
          navigate("/dashboard/owner"); //
        },
        onError: (error) => {
          if (error.response?.status === 422) {
            const parsedErrors = parseServerFormError(error);
            if (parsedErrors) {
              parsedErrors.forEach((errorItem) =>
                setError(`${errorItem.fieldName as keyof SignupSchema}`, {
                  message: errorItem.message,
                })
              );
            }
          }
        },
      }
    );
  }

  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-[80%] sm:w-[70%] mx-auto'>
        <BookRentAuthHeader />
        <h1 className='mt-5 md:mt-10 text-center md:text-start text-2xl md:text-4xl pb-1 border-b border-b-gray-200'>
          Signup into Book Rent
        </h1>
        <Typography color='red' fontSize={15} marginTop={1}>
          {signupUser.isError && getErrorMessage(signupUser.error)}
        </Typography>
        <form className='mt-5 space-y-5' onSubmit={handleSubmit(submitForm)}>
          <TextField
            label='First Name'
            variant='outlined'
            sx={{ width: "100%" }}
            {...register("firstName")}
            error={!!formErrors.firstName}
            helperText={formErrors.firstName?.message}
          />
          <TextField
            label='Last Name'
            variant='outlined'
            sx={{ width: "100%" }}
            {...register("lastName")}
            error={!!formErrors.lastName}
            helperText={formErrors.lastName?.message}
          />
          <TextField
            {...register("email")}
            label='Email'
            variant='outlined'
            sx={{ width: "100%" }}
            error={!!formErrors.email}
            helperText={formErrors.email?.message}
          />
          <TextField
            {...register("password")}
            label='Password'
            variant='outlined'
            type='password'
            sx={{ width: "100%" }}
            error={!!formErrors.password}
            helperText={formErrors.password?.message}
          />
          <TextField
            {...register("confirmPassword")}
            label='Confirm Password'
            variant='outlined'
            type='password'
            sx={{ width: "100%" }}
            error={!!formErrors.confirmPassword}
            helperText={formErrors.confirmPassword?.message}
          />
          <TextField
            {...register("location")}
            label='Location'
            variant='outlined'
            sx={{ width: "100%" }}
            error={!!formErrors.location}
            helperText={formErrors.location?.message}
          />
          <TextField
            {...register("phone")}
            label='Phone'
            variant='outlined'
            type='phone'
            sx={{ width: "100%" }}
            error={!!formErrors.phone}
            helperText={formErrors.phone?.message}
          />

          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                {...register("acceptTerms")}
                // error={!!formErrors.acceptTerms}
                // helperText={formErrors.acceptTerms?.message}
              />
            }
            label=' I accept the Terms and Conditions'
          />

          <div className='mt-10'>
            <Button
              disabled={signupUser.isPending}
              type='submit'
              color={"primary"}
              sx={{
                width: "100%",
                paddingBlock: "0.8rem",
              }}
              variant='contained'
            >
              {signupUser.isPending ? "Registering . . . " : "Sign up"}
            </Button>
          </div>
        </form>

        <div className='mt-5 text-center'>
          <p className='text-lg'>
            Already have an account?{" "}
            <Link
              className='text-picton-400 underline font-medium ps-1'
              to={"/auth/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
