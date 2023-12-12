import { Flex, Image, Switch, Text, Tooltip } from "@mantine/core";
import ActionIcons from "../../../components/general/ActionIcons";

export const Columns = (setOpen, setEditData) => [
  {
    name: "Sr. No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Drop Name",
    selector: (row) => row.dropName,
    grow: 1,
    sortable: true,
  },
  {
    name: "Drop Coins",
    selector: (row) => row.dropCoins,
    grow: 1,
    sortable: true,
  },
  {
    name: "Drop Type",
    selector: (row) => row.dropType,
    grow: 1,
    sortable: true,
  },
  {
    name: "Park Name",
    selector: (row) => row.park?.name,
    grow: 1,
    sortable: true,
  },
  {
    name: "Expiry Date",
    selector: (row) => row.expirationDate,
    width: "15  0px",
    sortable: true,
    cell: (row) => (
      <Text>{new Date(row.expirationDate).toLocaleDateString()}</Text>
    ),
  },
  {
    name: "Expiry Time",
    selector: (row) => row.expirationTime,
    grow: 1,
    sortable: true,
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => <ActionIcons rowData={row} del={true} type="drops" blocked={row.claimedBy}/>,
  },
];
