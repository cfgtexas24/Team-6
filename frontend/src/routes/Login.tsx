import {
  Alert,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC, FormEventHandler, useState } from "react";
import { login } from "../util/authentication";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();

  const { refetch: loginFetch, error } = useQuery({
    queryKey: ["login", { username, password }] as const,
    queryFn: ({ queryKey }) =>
      login(queryKey[1].username!, queryKey[1].password!),
    enabled: false, // Only fetch when the button is pressed
    retry: false,
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    loginFetch().then((res) => {
      if (res.isError) return;
      const url = new URL(window.location.href);
      const redirectParam = url.searchParams.get("redirect");
      if (redirectParam) {
        navigate(redirectParam);
      } else {
        navigate("/");
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container maxWidth="md">
          <Stack gap="1rem">
            <Typography variant="h2">Login</Typography>
            <TextField
              label="Username"
              type="text"
              name="username"
              required
              onChange={(ev) => setUsername(ev.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              required
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <Button type="submit">Login</Button>
            {error && <Alert severity="error">{error.message}</Alert>}
          </Stack>
        </Container>
      </form>
    </>
  );
};

export default Login;
