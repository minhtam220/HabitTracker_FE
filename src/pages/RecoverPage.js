import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Alert, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { FTextField, FormProvider } from "../app/components/form";
import useAuth from "../hooks/useAuth";

const RecoverSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const defaultValues = {
  email: "",
};

function RecoverPage() {
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(RecoverSchema),
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
            Please enter your email to recover the password{" "}
          </Typography>

          <FTextField name="email" label="Email"></FTextField>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Recover Password
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default RecoverPage;
