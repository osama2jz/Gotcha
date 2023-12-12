import { ActionIcon, Group, Modal, PasswordInput, Stack } from "@mantine/core";
import React, { useContext, useEffect } from "react";
import Button from "../../components/general/Button";
import { useDisclosure } from "@mantine/hooks";
import InputField from "../../components/general/InputField";
import SelectMenu from "../../components/general/SelectMenu";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import toast from "react-hot-toast";
import { UserContext } from "../../context";
import { Pencil } from "tabler-icons-react";

const AddUserModal = ({ edit = false, data }) => {
  const { user } = useContext(UserContext);
  const [opened, { toggle }] = useDisclosure(false);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      Email: "",
      Password: "",
      FullName: "",
      Gender: "",
      Password: "",
      YearOfBirth: null,
    },

    validate: {
      Email: (value) => (value?.length > 0 ? null : "Please enter email"),
    },
  });
  useEffect(() => {
    form.setValues(data);
  }, [data, opened]);
  const handleAddUser = useMutation(
    async (values) => {
      let link = backendUrl + "/users";
      if (edit) link = link + `/updateProfile/${data?._id}`;
      else link = link + "/signup";
      return axios.patch(link, values, {
        headers: {
          authorization: `${user.accessToken}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        toast.success(res.data.message);
        toggle();
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  return (
    <>
      {edit ? (
        <ActionIcon onClick={toggle}>
          <Pencil />
        </ActionIcon>
      ) : (
        <Button label={"Add User"} onClick={toggle} />
      )}
      <Modal
        title="Registering User"
        opened={opened}
        onClose={toggle}
        centered
        styles={{ title: { fontWeight: 600 } }}
      >
        <form
          onSubmit={form.onSubmit((values) => handleAddUser.mutate(values))}
        >
          <Stack>
            <InputField
              label={"Full Name"}
              form={form}
              required={true}
              validateName={"FullName"}
            />
            <InputField
              label={"Email"}
              form={form}
              required={true}
              validateName={"Email"}
            />
            <SelectMenu
              label={"Gender"}
              data={["Male", "Female"]}
              form={form}
              validateName="Gender"
              required={true}
            />
            <InputField
              label={"Year of Birth"}
              type="number"
              form={form}
              validateName={"YearOfBirth"}
              required={true}
            />
            <PasswordInput
              label="Password"
              {...form.getInputProps("Password")}
            />
            <Group gap={"md"} justify="flex-end" mt="md">
              <Button
                label={"Cancel"}
                onClick={() => {
                  toggle();
                  form.reset();
                }}
                variant="outline"
                bg="gray"
              />
              <Button label={edit ? "Update" : "Register"} type={"submit"} />
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default AddUserModal;
