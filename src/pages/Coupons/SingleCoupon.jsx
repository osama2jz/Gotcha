import { ActionIcon, Group, SimpleGrid, Text } from "@mantine/core";
import React from "react";
import { TrashOff, Trash } from "tabler-icons-react";
import ActionIcons from "../../components/general/ActionIcons";

const SingleCoupon = ({ data }) => {
  return data?.coupons.map((obj, ind) => (
    <SimpleGrid
      cols={7}
      py="md"
      px="35px"
      bg={'rgba(0,0,0,0.07)'}
      style={{ borderBottom: "2px dashed rgb(0,0,0,0.1)" }}
    >
      <Text ta="center">{ind + 1}</Text>
      <Text>{obj.code}</Text>
      <Text>{data.company.name}</Text>
      <Text>{data.price}</Text>
      <Text>{new Date(data.expireAt).toLocaleDateString()}</Text>
      <Text>{new Date(data.validTill).toLocaleDateString()}</Text>
      {/* <ActionIcon
        disabled={obj.ownedBy}
        bg="white"
        // onClick={() => setOpenDelete(true)}
      >
        {obj.ownedBy ? <TrashOff /> : <Trash stroke={"gray"} />}
      </ActionIcon> */}
      <ActionIcons rowData={obj} del={true} type="Coupons" />
    </SimpleGrid>
  ));
};

export default SingleCoupon;
