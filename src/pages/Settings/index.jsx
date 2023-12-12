import { Box, Flex, Group, PasswordInput, Stack } from "@mantine/core";
import React, { useContext, useEffect } from "react";
import Button from "../../components/general/Button";
import PageHeader from "../../components/general/PageHeader";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { backendUrl } from "../../constants";
import axios from "axios";
import { UserContext } from "../../context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/general/InputField";

const Settings = () => {
  const { user } = useContext(UserContext);
  useEffect(() => {
    form.setFieldValue("BusinessName", user.BusinessName);
    form.setFieldValue("BusinessWebsite", user.BusinessWebsite);
    form2.setFieldValue("Email", user.Email);
  }, []);
  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      BusinessName: "",
      BusinessWebsite: "",
      Id: "5ecc1cae5d468b4454bb5562",
    },

    validate: {
      BusinessName: (value) =>
        value?.length > 0 ? null : "Please enter business Name",
    },
  });
  const handleChangeDetails = useMutation(
    async (values) => {
      return axios.patch(
        backendUrl + `/sponsors/updateDetailsSettings`,
        values,
        {
          headers: {
            authorization: `${user.accessToken}`,
          },
        }
      );
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

  const form2 = useForm({
    validateInputOnChange: true,
    initialValues: {
      Email: "",
      Password: "",
      Id: "5ecc1cae5d468b4454bb5562",
    },

    validate: {
      Email: (value) => (value?.length > 0 ? null : "Please enter email"),
    },
  });
  const handleChangeCredentials = useMutation(
    async (values) => {
      return axios.patch(backendUrl + `/sponsors/updateCredentials`, values, {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
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
    <Flex justify={"space-between"} gap={"lg"} wrap={'wrap'}>
      <form
        style={{ flex: 1 }}
        onSubmit={form.onSubmit((values) => handleChangeDetails.mutate(values))}
      >
        <Stack bg="white" style={{ borderRadius: "5px" }}>
          <PageHeader title={"Business Settings"} />
          <Stack p="md">
            <InputField
              label={"Business Name"}
              form={form}
              validateName={"BusinessName"}
            />
            <InputField
              label={"Business Website"}
              form={form}
              validateName={"BusinessWebsite"}
            />
            <Group justify="flex-end" mt="lg">
              <Button label={"Update"} type={"submit"} />
            </Group>
          </Stack>
        </Stack>
      </form>
      <form
        style={{ flex: 1 }}
        onSubmit={form2.onSubmit((values) =>
          handleChangeCredentials.mutate(values)
        )}
      >
        <Stack bg="white" style={{ borderRadius: "5px" }}>
          <PageHeader
            title={"Settings"}
            subTitle={"Update your profile settings"}
          />
          <Stack p="md">
            <InputField label={"Email"} form={form2} validateName={"Email"} />
            <PasswordInput
              label="Password"
              placeholder="Enter New Password"
              {...form2.getInputProps("Password")}
              size="md"
            />
            <Group justify="flex-end" mt="lg">
              <Button label={"Update"} type={"submit"} />
            </Group>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
};

export default Settings;
