import { Delete, Refresh, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import { Can, useAbility } from "@/Providers/AbilityProvider";
import { useApproveOwner, useDeleteOwner } from "@/queries/mutations";
import toast from "react-hot-toast";
import { useAuth } from "@/Providers/AuthProvider";

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

const OwnersTable = () => {
  const { user } = useAuth();
  const userAbility = useAbility();
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [dialogOpen, setDialogOpen] = useState<number | null>(null);

  const [viewOwnerData, setViewOwnerData] = useState<null | BookOwner>(null);
  const handleSetViewOwnerData = (owner: BookOwner) => setViewOwnerData(owner);
  const handleCloseModal = () => setViewOwnerData(null);

  const handleDeleteBook = useDeleteOwner();
  const handleApproveOwner = useApproveOwner();

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
            status:
              params.status === "Active"
                ? "active"
                : params.status === "Inactive"
                ? "inactive"
                : undefined,
            location: params.location,

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
          status: owner.status === "active" ? true : false,
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
        Edit: ({ cell }) => {
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
        Cell: ({ cell, row }) => {
          return (
            <span
              className={`grid grid-cols-2 text-end items-center w-36 px-3 py-1 rounded-2xl ${
                cell.getValue()
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              <span>{cell.getValue() ? "Active" : "Inactive"}</span>
              <Switch
                disabled={userAbility.cannot("manage", "Owners")}
                defaultChecked={cell.getValue<boolean>()}
                color='success'
                size='small'
                onChange={() => {
                  handleApproveOwner.mutateAsync(
                    {
                      ownerId: row.original.id,
                      status: cell.getValue() ? "inactive" : "active",
                    },
                    {
                      onSuccess: () => {
                        toast.success("Owner approved");
                        refetch();
                      },
                      onError: () => {
                        toast.error("Could not approve owner");
                      },
                    }
                  );
                }}
              />
            </span>
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
          <Can I='manage' an='Owners'>
            <IconButton onClick={() => setDialogOpen(bookOwner.id)}>
              <Delete color='warning' />
            </IconButton>

            <Button
              disableElevation
              variant='contained'
              onClick={() => {
                handleApproveOwner.mutateAsync(
                  {
                    ownerId: bookOwner.id,
                    approved: row.getValue<ownerType>("owner").approved
                      ? "false"
                      : "true",
                  },
                  {
                    onSuccess: () => {
                      toast.success("Owner approved");
                      refetch();
                    },
                    onError: () => {
                      toast.error("Could not approve owner");
                    },
                  }
                );
              }}
              color={
                row.getValue<ownerType>("owner").approved
                  ? "primary"
                  : "inherit"
              }
              sx={{
                marginLeft: "6rem",
              }}
            >
              {row.getValue<ownerType>("owner").approved
                ? "Approved"
                : "Approve"}
            </Button>
          </Can>
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

        {/* Dialog to delete */}

        <Dialog
          open={!!dialogOpen}
          onClose={() => setDialogOpen(null)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>Delete Book</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              <div className='w-[30rem]'>
                {handleDeleteBook.isPending
                  ? "Deleting Book Owner . . ."
                  : "Are you sure you want to delete this book owner?"}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={handleDeleteBook.isPending}
              onClick={() => setDialogOpen(null)}
            >
              Cancel
            </Button>
            <Button
              color='error'
              disabled={handleDeleteBook.isPending}
              onClick={() => {
                handleDeleteBook.mutateAsync(
                  { ownerId: dialogOpen! },
                  {
                    onSuccess: () => {
                      toast.success("Owner Deleted");
                      refetch();
                      setDialogOpen(null);
                    },
                    onError: () => {
                      toast.error("Could not delete owner");
                    },
                  }
                );
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        {/* view all info in table */}
        <MaterialReactTable table={table} />
      </TableContainer>
    </Paper>
  );
};

export default OwnersTable;
