import { Box, Flex, Text, Title } from "@mantine/core";
import React from "react";

const Card = ({ title, description, value, color }) => {
  return (
    <Flex
      w={300}
      // h={150}
      p={10}
      justify="space-between"
      direction={"column"}
      style={{ borderLeft: `4px solid ${color}`, borderRadius:'3px' }}
    >
      <Flex justify={"space-between"}>
        <Text c='gray' fz='sm'>{title}</Text>
        {/* {icon} */}
      </Flex>
      <Title order={3}>{value}</Title>
    </Flex>
  );
};

export default Card;
