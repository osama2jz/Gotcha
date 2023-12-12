import { Text, Tooltip } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";

export const Columns = [
  {
    name: "Serial No.",
    selector: (row) => row.serialNo,
    width: "120px",
    sortable: true,
  },
  {
    name: "Coupon Code",
    selector: (row) => row.code,
    width: "160px",
    sortable: true,
    cell: (row) => (
      <Tooltip label={row.code}>
        <Text>{row.code}</Text>
      </Tooltip>
    ),
  },
  {
    name: "Company Name",
    selector: (row) => row.company?.name,
    width: "200px",
    sortable: true,
  },
  {
    name: "Coupon Price",
    selector: (row) => row.price,
    width: "150px",
    sortable: true,
    center: true,
  },
  {
    name: "Expiry Date",
    selector: (row) => row.expiryDate,
    width: "200px",
    sortable: true,
    cell: (row) => <Text>{new Date(row.expireAt).toLocaleDateString()}</Text>,
  },
  {
    name: "Valid Till",
    selector: (row) => row.validTill,
    width: "200px",
    sortable: true,
    cell: (row) => <Text>{new Date(row.validTill).toLocaleDateString()}</Text>,
  },
  // {
  //   name: "Status",
  //   selector: (row) => row.status,
  //   sortable: true,
  //   center: true,
  //   width: "200px",
  //   cell: (row) => <Switch />,
  // },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => <ActionIcons rowData={row} del={true} type="Coupons-group" />,
  },
];
