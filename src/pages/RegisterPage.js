import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FTextField, FormProvider } from "../app/components/form";
import useAuth from "../hooks/useAuth";

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .required("Please confirm password")
    .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValues = {
  username: "",
  email: "",
  password: "",
  passwordConfirmation: "",
};

function RegisterPage() {
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { username, email, password } = data;

    try {
      await auth.register({ username, email, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}

          <Typography
            sx={{
              fontFamily: "Monaco", // Change the font family
              textAlign: "center", // Center the text within the Typography component
            }}
          >
            Already have an account?{" "}
            <Link component={RouterLink} to="/login">
              Sign In
            </Link>
          </Typography>

          <FTextField name="username" label="Username"></FTextField>
          <FTextField name="email" label="Email"></FTextField>
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></FTextField>

          <FTextField
            name="passwordConfirmation"
            label="PasswordConfirmation"
            type={showPasswordConfirmation ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPasswordConfirmation(!showPasswordConfirmation)
                    }
                    edge="end"
                  >
                    {showPasswordConfirmation ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          ></FTextField>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Register
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
