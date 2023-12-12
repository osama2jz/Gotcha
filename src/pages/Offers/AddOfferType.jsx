import { Group, Modal } from "@mantine/core";
import React from "react";
import InputField from "../../components/general/InputField";
import Button from "../../components/general/Button";

const AddOfferType = ({ open, setOpen }) => {
  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Add New Offer Type"
      centered
      withCloseButton={false}
      styles={{ title: { margin: "auto", fontWeight: "600" } }}
    >
      <form>
        <InputField label={"Name"} />
        <InputField label={"Name"} />
        <InputField label={"Name"} />
        <Group justify="center" mt="md" onClick={() => setOpen(false)}>
          <Button label={"Cancel"} primary={false} />
          <Button label={"Add"} />
        </Group>
      </form>
    </Modal>
  );
};

export default AddOfferType;
