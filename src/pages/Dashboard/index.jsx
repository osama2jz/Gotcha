import { Box, Center, Group, Loader } from "@mantine/core";
import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import PageHeader from "../../components/general/PageHeader";
import { backendUrl } from "../../constants";
import { UserContext } from "../../context";
import Card from "./Card";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const { status, data: offers } = useQuery(
    "fetchOfferCounts",
    () => {
      return axios.get(backendUrl + "/offer-claimed/list", {
        // headers: {
        //   authorization: `${user.accessToken}`,
        // },
      });
    },
    {
      onSuccess: (res) => {},
    }
  );
  const { data: coinsCount } = useQuery(
    "fetchCoinsCounts",
    () => {
      return axios.get(backendUrl + "/offers/listCount", {
        // headers: {
        //   authorization: `${user.accessToken}`,
        // },
      });
    },
    {
      onSuccess: (res) => {},
    }
  );
  const { data: usersCount } = useQuery(
    "fetchUsersCounts",
    () => {
      return axios.get(backendUrl + "/users", {
        // headers: {
        //   authorization: `${user.accessToken}`,
        // },
      });
    },
    {
      onSuccess: (res) => {},
    }
  );
  if (status === "loading")
    return (
      <Center>
        <Loader />
      </Center>
    );
  return (
    <Box bg="white" style={{ borderRadius: "5px" }}>
      <PageHeader title={"Statistics"} />
      <Group justify="space-between" p="md">
        <Card title={"Total Users"} value={offers?.data?.count} color={"red"} />
        <Card
          title={"Total Companies"}
          value={coinsCount?.data?.data}
          color={"green"}
        />
        <Card
          title="Total Parks"
          value={usersCount?.data?.data.length}
          color={"#63c2de"}
        />
      </Group>
    </Box>
  );
};

export default Dashboard;
