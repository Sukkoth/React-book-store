import { useApproveRentBook } from "@/queries/mutations";
import { Category, GetBooksRentResponse } from "@/Types/types";
import axios from "@/utils/axios";
import { Refresh } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Switch,
  TableContainer,
  Tooltip,
} from "@mui/material";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

type Book = {
  id: number;
  author: string;
  bookName: string;
  owner: {
    name: string;
    imageUrl: string;
  };
  category: string;
  status: string;
  approved: boolean;
};
const BooksTable = () => {
  const queryClient = useQueryClient();

  const categories = queryClient.getQueryData(["categories"]) as Category[];
  const categoriesList = categories.map((item) =>
    item.name.toLocaleLowerCase()
  );
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handleApproveBook = useApproveRentBook();
  const { data, isError, isRefetching, isLoading, refetch } =
    useQuery<GetBooksRentResponse>({
      queryKey: [
        "admin-books-table",
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
          approved?: string;
        } = {};

        columnFilters.forEach((col) => {
          params[col.id as keyof typeof params] = col.value as string;
        });

        const json = await axios.get<GetBooksRentResponse>(`/admins/books`, {
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
            approved:
              params.approved === "Active"
                ? true
                : params.approved === "Inactive"
                ? false
                : undefined,

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
        });
        return json.data;
      },
      placeholderData: keepPreviousData,
    });

  // const fetchBooks = useGetBooksRentList({ forAdmin: true });

  const parsedData = data
    ? data?.books?.map((bookItem) => {
        return {
          id: bookItem.id,
          author: bookItem.bookInfo!.authorName,
          bookName: bookItem.bookInfo!.name,
          owner: {
            name: bookItem.owner!.firstName + " " + bookItem.owner!.lastName,
            imageUrl: `https://via.placeholder.com/${bookItem.owner?.id}`,
          },
          category: bookItem.bookInfo!.category!.name,
          status: bookItem.status,
          approved: bookItem.approved,
        } as Book;
      })
    : [];

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
        filterVariant: "select",
        filterSelectOptions: categoriesList,
        size: 100,
      },
      {
        accessorKey: "bookName",
        header: "Book Name",
        size: 100,
      },
      {
        accessorKey: "approved",
        header: "Approved",
        Cell: ({ cell, row }) => {
          const approved = cell.getValue<boolean>();
          console.log("APPROVED", approved);

          return (
            <div
              className={`grid grid-cols-2 justify-start items-center w-36 px-3 py-1 rounded-2xl gap-5 ${
                !approved
                  ? "bg-red-200 text-red-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              <p className='flex flex-col mx-3'>
                {approved ? "Active" : "Inactive"}
              </p>
              <Switch
                defaultChecked={approved}
                onChange={() => {
                  handleApproveBook.mutateAsync(
                    {
                      bookId: row.original!.id,
                      approved: approved ? "false" : "true",
                    },
                    {
                      onSuccess: () => {
                        toast.success("Approved Status Changed");

                        refetch();
                      },
                      onError: () => {
                        toast.error("Could not change approved status");
                      },
                    }
                  );
                }}
                color='success'
                size='small'
              />
            </div>
          );
        },
        filterVariant: "select",
        filterSelectOptions: ["Active", "Inactive"],
        size: 100,
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
