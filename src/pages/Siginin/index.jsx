import { Image, PasswordInput, Stack, Text, Title } from "@mantine/core";
import Button from "../../components/general/Button";
import InputField from "../../components/general/InputField";
import logo from "/logo.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { backendUrl } from "../../constants";
import { useForm } from "@mantine/form";
import toast from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "../../context";
import { Lock, Mail } from "lucide-react";

const Signin = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const form = useForm({
    initialValues: {
      Email: "",
      Password: "",
    },

    validate: {
      Email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      Password: (value) => (value?.length > 0 ? null : "Enter Password"),
    },
  });

  const handleSignin = useMutation(
    async (values) => {
      return axios.post(backendUrl + `/sponsors/login`, values);
    },
    {
      onSuccess: (response) => {
        localStorage.setItem("user", JSON.stringify(response.data.data));
        setUser(response.data.data);
        navigate("/");
      },
      onError: (err) => {
        toast.error(err.response.data.message);
      },
    }
  );
  if (user?.IsOwner) return <Navigate to={"/"} />;
  return (
    <form onSubmit={form.onSubmit((values) => handleSignin.mutate(values))}>
      <Stack
        w={450}
        m="auto"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image src={logo} w={120} m="auto" />
        <Stack
          style={{
            border: "1px solid rgb(0,0,0,0.2)",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <Title>Login</Title>
          <Text c="gray">Sign In to you account</Text>
          <InputField
            placeholder={"Email"}
            required={true}
            form={form}
            leftSection={<Mail size={16} />}
            validateName={"Email"}
          />
          <PasswordInput
            placeholder="Password"
            leftSection={<Lock size={16} />}
            size="md"
            withAsterisk
            {...form.getInputProps("Password")}
          />
          <Button
            label={"Signin"}
            type={"submit"}
            loading={handleSignin.isLoading}
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default Signin;
