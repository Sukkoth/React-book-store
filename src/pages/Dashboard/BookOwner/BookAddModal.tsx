import { Category } from "@/Types/types";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { AddBookSchema, addBookValidation } from "@/schemas/owner";
import { useAddBook } from "@/queries/mutations";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
};
function BookAddModal({ open, onClose }: Props) {
  const queryClient = useQueryClient();
  const categories = queryClient.getQueryData<Category[]>(["categories"]);
  const handleAddBook = useAddBook();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AddBookSchema>({
    resolver: zodResolver(addBookValidation),
  });

  function submitForm(data: AddBookSchema) {
    handleAddBook.mutateAsync(data, {
      onSuccess: () => {
        toast.success("Book Added successfully");
        onClose();
      },
      onError: () => {
        toast.error("Failed to add book");
      },
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='book-add-modal'
      aria-describedby='this modal adds books before you upload them'
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 6,
          borderRadius: "1rem",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            marginBottom: "1rem",
            fontSize: "18px",
          }}
        >
          Add new book
        </Typography>
        <form onSubmit={handleSubmit(submitForm)}>
          <FormControl sx={{ width: "100%" }}>
            <Controller
              name='name'
              control={control}
              rules={{ required: "Book Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Book Name'
                  sx={{ marginBlock: "0.5rem" }}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />

            <Controller
              name='authorName'
              control={control}
              rules={{ required: "Author Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Author Name'
                  sx={{ marginBlock: "0.5rem" }}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : ""}
                />
              )}
            />

            <Box sx={{ marginBlock: "0.5rem" }}>
              <FormControl fullWidth error={!!errors?.categoryId}>
                <InputLabel id='demo-simple-select-label'>Category</InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  label='Category'
                  {...register("categoryId")}
                  error={!!errors?.categoryId}
                >
                  {categories?.map((category) => (
                    <MenuItem key={category.id} value={`${category.id}`}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors?.categoryId && (
                  <FormHelperText>{errors?.categoryId?.message}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Button
              type='submit'
              variant='contained'
              sx={{ marginBlock: "1rem", paddingBlock: "1rem" }}
              disabled={handleAddBook.isPending}
            >
              {handleAddBook.isPending ? "Adding book . . ." : "Add"}
            </Button>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
}

export default BookAddModal;
