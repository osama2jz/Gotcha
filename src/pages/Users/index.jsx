import { Box, Flex } from "@mantine/core";
import PageHeader from "../../components/general/PageHeader";
import DataGrid from "../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useState } from "react";
import toast from "react-hot-toast";
import AddUserModal from "./AddUserModal";

const Users = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [advanced, setAdvanced] = useState(false);

  const { status } = useQuery(
    "fetchUsers",
    () => {
      return axios.get(backendUrl + "/users/list-all-users");
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        setData(data);
      },
    }
  );
  const onHandleStatus = useMutation(
    async (values) => {
      return axios.patch(backendUrl + `/users/change-status/${values.id}`, {
        status: values.status,
      });
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  const filteredItems = data.filter((item) => {
    return (
      item?.FullName?.toLowerCase().includes(search.toLowerCase()) ||
      item?.Email?.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <Box bg="white" style={{ borderRadius: "5px" }}>
      <PageHeader
        title={"Registered Users"}
        subTitle={"View all of your users"}
      />
      <Flex gap="xl" m="md">
        <InputField
          placeholder={"Search here..."}
          style={{ flex: 1 }}
          leftIcon={"search"}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button primary={false} label={"Clear"} onClick={() => setSearch("")} />
        <AddUserModal />
      </Flex>
      <Box p={"md"}>
        <DataGrid
          data={filteredItems}
          download={true}
          columns={Columns(onHandleStatus, advanced).filter((a) => a)}
          progressPending={status === "loading"}
        />
      </Box>
    </Box>
  );
};

export default Users;
