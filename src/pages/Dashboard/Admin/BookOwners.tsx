import OwnersTable from "@/components/Dashboard/Admin/Owners/OwnersTable";
import { Typography } from "@mui/material";

function BookOwners() {
  return (
    <div className='bg-white w-full p-5 rounded-xl shadow-lg shadow-gray-100 pt-10 h-full overflow-auto'>
      <Typography
        sx={{
          fontWeight: "500",
        }}
      >
        List of owners
      </Typography>
      <OwnersTable />
    </div>
  );
}

export default BookOwners;
