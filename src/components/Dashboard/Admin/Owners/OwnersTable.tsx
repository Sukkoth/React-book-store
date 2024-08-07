import { bookOwners } from "@/_data/booksList";
import { Delete, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Input,
  Paper,
  Switch,
  TableContainer,
} from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo, useState } from "react";
import ViewModal from "./ViewModal";

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
  const [viewOwnerData, setViewOwnerData] = useState<null | BookOwner>(null);
  const handleSetViewOwnerData = (owner: BookOwner) => setViewOwnerData(owner);
  const handleCloseModal = () => setViewOwnerData(null);

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
            className={`grid lg:grid-cols-2 text-end items-center w-fit px-4 rounded-xl ${
              cell.getValue()
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            <span className='hidden lg:block'>
              {cell.getValue() ? "Active" : "Inactive"}
            </span>
            <Switch defaultChecked={cell.getValue<boolean>()} color='success' />
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
