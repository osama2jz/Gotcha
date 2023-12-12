import { ActionIcon, Tooltip } from "@mantine/core";
import { Pencil } from "lucide-react";
import React from "react";

const EditCompany = ({ setOpen, data, setEditData }) => {
  return (
    <Tooltip label="Edit">
      <ActionIcon
        bg="white"
        onClick={() => {
          setEditData(data);
          setOpen(true);
        }}
      >
        <Pencil stroke={"gray"} />
      </ActionIcon>
    </Tooltip>
  );
};

export default EditCompany;
