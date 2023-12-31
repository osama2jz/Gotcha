import { Text } from "@mantine/core";
import Button from "../../components/general/Button";
import Settle from "./Settle";

export const Columns = [
  {
    name: "Sponsor",
    selector: (row) => row.OfferedBy?.BusinessName,
    width: "200px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.Name,
    width: "200px",
    sortable: true,
  },
  {
    name: "Claimed By",
    selector: (row) => row.ClaimedBy?.FullName,
    sortable: true,
    // center: true,
    width: "200px",
    cell: (row) => (
      <Text>
        {row.ClaimedBy?.FullName +
          " | " +
          row.ClaimedBy?.Email +
          " | " +
          row.ClaimedBy?.AccountNumber +
          " | " +
          row.ClaimedBy?.BSB}
      </Text>
    ),
  },
  {
    name: "Value",
    selector: (row) => row.Value,
    sortable: true,
    // center: true,
    width: "150px",
  },
  {
    name: "Date",
    selector: (row) => row.CreationTimestamp,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => (
      <Text>{new Date(row.CreationTimestamp).toLocaleDateString()}</Text>
    ),
  },
  {
    name: "Time",
    selector: (row) => row.CreationTimestamp,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => (
      <Text>{new Date(row.CreationTimestamp).toLocaleTimeString()}</Text>
    ),
  },
  {
    name: "Action",
    selector: null,
    cell: (row) => <Settle id={row._id} />,
  },
];
