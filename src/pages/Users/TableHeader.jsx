import { ActionIcon, Badge, Switch, Text, Tooltip } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";
import AddUserModal from "./AddUserModal";
import Button from "../../components/general/Button";
import { Cross, Delete, X } from "lucide-react";

export const Columns = (onHandleStatus, advanced = false) => [
  {
    name: "Full Name",
    selector: (row) => row.FullName,
    width: "200px",
    sortable: true,
  },
  {
    name: "Email",
    selector: (row) => row.Email,
    sortable: true,
    // center: true,
    width: "230px",
  },
  {
    name: "Total Coins",
    selector: (row) => row.TotalCoin,
    sortable: true,
    // center: true,
    width: "160px",
  },
  {
    name: "Registration",
    selector: (row) => row.CreationTimestamp,
    sortable: true,
    center: true,
    width: "140px",
    cell: (row) => (
      <Text>{new Date(row.CreationTimestamp).toLocaleDateString()}</Text>
    ),
  },
  {
    name: "Status",
    selector: (row) => row.IsActive,
    center: true,
    width: "200px",
    cell: (row) => (
      <Badge bg={row.IsActive?"green":'red'}>{row.IsActive ? "Active" : "Inactive"}</Badge>
    ),
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => (
      <>
        <ActionIcons
          rowData={row}
          edit={<AddUserModal edit={true} data={row} />}
          del={true}
          suspend={true}
          type="Users"
        />
      </>
    ),
  },
];
