import { Flex, Image, Switch, Text, Tooltip } from "@mantine/core";
import ActionIcons from "../../../components/general/ActionIcons";
import ViewParkModal from "./ViewParkModal";

export const Columns = (setOpen, setEditData) => [
  {
    name: "Sr. No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Park Name",
    selector: (row) => row.name,
    grow: 1,
    sortable: true,
  },
  {
    name: "Radius (meter)",
    selector: (row) => row.radius,
    grow: 1,
    sortable: true,
  },
  {
    name: "Coins On Completion",
    selector: (row) => row.coinsOnCompletion,
    grow: 1,
    sortable: true,
  },
  {
    name: "Total Drops",
    selector: (row) => row.drops,
    grow: 1,
    sortable: true,
    cell: (row) => <Text>{row.drops.length}</Text>,
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => (
      <ActionIcons
        rowData={row}
        del={true}
        type="parks"
        view={<ViewParkModal title={row.name} data={row}/>}
      />
    ),
  },
];
