import { Box, NavLink, Text } from "@mantine/core";
import {
  Building2,
  CheckCircle2Icon,
  DropletIcon,
  GaugeCircleIcon,
  List,
  Puzzle,
  Settings,
  StarIcon,
  TreePine,
  User2Icon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
export default function Sidebar() {
  // State to keep track of active link
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  // Sidebar Links
  const content = useMemo(() => {
    return [
      {
        label: "Dashboard",
        icon: <GaugeCircleIcon size={18} color='gray'/>,
        isLink: true,
        to: "/",
      },
      {
        label: "Offers",
        icon: <DropletIcon size={18} color='gray'/>,
        isLink: false,
        children: [
          // {
          //   label: "Park",
          //   icon: <TreePine size={18} />,
          //   to: "/park",
          // },
          {
            label: "Drop",
            icon: <DropletIcon size={18} color='gray'/>,
            to: "/drop",
          },
          {
            label: "Live",
            icon: <StarIcon size={18} color='gray'/>,
            to: "/live",
          },
          {
            label: "Claimed",
            icon: <CheckCircle2Icon size={18} color='gray'/>,
            to: "/claimed",
          },
        ],
      },
      {
        label: "Players",
        icon: <User2Icon size={18} color='gray'/>,
        isLink: false,
        children: [
          {
            label: "Users",
            icon: <User2Icon size={18} color='gray'/>,
            to: "/users",
          },
          // {
          //   label: "Companies",
          //   icon: <Building2 size={18} />,
          //   to: "/companies",
          // },
        ],
      },
      {
        label: "Settings",
        icon: <Settings size={18} color='gray'/>,
        isLink: false,
        children: [
          {
            label: "Offer Types",
            icon: <List size={18} color='gray'/>,
            to: "/offers",
          },
          {
            label: "Settings",
            icon: <Settings size={18} color='gray'/>,
            to: "/settings",
          },
        ],
      },
    ];
  }, []);

  return (
    <Box className={styles["sidebar-container"]}>
      {content.map((item, ind) => {
        // If the item is a link, return a NavLink component
        if (item.isLink) {
          return (
            <NavLink
              key={ind}
              className={styles["navlink"]}
              active={active === item.label}
              label={item.label}
              leftSection={item.icon}
              onClick={() => {
                navigate(item.to);
                setActive(item.label);
              }}
            />
          );
        } else {
          return (
            // If the item is not a link, return a Text component
            <Box key={ind}>
              <Text
                className={styles["sidebar-section-title"]}
                c="gray"
                key={item.label}
              >
                {item.label}
              </Text>
              {item.children.map((child, i) => {
                return (
                  <NavLink
                    key={i}
                    className={styles["navlink"]}
                    label={child.label}
                    active={active === child.label}
                    leftSection={child.icon}
                    onClick={() => {
                      navigate(child.to);
                      setActive(child.label);
                    }}
                  />
                );
              })}
            </Box>
          );
        }
      })}
    </Box>
  );
}
