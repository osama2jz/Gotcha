import { Box, Flex } from "@mantine/core";
import PageHeader from "../../components/general/PageHeader";
import DataGrid from "../../components/general/Table";
import { Columns } from "./TableHeader";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import { useState } from "react";
import AddOfferType from "./AddCoupon";
import { backendUrl } from "../../constants";
import axios from "axios";
import { useQuery } from "react-query";
import SingleCoupon from "./SingleCoupon";

const Coupons = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([
    {
      serialNo: 1,
      name: "Exmaple Coupon",
      companyName: "Some Company",
      couponCode: "kjkj3232",
      status: true,
    },
    {
      serialNo: 2,
      name: "Exmaple Coupon",
      companyName: "Some Company",
      couponCode: "kjkj3232",
      status: true,
    },
    {
      serialNo: 3,
      name: "Exmaple Coupon",
      companyName: "Some Company",
      couponCode: "kjkj3232",
      status: true,
    },
    {
      serialNo: 4,
      name: "Exmaple Coupon",
      companyName: "Some Company",
      couponCode: "kjkj3232",
      status: true,
    },
  ]);

  const { status } = useQuery(
    "fetchCoupons",
    () => {
      return axios.get(backendUrl + "/coupons");
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData = data.map((obj, ind) => {
          return {
            ...obj,
            serialNo: ind + 1,
            code: obj.coupons.map((obj) => obj.code).join(", "),
          };
        });
        setData(newData);
      },
    }
  );
  const filteredItems = data.filter((item) => {
    return (
      item?.code?.toLowerCase().includes(search.toLowerCase()) ||
      item?.company?.name?.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <Box>
      <PageHeader
        title={"Coupons"}
        subTitle={"View all of your Offered Coupons"}
      />
      <Flex gap="xl" my="md" wrap={"wrap"}>
        <InputField
          placeholder={"Search here..."}
          style={{ flex: 1, minWidth: "200px" }}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={"search"}
        />
        <Button primary={false} label={"Clear"} />
        <Button label={"Add Coupon"} onClick={() => setOpen(true)} />
      </Flex>
      <DataGrid
        data={filteredItems}
        columns={Columns}
        expandableRows={true}
        expandableRowsComponent={SingleCoupon}
        progressPending={status === "loading"}
      />
      <AddOfferType open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Coupons;
