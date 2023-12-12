import { Box, Flex } from "@mantine/core";
import PageHeader from "../../components/general/PageHeader";
import DataGrid from "../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import { useContext, useState } from "react";
import AddOfferType from "./AddCompany";
import { backendUrl } from "../../constants";
import axios from "axios";
import { useQuery } from "react-query";
import { UserContext } from "../../context";

const Company = () => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  const { status } = useQuery(
    "fetchCompanies",
    () => {
      return axios.get(backendUrl + "/companies", {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData = data.map((obj, ind) => {
          return { ...obj, serialNo: ind + 1 };
        });
        setData(newData);
      },
    }
  );
  const filteredItems = data.filter((item) => {
    return item?.name?.toLowerCase().includes(search.toLowerCase());
  });
  return (
    <Box>
      <PageHeader
        title={"Companies"}
        subTitle={"View all Companies in your system"}
      />
      <Flex gap="xl" my="md" wrap={"wrap"}>
        <InputField
          placeholder={"Search here..."}
          style={{ flex: 1, minWidth: "200px" }}
          leftIcon={"search"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button primary={false} label={"Clear"} />
        <Button label={"Add Company"} onClick={() => setOpen(true)} />
      </Flex>
      <DataGrid
        data={filteredItems}
        columns={Columns(setOpen, setEditData)}
        progressPending={status === "loading"}
      />
      <AddOfferType
        open={open}
        setOpen={setOpen}
        editData={editData}
        setEditData={setEditData}
      />
    </Box>
  );
};

export default Company;
