import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { createHabit, updateHabit } from "./habitSlice";

const yupSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
});

function HabitForm({ habit, isAdding, setIsAdding }) {
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      description: habit ? habit.description : "",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log("running onSubmit");
    console.log(data);
    if (isAdding) {
      await dispatch(createHabit(data, "good"));
      setIsAdding(false);
    } else {
      // Handle the case where habit is undefined
      await dispatch(updateHabit({ ...data, habitId: habit._id }));
    }
  };

  return (
    <Card
      sx={{
        boxShadow: "none",
        border: "2px solid white",
        borderRadius: 2,
        padding: 0,
        margin: 0,
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          p: 3,
          marginLeft: 10,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          <TextField
            {...register("description")}
            name="description"
            variant="outlined"
            size="small"
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {habit ? "Update" : "Create"}
            </Button>
          </Box>
        </Box>
      </form>
    </Card>
  );
}

export default HabitForm;
