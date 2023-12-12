import { FileInput, Group, Modal, SimpleGrid, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { Photo } from "tabler-icons-react";
import Button from "../../components/general/Button";
import InputField from "../../components/general/InputField";
import { backendUrl } from "../../constants";
import { UserContext } from "../../context";

const AddCompany = ({ open, setOpen, editData, setEditData }) => {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const form = useForm({
    initialValues: {
      name: "",
      logo: null,
      description: "",
      website: "",
      address: "",
      phone: "",
      email: "",
      city: "",
      country: "",
    },

    validate: {
      name: (value) => (value?.length > 0 ? null : "Enter Company Name"),
    },
  });

  useEffect(() => {
    if (editData) form.setValues(editData);
  }, [editData]);

  const handleAddCompany = useMutation(
    async (values) => {
      if (editData) {
        return axios.patch(backendUrl + `/companies/${editData._id}`, values, {
          headers: {
            authorization: `${user.accessToken}`,
          },
        });
      }
      return axios.post(backendUrl + `/companies`, values, {
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
        queryClient.invalidateQueries("fetchCompanies");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  return (
    <Modal
      opened={open}
      onClose={() => {
        setOpen(false);
        setEditData(null);
        form.reset();
      }}
      title="Add New Company"
      centered
      withCloseButton={false}
      size={"xl"}
      styles={{ title: { margin: "auto", fontWeight: "600" } }}
    >
      <form
        onSubmit={form.onSubmit((values) => handleAddCompany.mutate(values))}
      >
        <SimpleGrid cols={2}>
          <InputField label={"Name"} form={form} validateName={"name"} />
          <InputField label={"Email"} form={form} validateName={"email"} />
          <InputField label={"Phone"} form={form} validateName={"phone"} />
          <InputField label={"Country"} form={form} validateName={"country"} />
          <InputField label={"City"} form={form} validateName={"city"} />
          <InputField label={"Address"} form={form} validateName={"address"} />
          <InputField label={"Website"} form={form} validateName={"website"} />
          <FileInput
            label="Logo"
            size="md"
            placeholder="Upload JPG/PNG image"
            radius={"md"}
            leftSection={<Photo width={30} />}
            {...form.getInputProps("logo")}
          />
        </SimpleGrid>
        <Textarea
          label="Description"
          radius={"md"}
          mt="sm"
          size="md"
          autosize
          maxRows={4}
          placeholder="Description"
          {...form.getInputProps("description")}
        />
        <Group justify="center" mt="md">
          <Button
            label={"Cancel"}
            primary={false}
            onClick={() => {
              setOpen(false);
              form.reset();
            setEditData(null);
            }}
          />
          <Button label={editData ? "Update" : "Add"} type={"submit"} />
        </Group>
      </form>
    </Modal>
  );
};

export default AddCompany;
