import { Box, Flex } from "@mantine/core";
import PageHeader from "../../../components/general/PageHeader";
import DataGrid from "../../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../../components/general/InputField";
import Button from "../../../components/general/Button";
import { useContext, useState } from "react";
import { backendUrl } from "../../../constants";
import axios from "axios";
import { useQuery } from "react-query";
import { UserContext } from "../../../context";
import { useNavigate } from "react-router-dom";

const ViewParks = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [editData, setEditData] = useState(null);

  const { status } = useQuery(
    "fetchParks",
    () => {
      return axios.get(backendUrl + "/parks", {
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
      <PageHeader title={"Parks"} subTitle={"View all parks in your system"} />
      <Flex gap="xl" my="md" wrap={"wrap"}>
        <InputField
          placeholder={"Search here..."}
          style={{ flex: 1, minWidth: "200px" }}
          leftIcon={"search"}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button primary={false} label={"Clear"} />
        <Button label={"Add Park"} onClick={() => navigate("/add-park")} />
      </Flex>
      <DataGrid
        data={filteredItems}
        columns={Columns(setOpen, setEditData)}
        progressPending={status === "loading"}
      />
    </Box>
  );
};

export default ViewParks;
