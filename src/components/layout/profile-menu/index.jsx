import { Menu, Text, Avatar, Group } from "@mantine/core";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context";

export default function ProfileMenu() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Group className={styles["menu-trigger-avatar"]}>
          <Avatar src={"/default-avatar.png"} />
          {/* <Text visibleFrom="xs">Parks ID Admin</Text> */}
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        {/* <Menu.Label>Application</Menu.Label>
        <Menu.Item>Settings</Menu.Item>
        <Menu.Item>Gallery</Menu.Item>
        <Menu.Item
        rightSection={
            <Text size="xs" c="dimmed">
            ⌘K
            </Text>
          }
          >
          Search
          </Menu.Item>
          
          <Menu.Divider />
          
          <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item>Transfer my data</Menu.Item> */}
        <Menu.Item onClick={() => navigate("/settings")}>Settings</Menu.Item>
        <Menu.Item
          c="red"
          onClick={() => {
            setUser(null);
            localStorage.clear();
            navigate("/signin");
          }}
        >
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
