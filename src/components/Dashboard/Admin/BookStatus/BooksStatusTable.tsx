import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { booksList } from "@/_data/booksList";

type Book = {
  id: number;
  bookNo: string;
  owner: {
    name: string;
    imageUrl: string;
  };
  status: boolean;
  price: number;
};

const data: Book[] = booksList;

const BooksStatusTable = () => {
  const columns = useMemo<MRT_ColumnDef<Book>[]>(
    () => [
      {
        accessorKey: "bookNo",
        header: "Book no.",
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
        size: 100,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 100,
        Cell: ({ cell }) => `${cell.getValue<string>()} Birr`,
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
    <div className='w-full grid overflow-auto'>
      <MaterialReactTable table={table} />
    </div>
  );
};

export default BooksStatusTable;
