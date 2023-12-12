import { Flex, Image, Switch, Text, Tooltip } from "@mantine/core";
import ActionIcons from "../../components/general/ActionIcons";
import EditCompany from "./EditCompany";

export const Columns = (setOpen, setEditData) => [
  {
    name: "Sr. No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "Company Name",
    selector: (row) => row.name,
    grow: 1,
    sortable: true,
    cell: (row) => (
      <Flex>
        <Image src={row.logo} w={50} />
        <Text>{row.name}</Text>
      </Flex>
    ),
  },
  {
    name: "Email",
    selector: (row) => row.email || "N/A",
    sortable: true,
    width: "200px",
  },
  {
    name: "Phone",
    selector: (row) => row.phone || "N/A",
    width: "150px",
    sortable: true,
  },
  {
    name: "Country",
    selector: (row) => row.country || "N/A",
    sortable: true,
    center: true,
    width: "150px",
  },
{
    name: "City",
    selector: (row) => row.city || "N/A",
    sortable: true,
    center: true,
    width: "150px",
  },
  {
    name: "Address",
    selector: (row) => row.address || "N/A",
    sortable: true,
    width: "200px",
    cell: (row) => (
      <Tooltip label={row.address}>
        <Text lineClamp={3}>{row.address || "N/A"}</Text>
      </Tooltip>
    ),
  },
  {
    name: "Actions",
    center: true,
    width: "100px",
    cell: (row) => (
      <ActionIcons
        rowData={row}
        del={true}
        edit={
          <EditCompany setOpen={setOpen} setEditData={setEditData} data={row} />
        }
        type="companies"
      />
    ),
  },
];
