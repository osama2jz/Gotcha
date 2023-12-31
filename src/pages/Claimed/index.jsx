import { Box, Flex } from "@mantine/core";
import PageHeader from "../../components/general/PageHeader";
import DataGrid from "../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";
import { UserContext } from "../../context";

const Claimed = () => {
  const { user } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const { status } = useQuery(
    "fetchClaimed",
    () => {
      return axios.get(backendUrl + "/offer-claimed/list", {});
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
    return (
      item?.Value === parseInt(search) ||
      item?.ClaimedBy?.Email?.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <Box bg="white" style={{ borderRadius: "5px" }}>
      <PageHeader title={"Claimed"} />
      <Flex gap="xl" my="md" px="md">
        <InputField
          placeholder={"Search Email or Value here"}
          style={{ flex: 1 }}
          leftIcon={"search"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button primary={false} label={"Clear"} onClick={() => setOpen(true)} />
      </Flex>
      <Box p="md">
        <DataGrid
          data={filteredItems}
          columns={Columns}
          progressLoading={status === "loading"}
        />
      </Box>
    </Box>
  );
};

export default Claimed;
