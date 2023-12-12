import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import React, { useState } from "react";
// import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { Eye, Trash, TrashOff } from "tabler-icons-react";
import DeleteModal from "../DeleteModal";
import { useMutation, useQueryClient } from "react-query";
import { backendUrl } from "../../../constants";
import toast from "react-hot-toast";
import axios from "axios";
import { Check, X } from "lucide-react";
import SuspendModal from "../SuspendModal";

const ActionIcons = ({
  type,
  edit = false,
  view,
  suspend,
  del,
  rowData,
  viewData,
  blocked,
  viewSize = "lg",
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openSuspend, setOpenSuspend] = useState(false);
  const handleDelete = useMutation(
    async () => {
      let link = backendUrl + `/${type.toLowerCase()}/${rowData._id}`;
      if (type === "Users") link = backendUrl + `/users/updateStatus`;
      else if (type === "Coupons-group")
        link = backendUrl + `/coupons/delete-group/${rowData._id}`;
      return axios.post(link, {
        Id: rowData._id,
        IsDeleted: true,
        IsActive: true,
        // headers: {
        //   authorization: `Bearer ${user.token}`,
        // },
      });
    },
    {
      onSuccess: (res) => {
        setOpenDelete(false);
        toast.success(res.data.message);
        if (type === "Users") queryClient.invalidateQueries("fetchUsers");
        else if (type === "Companies")
          queryClient.invalidateQueries("fetchCompanies");
        else if (type === "Coupons")
          queryClient.invalidateQueries("fetchCoupons");
        else if (type === "parks") queryClient.invalidateQueries("fetchParks");
      },
      onError: (res) => {
        toast.error(res.response.data.message);
        setOpenDelete(false);
      },
    }
  );
  const handleSuspend = useMutation(
    async (values) => {
      return axios.post(backendUrl + `/users/updateStatus`, {
        Id: rowData._id,
        IsDeleted: false,
        IsActive: !rowData?.IsActive,
        // headers: {
        //   authorization: `Bearer ${user.token}`,
        // },
      });
    },
    {
      onSuccess: (response) => {
        setOpenSuspend(false);
        queryClient.invalidateQueries("fetchUsers");
        toast.success(res.data.message);
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  return (
    <Flex gap={5}>
      {view && view}
      {edit && edit}
      {suspend && (
        <Tooltip
          label={rowData?.IsActive ? "Suspend" : "Activate"}
          onClick={() => setOpenSuspend(true)}
        >
          <ActionIcon bg={rowData?.IsActive ? "red" : "green"}>
            {rowData.IsActive ? <X /> : <Check />}
          </ActionIcon>
        </Tooltip>
      )}
      {del && (
        <Tooltip label="Delete">
          <ActionIcon
            disabled={blocked}
            bg="white"
            onClick={() => setOpenDelete(true)}
          >
            {blocked ? <TrashOff /> : <Trash stroke={"gray"} />}
          </ActionIcon>
        </Tooltip>
      )}
      <SuspendModal
        label={rowData?.IsActive ? `Suspend User` : "Activate User"}
        message={`Are you sure you want to ${
          rowData?.IsActive ? "suspend" : "Activate"
        } this user.`}
        suspend={rowData?.IsActive}
        opened={openSuspend}
        onDelete={() => handleSuspend.mutate()}
        setOpened={setOpenSuspend}
        loading={handleSuspend.isLoading}
      />
      <DeleteModal
        label={`Delete Selected ${type}`}
        message={`Are you sure you want to delete this ${type}. This Action Cannot be undone.`}
        opened={openDelete}
        onDelete={() => handleDelete.mutate()}
        setOpened={setOpenDelete}
        loading={handleDelete.isLoading}
      />
    </Flex>
  );
};

export default ActionIcons;
