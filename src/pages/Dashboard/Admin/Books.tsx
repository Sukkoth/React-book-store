import BooksTable from "@/components/Dashboard/Admin/Books/BooksTable";
import { Typography } from "@mui/material";

function Books() {
  return (
    <div className='bg-white w-full p-5 rounded-xl shadow-lg shadow-gray-100 pt-10 h-full overflow-scroll'>
      <Typography
        sx={{
          fontWeight: "500",
        }}
      >
        Live Book Status
      </Typography>
      <BooksTable />
    </div>
  );
}

export default Books;
