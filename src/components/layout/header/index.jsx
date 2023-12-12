import { ActionIcon, Burger, Flex, Group, Text } from "@mantine/core";
import PropTypes from "prop-types";
import styles from "./styles.module.css";
import ProfileMenu from "../profile-menu";

export default function Header({ opened, toggle }) {
  return (
    <Flex align={"center"} px={"lg"} h="100%" justify={"space-between"}>
      <Burger
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="sm"
        className="mantine-focus-never"
      />
      <Group>
        <img src="/logo.png" alt="logo" className={styles["logo"]} />
        <Text fw={600}>Gotcha App</Text>
      </Group>
      <Group>
        <ProfileMenu />
      </Group>
    </Flex>
  );
}

// Define prop types
Header.propTypes = {
  opened: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
