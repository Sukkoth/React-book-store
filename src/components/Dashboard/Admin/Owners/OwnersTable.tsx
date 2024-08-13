import { bookOwners } from "@/_data/booksList";
import { Delete, Refresh, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Input,
  Paper,
  Switch,
  TableContainer,
  Tooltip,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  type MRT_ColumnFiltersState,
  type MRT_PaginationState,
  type MRT_SortingState,
} from "material-react-table";
import { useMemo, useState } from "react";
import ViewModal from "./ViewModal";
import { GetOwnersResponse } from "@/Types/types";
import axios from "@/utils/axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import MainFallback from "@/Fallbacks/MainFallback";

export type BookOwner = {
  id: number;
  owner: {
    approved: boolean;
    name: string;
    imageUrl: string;
    phone: string;
    email: string;
  };
  upload: number;
  location: string;
  status: boolean;
};

const data: BookOwner[] = bookOwners;

const OwnersTable = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [viewOwnerData, setViewOwnerData] = useState<null | BookOwner>(null);
  const handleSetViewOwnerData = (owner: BookOwner) => setViewOwnerData(owner);
  const handleCloseModal = () => setViewOwnerData(null);

  const { data, isError, isRefetching, isLoading, refetch } =
    useQuery<GetOwnersResponse>({
      queryKey: [
        "admin-owners-list",
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
          uploads?: string;
          location?: string;
        } = {};

        columnFilters.forEach((col) => {
          params[col.id as keyof typeof params] = col.value as string;
        });

        const json = await axios.get<GetOwnersResponse>(`/admins/owners`, {
          params: {
            ...params,
            pageSize: pagination.pageSize,
            page: pagination.pageIndex + 1,
            // uploads: {
            //   equals: params.uploads || undefined,
            // },
            location: params.location,
            status: params.status,
            sortField: sorting.length
              ? sorting[0].id === "owner"
                ? "name"
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

  const parsedData = data
    ? data.owners.map((owner) => {
        const b: BookOwner = {
          id: owner.id,
          owner: {
            name: owner.firstName + " " + owner.lastName,
            imageUrl: "https://via.placeholder.com/180",
            approved: owner.approved,
            email: owner.email,
            phone: owner.phone,
          },
          upload: owner._count!.books,
          status: owner.status === "free" ? true : false,
          location: owner.location,
        };
        return b;
      })
    : [];

  const columns = useMemo<MRT_ColumnDef<BookOwner>[]>(
    () => [
      {
        accessorKey: "owner",
        header: "Owner",
        size: 100,
        Cell: ({ cell }) => {
          const cellData = cell.getValue<{
            name: string;
            imageUrl: string;
            email: string;
            phone: string;
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
        Edit: ({ cell, column, row, table }) => {
          const cellData = cell.getValue<{
            name: string;
            imageUrl: string;
            email: string;
            phone: string;
          }>();
          return <Input value={cellData.name} />;
        },
      },
      {
        accessorKey: "upload",
        header: "Upload",
        size: 100,
        Cell: ({ cell }) => `${cell.getValue<string>()} Books`,
      },
      {
        accessorKey: "location",
        header: "Location",
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
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ cell, row }) => {
      type ownerType = { approved: boolean; name: string; imageUrl: string };
      const bookOwner = cell.row.original;

      return (
        <Box>
          <IconButton
            onClick={() => {
              handleSetViewOwnerData(bookOwner);
            }}
          >
            <Visibility color='action' />
          </IconButton>
          <IconButton onClick={() => console.info("Delete")}>
            <Delete color='warning' />
          </IconButton>
          <Button
            disableElevation
            variant='contained'
            color={
              row.getValue<ownerType>("owner").approved ? "primary" : "inherit"
            }
            sx={{
              marginLeft: "6rem",
            }}
          >
            {row.getValue<ownerType>("owner").approved ? "Approved" : "Approve"}
          </Button>
        </Box>
      );
    },
  });

  return (
    <Paper
      sx={{
        height: "75dvh",
        overflowX: "auto",
        display: "grid",
        boxShadow: "none",
        padding: "10px",
      }}
    >
      <TableContainer component={Paper} elevation={0}>
        {/* View details in modal */}
        {Boolean(viewOwnerData) && (
          <ViewModal
            handleCloseModal={handleCloseModal}
            bookOwner={viewOwnerData!}
          />
        )}
        {/* view all info in table */}
        <MaterialReactTable table={table} />
      </TableContainer>
    </Paper>
  );
};

export default OwnersTable;
