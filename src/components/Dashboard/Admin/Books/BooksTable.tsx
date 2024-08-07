import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { booksListAdmin } from "@/_data/booksList";
import { Paper, Switch, TableContainer } from "@mui/material";

type Book = {
  author: string;
  bookName: string;
  owner: {
    name: string;
    imageUrl: string;
  };
  category: string;
  status: boolean;
};

const data: Book[] = booksListAdmin;

const BooksTable = () => {
  const columns = useMemo<MRT_ColumnDef<Book>[]>(
    () => [
      {
        accessorKey: "author",
        header: "Author",
        size: 100,
      },
      {
        accessorKey: "owner",
        header: "Owner",
        size: 100,
        Cell: ({ cell }) => {
          const cellData = cell.getValue<{
            name: string;
            imageUrl: string;
          }>();
          return (
            <div className='flex gap-3 items-center'>
              <img
                src={cellData.imageUrl}
                alt=''
                className='size-8 rounded-full'
              />
              <p>{cellData.name}</p>
            </div>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 100,
      },
      {
        accessorKey: "bookName",
        header: "Book Name",
        size: 100,
      },
      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (
          <span
            className={`grid grid-cols-2 text-end items-center w-36 px-3 py-1 rounded-2xl ${
              cell.getValue()
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            <span>{cell.getValue() ? "Active" : "Inactive"}</span>
            <Switch
              defaultChecked={cell.getValue<boolean>()}
              color='success'
              size='small'
            />
          </span>
        ),
        size: 100,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableRowNumbers: true,
    columns,
    data,
  });

  return (
    <Paper
      sx={{
        height: "72dvh",
        overflowX: "auto",
        display: "grid",
        boxShadow: "none",
        padding: "10px",
      }}
    >
      <TableContainer component={Paper} elevation={0}>
        <MaterialReactTable table={table} />
      </TableContainer>
    </Paper>
  );
};

export default BooksTable;
