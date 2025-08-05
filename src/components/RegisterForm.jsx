import React from "react";
import { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup.string().email("Invalid email").required("Email required"),
  phone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
});

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { confirmPassword, ...rest } = data;
      const res = await axios.post("/auth/register", rest);
      toast.success("Registered successfully! Please Verify your email.");
      console.log(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField
          label="Name"
          fullWidth
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#ffffff",
              "& fieldset": {
                borderColor: "#0cb085ff",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#0cb085ff",
            },
          }}
        />

        <TextField
          label="Email"
          fullWidth
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#ffffff",
              "& fieldset": {
                borderColor: "#0cb085ff",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#0cb085ff",
            },
          }}
        />

        <TextField
          label="Phone Number"
          fullWidth
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#ffffff",
              "& fieldset": {
                borderColor: "#0cb085ff",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#0cb085ff",
            },
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#ffffff",
              "& fieldset": {
                borderColor: "#0cb085ff",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#0cb085ff",
            },
          }}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          {...register("confirmPassword")}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          sx={{
            "& .MuiOutlinedInput-root": {
              color: "#ffffff",
              "& fieldset": {
                borderColor: "#0cb085ff",
              },
              "&:hover fieldset": {
                borderColor: "#ffffff",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#ffffff",
              },
            },
            "& .MuiInputLabel-root": {
              color: "#ffffff",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#0cb085ff",
            },
          }}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2, backgroundColor: "#0cb085ff", color: "#fff" }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#ffffff" }} />
          ) : (
            "Register"
          )}
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
