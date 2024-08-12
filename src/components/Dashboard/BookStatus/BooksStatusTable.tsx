import { booksList } from "@/_data/booksList";
import MainFallback from "@/Fallbacks/MainFallback";
import { useAbility } from "@/Providers/AbilityProvider";
import { GetBooksRentResponse } from "@/Types/types";
import axios from "@/utils/axios";
import { Delete, Edit, Refresh } from "@mui/icons-material";
import { Box, IconButton, Tooltip } from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { useMemo, useState } from "react";

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
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isError, isRefetching, isLoading, refetch } =
    useQuery<GetBooksRentResponse>({
      queryKey: [
        "table-data",
        columnFilters, //refetch when columnFilters changes
        globalFilter, //refetch when globalFilter changes
        pagination.pageIndex, //refetch when pagination.pageIndex changes
        pagination.pageSize, //refetch when pagination.pageSize changes
        sorting, //refetch when sorting changes
      ],
      queryFn: async () => {
        const params: {
          pageSize?: string;
          bookNo?: string;
          status?: string;
          price?: string;
          bookName?: string;
        } = {};

        columnFilters.forEach((col) => {
          params[col.id as keyof typeof params] = col.value as string;
        });

        const json = await axios.get<GetBooksRentResponse>(
          `/${isEditor ? "owners" : "admins"}/books`,
          {
            params: {
              ...params,
              pageSize: pagination.pageSize,
              page: pagination.pageIndex + 1,
              price: {
                equals: params.price || undefined,
              },
              bookNo: {
                equals: params.bookNo || undefined,
              },
              sortField: sorting.length
                ? sorting[0].id === "name"
                  ? "bookName"
                  : sorting[0].id
                : undefined,
              sortOrder: sorting.length
                ? sorting[0].desc
                  ? "desc"
                  : "asc"
                : undefined,
            },
          }
        );
        return json.data;
      },
      placeholderData: keepPreviousData,
    });

  const abilities = useAbility();

  const isEditor = abilities.can("edit", "books");

  const parsedData = data
    ? data.books.map((bookItem) => {
        const b: Book = {
          id: bookItem.id,
          bookNo: `${bookItem.bookId}`,
          name: bookItem.bookInfo?.name || "DEFAULT BOOK",
          owner: {
            name:
              bookItem?.owner?.firstName + " " + bookItem?.owner?.lastName ||
              "",
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
    columns,
    data: parsedData,
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    rowCount: data?.pagination.totalCount as number,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderTopToolbarCustomActions: () => (
      <Tooltip arrow title='Refresh Data'>
        <IconButton onClick={() => refetch()}>
          <Refresh />
        </IconButton>
      </Tooltip>
    ),
    pageCount: data?.pagination.totalPages,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
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
      {isLoading ? <MainFallback /> : <MaterialReactTable table={table} />}
    </div>
  );
};

export default BooksStatusTable;
