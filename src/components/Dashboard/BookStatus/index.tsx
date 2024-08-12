import { Paper, TableContainer, Typography } from "@mui/material";
import BooksStatusTable from "./BooksStatusTable";

function BookStatus() {
  return (
    <Paper
      sx={{
        height: "30rem",
        overflowX: "auto",
        display: "grid",
        boxShadow: "none",
        padding: "10px",
      }}
    >
      <TableContainer component={Paper} elevation={0}>
        <Typography
          sx={{
            fontWeight: "500",
          }}
        >
          Live Book Status
        </Typography>
        <BooksStatusTable />
      </TableContainer>
    </Paper>
  );
}

export default BookStatus;
