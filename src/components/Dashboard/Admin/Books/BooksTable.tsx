import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Paper, Switch, TableContainer } from "@mui/material";
import { useGetBooksRentList } from "@/queries/queries";
import MainFallback from "@/Fallbacks/MainFallback";
import { useQueryClient } from "@tanstack/react-query";

type Book = {
  author: string;
  bookName: string;
  owner: {
    name: string;
    imageUrl: string;
  };
  category: number;
  status: string;
};

// const data: Book[] = booksListAdmin;

const BooksTable = () => {
  const fetchBooks = useGetBooksRentList({ forAdmin: true });
  // const categories = useQueryClient().getQueryData(["categories"]);
  console.log("here");
  // console.log(categories);

  const data = fetchBooks.data?.map((bookItem) => {
    return {
      author: bookItem.bookInfo!.authorName,
      bookName: bookItem.bookInfo!.name,
      owner: {
        name: bookItem.owner!.firstName + " " + bookItem.owner!.lastName,
        imageUrl: "https://via.placeholder.com/180",
      },
      category: bookItem.bookInfo!.categoryId,
      status: bookItem.status,
    } as Book;
  });

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
              cell.getValue() === "unapproved"
                ? "bg-red-200 text-red-800"
                : "bg-green-200 text-green-800"
            }`}
          >
            <span>
              {cell.getValue() === "unapproved" ? "InActive" : "Aactive"}
            </span>
            <Switch
              defaultChecked={cell.getValue<string>() !== "unapproved"}
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
    data: data || [],
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
      {fetchBooks.isPending ? (
        <MainFallback />
      ) : (
        <TableContainer component={Paper} elevation={0}>
          <MaterialReactTable table={table} />
        </TableContainer>
      )}
    </Paper>
  );
};

export default BooksTable;
