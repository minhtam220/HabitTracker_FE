import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, Container, Link, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FTextField, FormProvider } from "../app/components/form";
import useAuth from "../hooks/useAuth";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const defaultValues = {
  email: "",
  password: "",
  remember: true,
};

function LoginPage() {
  const auth = useAuth();
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    const { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
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
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register">
              Get started
            </Link>
          </Typography>
          <FTextField name="email" label="Email address"></FTextField>
          <FTextField
            name="password"
            label="Password"
            //type={showPassword ? "text" : "password"}
            /*InputProps={{
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
            }}*/
          ></FTextField>

          <Typography
            sx={{
              fontFamily: "Monaco", // Change the font family
              textAlign: "center", // Center the text within the Typography component
            }}
          >
            Forgot password?{" "}
            <Link component={RouterLink} to="/recover">
              Recover here
            </Link>
          </Typography>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default LoginPage;
