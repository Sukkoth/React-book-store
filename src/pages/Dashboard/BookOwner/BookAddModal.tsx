import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
};
function BookAddModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
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
        <FormControl sx={{ width: "100%" }}>
          <TextField label='Book Name' sx={{ marginBlock: "0.5rem" }} />
          <TextField label='Author Name' sx={{ marginBlock: "0.5rem" }} />
          <Box sx={{ marginBlock: "0.5rem" }}>
            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Age</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                //   value={age}
                label='Age'
                //   onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant='contained'
            sx={{ marginBlock: "1rem", paddingBlock: "1rem" }}
          >
            Add
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
}

export default BookAddModal;
