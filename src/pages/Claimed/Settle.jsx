import React from "react";
import Button from "../../components/general/Button";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";

const Settle = ({ id }) => {
  const handleAction = useMutation(
    async (values) => {
      return axios.post(backendUrl + `/offers/delete`, values, {});
    },
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  return (
    <Button
      label={"Mark Settled"}
      onClick={() => handleAction.mutate({ Id: id })}
    />
  );
};

export default Settle;
