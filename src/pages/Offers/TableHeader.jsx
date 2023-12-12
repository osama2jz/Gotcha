import { Badge, Switch } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";

export const Columns = [
  {
    name: "Serial No.",
    selector: (row) => row.serialNo,
    width: "120px",
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.Name,
    grow: 1,
    sortable: true,
  },
  {
    name: "Picture",
    selector: (row) => row.AppPicture,
    grow: 1,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.isActive,
    sortable: true,
    center: true,
    width: "200px",
    cell: (row) => <Badge>{row.IsActive?'Active':'Inactive'}</Badge>,
  },
];
