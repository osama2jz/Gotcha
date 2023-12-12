import { Box, Flex } from "@mantine/core";
import PageHeader from "../../components/general/PageHeader";
import DataGrid from "../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import { useState } from "react";
import AddOfferType from "./AddOfferType";
import { useQuery } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";

const OfferTypes = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const { status } = useQuery(
    "fetchOffers",
    () => {
      return axios.get(backendUrl + "/offerTypes/listAll", {
        // headers: {
        //   authorization: `${user.accessToken}`,
        // },
      });
    },
    {
      onSuccess: (res) => {
        let newData = res.data.data.map((obj, ind) => (obj.serialNo = ind + 1));
        setData(res.data.data);
      },
    }
  );
  return (
    <Box bg="white" style={{ borderRadius: "5px" }}>
      <PageHeader title={"Offer Types Packages"} />
      <Box p="md">
        <DataGrid data={data} columns={Columns} />
      </Box>
      <AddOfferType open={open} setOpen={setOpen} />
    </Box>
  );
};

export default OfferTypes;
