import { Container, Flex, Modal as ModalMantine, Stack, Text } from "@mantine/core";
import cross from "../../../assets/delete.svg";
import Button from "../Button";

const DeleteModal = ({
  opened,
  setOpened,
  onDelete,
  label,
  loading,
  message,
}) => {
  return (
    <ModalMantine
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      centered
    >
      <Stack align="center">
        <img src={cross} alt="icon" width={"70px"} />
        <Text fw={"bold"}>{label}</Text>
        <Text c={"gray"} ta={'center'}>{message}</Text>
        <Flex pt={"sm"} gap={"md"}>
          <Button
            label="Cancel"
            disabled={loading}
            fullWidth={true}
            onClick={() => setOpened(false)}
            primary={false}
          />
          <Button
            label="Delete"
            onClick={onDelete}
            loading={loading}
            fullWidth={true}
          />
        </Flex>
      </Stack>
    </ModalMantine>
  );
};
export default DeleteModal;
