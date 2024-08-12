import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { booksList } from "@/_data/booksList";
import { useGetBooksRentList } from "@/queries/queries";
import MainFallback from "@/Fallbacks/MainFallback";
import { Box, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useAbility } from "@/Providers/AbilityProvider";

type Book = {
  id: number;
  name?: string;
  bookNo: string;
  owner?: {
    name: string;
    imageUrl: string;
  };
  status: boolean;
  price: number;
};

const BooksStatusTable = () => {
  const abilities = useAbility();

  const isEditor = abilities.can("edit", "books");

  const fetchBooks = useGetBooksRentList({ forAdmin: !isEditor });
  const data = fetchBooks.data
    ? fetchBooks.data.map((bookItem) => {
        const b: Book = {
          id: bookItem.id,
          bookNo: `${bookItem.id}`,
          name: bookItem.bookInfo?.name || "DEFAULT BOOK",
          owner: {
            name: bookItem?.owner?.firstName || "",
            imageUrl: "https://via.placeholder.com/180",
          },
          status: bookItem.status === "free" ? true : false,
          price: bookItem.price,
        };
        return b;
      })
    : booksList;

  const columns = useMemo<MRT_ColumnDef<Book>[]>(
    () => [
      {
        accessorKey: "bookNo",
        header: "Book no.",
        size: 30,
        Cell: ({ cell }) => {
          return (
            <p className='bg-gray-200 text-center py-2 rounded-md '>
              BOOK{cell.getValue<string | number>()}
            </p>
          );
        },
      },
      {
        accessorKey: isEditor ? "name" : "owner",
        header: isEditor ? "Book Name" : "Owner",
        size: 220,
        Cell: ({ cell }) => {
          if (isEditor) {
            return <p>{cell.getValue<string>()}</p>;
          } else {
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
          }
        },
      },

      {
        accessorKey: "status",
        header: "Status",
        Cell: ({ cell }) => (
          <div className='flex items-center gap-5'>
            <span
              className={`size-4  rounded-full ring-1 ring-offset-2 ${
                cell.getValue<boolean>()
                  ? "ring-picton-500 bg-picton-500"
                  : "ring-red-500 bg-red-500"
              }`}
            ></span>
            {cell.getValue() ? "Free" : "Rented"}
          </div>
        ),
        size: 220,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 220,
        Cell: ({ cell }) => `${cell.getValue<string>()} Birr`,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    enableRowNumbers: true,
    columns,
    data,
    enableRowActions: isEditor,
    positionActionsColumn: "last",
    renderRowActions: () => {
      return (
        <Box sx={{ display: "flex" }}>
          <IconButton>
            <Edit color='action' />
          </IconButton>
          <IconButton onClick={() => console.info("Delete")}>
            <Delete color='warning' />
          </IconButton>
        </Box>
      );
    },
  });

  return (
    <div className='w-full grid overflow-auto'>
      {fetchBooks.isPending ? (
        <MainFallback />
      ) : (
        <MaterialReactTable table={table} />
      )}
    </div>
  );
};

export default BooksStatusTable;
