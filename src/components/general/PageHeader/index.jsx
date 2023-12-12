import { Box, Divider, Text, Title } from "@mantine/core";
import React from "react";

const PageHeader = ({ title, subTitle }) => {
  return (
    <Box bg="#f0f3f5">
      <Title order={5} p='sm' pb={0}>{title}</Title>
      <Divider w={"100%"} mt="md" />
    </Box>
  );
};

export default PageHeader;
