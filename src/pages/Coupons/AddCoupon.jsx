import { Flex, Group, Modal, Stack, Text, Textarea } from "@mantine/core";
import React, { useContext, useState } from "react";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";
import { DateInput, DatePicker } from "@mantine/dates";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "@mantine/form";
import SelectMenu from "../../components/general/SelectMenu";
import { UserContext } from "../../context";

const AddCoupen = ({ open, setOpen }) => {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [companies, setCompanies] = useState([]);
  const handleAddCoupon = useMutation(
    async (values) => {
      values.codes = values.code.split(",").map((obj) => obj.trim());
      delete values.code;
      return axios.post(backendUrl + `/coupons`, values, {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (response) => {
        toast.success(response.data.message);
        form.reset();
        setOpen(false);
        queryClient.invalidateQueries("fetchCoupons");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  const { status } = useQuery(
    "fetchCompanies",
    () => {
      return axios.get(backendUrl + "/companies", {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        const data = res.data.data;
        let newData = data.map((obj, ind) => {
          return { value: obj._id, label: obj.name };
        });
        setCompanies(newData);
      },
    }
  );

  const form = useForm({
    initialValues: {
      code: "",
      expireAt: "",
      description: "",
      validTill: null,
      price: 0,
    },

    validate: {
      code: (value) => (value?.length > 0 ? null : "Enter Coupon Code"),
      description: (value) =>
        value?.length > 0 ? null : "Enter Coupon Description",
      expireAt: (value) => (value ? null : "Select Expiry Date"),
      price: (value) => (value >= 0 ? null : "Enter Coupon Price"),
      validTill: (value) => (value ? null : "Select Validity Date"),
    },
  });
  return (
    <Modal
      opened={open}
      onClose={() => {
        setOpen(false);
        form.reset();
      }}
      title="Add New Coupon"
      centered
      size={"lg"}
      withCloseButton={false}
      styles={{ title: { margin: "auto", fontWeight: "600" } }}
    >
      <form
        onSubmit={form.onSubmit((values) => handleAddCoupon.mutate(values))}
      >
        <Stack>
          <SelectMenu
            label="Select Company"
            data={companies}
            form={form}
            required
            validateName="company"
          />
          <Textarea
            label={"Coupon Code(s)"}
            placeholder="Enter Coupon Code(s)"
            withAsterisk
            description="Enter comma seperated codes for example (abc123, abc123, abc123)"
            minRows={2}
            {...form.getInputProps("code")}
          />
          <Textarea
            label={"Description"}
            placeholder="Enter Coupon Description"
            withAsterisk
            description="What does this coupen code represent."
            minRows={2}
            {...form.getInputProps("description")}
          />
          <InputField
            label={"Price (in coins)"}
            form={form}
            required
            validateName={"price"}
          />
          <Flex w={"100%"} gap={"lg"}>
            <DateInput
              size="md"
              withAsterisk
              w={"50%"}
              label="Expire At"
              minDate={new Date()}
              placeholder="Expires At"
              {...form.getInputProps("expireAt")}
            />
            <DateInput
              size="md"
              label="Valid Till"
              withAsterisk
              minDate={new Date()}
              placeholder="Expires At"
              w={"50%"}
              {...form.getInputProps("validTill")}
            />
          </Flex>
          <Group justify="center" mt="md">
            <Button
              label={"Cancel"}
              primary={false}
              onClick={() => {
                setOpen(false);
                form.reset();
              }}
            />
            <Button
              label={"Add"}
              type={"submit"}
              loading={handleAddCoupon.isLoading}
            />
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddCoupen;
