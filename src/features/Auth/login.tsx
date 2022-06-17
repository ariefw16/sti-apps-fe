import {
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Container,
  Button,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { z } from "zod";
import { login } from "./utils/service";
import { authState } from "./utils/store";
import { AuthParams } from "./utils/type";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const loginForm = useForm<AuthParams>({
    initialValues: {
      username: "",
      password: "",
    },
    schema: zodResolver(schema),
  });

  const submitHandler = (data: AuthParams) => {
    const { username, password } = data;
    setLoading(true);
    login({ username, password })
      .then((res) => {
        setAuth(res);
        navigate("/");
        localStorage.setItem("accessToken", res.accessToken!);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.accessToken!}`;
        showNotification({
          title: "Authentication",
          message: "Login Success!!",
          color: "blue",
        });
      })
      .catch((e) => {
        showNotification({ message: "Login Failed!", color: "red" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container size={420} py={90}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={loginForm.onSubmit(submitHandler)}>
          <TextInput
            label="Username"
            placeholder="fulan.fulan"
            required
            disabled={loading}
            {...loginForm.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            disabled={loading}
            {...loginForm.getInputProps("password")}
          />
          <Button fullWidth mt="xl" loading={loading} type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
