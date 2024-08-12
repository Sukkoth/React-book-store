import {
  Button,
  FormControl,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import { CloudUpload } from "@mui/icons-material";
import { useState } from "react";
import BookAddModal from "./BookAddModal";
import SelectBook from "./SelectBook";
import SuccessModal from "./SuccessModal";
import { useForm } from "react-hook-form";
import { addBookForRent, AddRentBookSchema } from "@/schemas/owner";
import { zodResolver } from "@hookform/resolvers/zod";
import supabase from "@/services/supabase";
import { useAddRentBook } from "@/queries/mutations";
import toast from "react-hot-toast";

function Books() {
  const [formKey, setFormKey] = useState(0);
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [uploading, setUploading] = useState(false); //for file

  const handleUploadBookRent = useAddRentBook();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset: resetForm,
    setError,
    formState: { errors },
  } = useForm<AddRentBookSchema>({
    resolver: zodResolver(addBookForRent),
  });

  async function submitForm(data: AddRentBookSchema) {
    console.log("submit", data);

    await handleUploadBookRent.mutateAsync(data, {
      onSuccess: () => {
        setSuccessModal(true);
      },
      onError: () => {
        toast.error("Error adding book");
      },
    });
  }

  function handleBookIdSelection(bookId: number) {
    setValue("bookId", bookId);
    setError("bookId", {});
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    setUploading(true);

    const { data, error } = await supabase.storage
      .from("bookCovers")
      .upload(`images/${file.name}${new Date().getTime().toString()}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (!error && data?.fullPath) {
      setError("cover", {});
      setValue(
        "cover",
        `https://qpjorflomehnjrwdoopa.supabase.co/storage/v1/object/public/${data?.fullPath}`
      );
    }
    setUploading(false);
  };

  return (
    <div className='bg-white w-full p-5 flex flex-col items-center  rounded-xl shadow-lg shadow-gray-100 pt-10 h-full overflow-y-auto'>
      <Typography sx={{ fontSize: "22px" }}>Upload New Book</Typography>
      <form
        className='flex flex-col items-center w-full md:[65%]  lg:w-[50%] max-w-[40rem]'
        onSubmit={handleSubmit(submitForm)}
        key={formKey}
      >
        <FormControl
          size='medium'
          variant='filled'
          sx={{
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <SelectBook
            openAddModal={() => setAddBookModalOpen(true)}
            handleBookIdSelection={handleBookIdSelection}
            formErrors={errors?.bookId?.message}
          />
        </FormControl>
        <div className='w-full mt-10 gap-10 flex flex-col md:flex-row'>
          <TextField
            type='number'
            label='Book Quantity'
            fullWidth
            {...register("quantity")}
            error={!!errors?.quantity}
            helperText={errors?.quantity?.message}
          />
          <TextField
            fullWidth
            type='number'
            label='Rent price for 2 weeks'
            {...register("price")}
            error={!!errors?.price}
            helperText={errors?.price?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              ),
            }}
          />
        </div>
        <FormControl>
          <Button
            sx={{
              marginTop: "2rem",
            }}
            component='label'
            role={undefined}
            variant='contained'
            color={errors.cover?.message ? "error" : "primary"}
            tabIndex={-1}
            startIcon={<CloudUpload />}
            size='large'
            disabled={!!getValues("cover")}
          >
            {!!getValues("cover")
              ? "Cover image uploaded"
              : uploading
              ? "Uploading cover . . ."
              : "Upload Book Cover"}
            <VisuallyHiddenInput type='file' onChange={handleFileChange} />
          </Button>
          <Typography
            color={errors.cover?.message && !uploading ? "red" : "black"}
            fontSize={14}
            paddingTop={0.5}
          >
            {errors.cover?.message && "Cover image is required"}
          </Typography>
        </FormControl>

        <Button
          type='submit'
          size='large'
          variant='contained'
          sx={{
            marginTop: "2rem",
            width: "20rem",
            paddingBlock: "1rem",
            display: "block",
          }}
        >
          {handleUploadBookRent.isPending ? "Uploading book . . ." : "Submit"}
        </Button>
      </form>

      <BookAddModal
        open={addBookModalOpen}
        onClose={() => setAddBookModalOpen(false)}
      />
      <SuccessModal
        open={successModal}
        onClose={() => {
          setFormKey((prev) => prev + 1); //reset the selec
          resetForm();
          setSuccessModal(false);
        }}
      />
    </div>
  );
}

export default Books;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
