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
    name: "Account No.",
    selector: (row) => row.AccountNumber,
    sortable: true,
    center: true,
    width: "170px",
    cell: (row) => <Text>{row?.AccountNumber || "N/A"}</Text>,
  },
  {
    name: "BSB",
    selector: (row) => row?.BSB,
    sortable: true,
    center: true,
    width: "150px",
    cell: (row) => <Text>{row?.BSB || "N/A"}</Text>,
  },
  {
    name: "Total Coins",
    selector: (row) => row.TotalCoin,
    sortable: true,
    center: true,
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
    name: "Premium User",
    selector: (row) => row.PurchasePackage,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <Text>{row.PurchasePackage ? "Yes" : "No"}</Text>,
  },
  {
    name: "Status",
    selector: (row) => row.IsActive,
    center: true,
    width: "200px",
    cell: (row) => (
      <Badge bg={row.IsActive ? "green" : "red"}>
        {row.IsActive ? "Active" : "Inactive"}
      </Badge>
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
