import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { alpha, Box, Card, Stack } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { FormProvider, FTextField } from "../../app/components/form";
import { createHabit, updateHabit } from "./habitSlice";

const yupSchema = Yup.object().shape({
  name: Yup.string().required("Content is required"),
  description: Yup.string().required("Content is required"),
  goalValue: Yup.string().required("Content is required"),
  goalFrequency: Yup.string().required("Content is required"),
});

const defaultValues = {
  name: "",
  description: "",
  goalValue: "",
  goalFrequency: "",
};

function HabitForm({ habit }) {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.post);

  const onSubmit = (data) => {
    if (habit) {
      data["habitId"] = habit._id;
      dispatch(updateHabit(data));
    } else {
      dispatch(createHabit(data)).then(() => reset());
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <FTextField
            name="name"
            multiline
            fullWidth
            rows={4}
            placeholder={"What's on your mind?"}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />
          <FTextField
            name="description"
            multiline
            fullWidth
            rows={4}
            placeholder={"What's on your mind?"}
            sx={{
              "& fieldset": {
                borderWidth: `1px !important`,
                borderColor: alpha("#919EAB", 0.32),
              },
            }}
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <LoadingButton
              type="submit"
              variant="contained"
              size="small"
              loading={isSubmitting || isLoading}
            >
              Save
            </LoadingButton>
          </Box>
        </Stack>
      </FormProvider>
    </Card>
  );
}

export default HabitForm;
