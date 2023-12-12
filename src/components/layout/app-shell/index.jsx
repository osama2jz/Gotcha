import { useDisclosure } from "@mantine/hooks";
import { Anchor, AppShell, Container, Flex, Text } from "@mantine/core";
import Sidebar from "../sidebar";
import styles from "./styles.module.css";
import Header from "../header";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context";

function CustomAppShell() {
  const [opened, { toggle }] = useDisclosure(false);
  const { user } = useContext(UserContext);
  return user?.IsOwner ? (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: {
          mobile: !opened,
          // desktop: !opened,
        },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>

      <AppShell.Navbar className={styles["sidebar"]}>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main
        bg={"#e4e5e6"}
        // pos={"relative"}
        style={{ overflow: "hidden" }}
      >
        <Container p={0} m={"auto"} maw={1200}>
          <Outlet />
        </Container>
        {/* <Flex
          pos={"absolute"}
          w="100%"
          bottom={0}
          justify={"space-evenly"}
          bg="white"
          p="md"
        >
          <Text>
            Powered By:{" "}
            <Anchor href="https://usquaresolutions.com/">
              Usquare Solutions
            </Anchor>
          </Text>
          <Text>Developed by ♥</Text>
        </Flex> */}
      </AppShell.Main>
    </AppShell>
  ) : (
    <Navigate to={"/signin"} />
  );
}

export default CustomAppShell;
