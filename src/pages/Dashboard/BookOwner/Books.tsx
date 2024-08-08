import {
  Button,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";

import { CloudUpload } from "@mui/icons-material";
import { useState } from "react";
import BookAddModal from "./BookAddModal";
import SuccessModal from "./SuccessModal";

function Books() {
  const [value, selectValue] = useState("");
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleChange = (event: SelectChangeEvent<string>) => {
    selectValue(event.target.value);
  };

  return (
    <div className='bg-white w-full p-5 flex flex-col items-center  rounded-xl shadow-lg shadow-gray-100 pt-10 h-full overflow-y-auto'>
      <Typography sx={{ fontSize: "22px" }}>Upload New Book</Typography>
      <div className='flex flex-col items-center w-full md:[65%]  lg:w-[50%] max-w-[40rem]'>
        <FormControl
          size='medium'
          variant='filled'
          sx={{
            width: "100%",
            marginTop: "1rem",
          }}
        >
          <InputLabel id='select-book'>
            Search Book by name or Author
          </InputLabel>
          <Select
            placeholder='Search . . .'
            labelId='select-book'
            id='select-book'
            value={value}
            label='Label'
            onChange={handleChange}
          >
            <MenuItem value={10}>Book 1</MenuItem>
            <MenuItem value={20}>Book 2</MenuItem>
            <MenuItem value={30}>Book 3</MenuItem>
            <Divider />
            <Button
              onClick={() => setAddBookModalOpen(true)}
              sx={{
                width: "100%",
                paddingInline: "1rem",
              }}
            >
              Add
            </Button>
          </Select>
        </FormControl>
        <div className='w-full mt-10 gap-10 flex flex-col md:flex-row'>
          <TextField type='number' label='Book Quantity' fullWidth />
          <TextField
            fullWidth
            type='number'
            label='Rent price for 2 weeks'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>$</InputAdornment>
              ),
            }}
          />
        </div>
        <Button
          sx={{
            marginTop: "2rem",
          }}
          component='label'
          role={undefined}
          variant='text'
          tabIndex={-1}
          startIcon={<CloudUpload />}
          size='large'
        >
          Upload Book Cover
          <VisuallyHiddenInput type='file' />
        </Button>

        <Button
          size='large'
          variant='contained'
          sx={{
            marginTop: "2rem",
            width: "20rem",
            paddingBlock: "1rem",
            display: "block",
          }}
          onClick={() => setSuccessModal(true)}
        >
          Submit
        </Button>
      </div>

      <BookAddModal
        open={addBookModalOpen}
        onClose={() => setAddBookModalOpen(false)}
      />
      <SuccessModal
        open={successModal}
        onClose={() => setSuccessModal(false)}
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
