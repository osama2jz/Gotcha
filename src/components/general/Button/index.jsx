import { Button as ButtonMantine, useMantineTheme } from "@mantine/core";

const Button = ({
  leftIcon,
  label,
  onClick,
  w,
  compact,
  loading,
  type,
  iconWidth = "16px",
  disabled,
  size = "md",
  variant = "filled",
  primary = true,
  ...props
}) => {
  return (
    <ButtonMantine
      compact={compact}
      disabled={disabled}
      loading={loading}
      w={w}
      color={primary ? "#1b8eb7" : "#3ea662"}
      size={size}
      radius={"md"}
      // variant={primary ? variant : "outline"}
      // styles={{root:{borderColor:'rgb(0,0,0,0.2)'}}}
      leftSection={
        leftIcon ? (
          <img
            src={new URL(`../../../assets/${leftIcon}`, import.meta.url).href}
            alt="icon"
            width={iconWidth}
          />
        ) : (
          ""
        )
      }
      type={type}
      onClick={onClick}
      {...props}
    >
      {label}
    </ButtonMantine>
  );
};
export default Button;
