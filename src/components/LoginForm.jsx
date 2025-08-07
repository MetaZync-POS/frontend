import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { TextField, Button, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import Link from "@mui/material/Link";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
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
      const res = await axios.post("/auth/login", data, {
        withCredentials: true,
      });

      // Dispatch LOGIN_SUCCESS to update context and localStorage
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.admin });

      toast.success("Login successful");
      navigate("/dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
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

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ mt: 2, backgroundColor: "#0cb085ff", color: "#ffffff" }}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#ffffff" }} />
          ) : (
            "Login"
          )}
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "#ffffff" }}>
          Forgot your password? <Link href="/forgot-password" sx={{ color: "#0cb085ff", textDecoration: "none" }}>Reset Password!</Link>
        </Typography>
      </Stack>
    </form>
  );
};

export default LoginForm;
