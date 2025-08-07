import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import Particles from "./Particles/Particles";
import { CircularProgress } from "@mui/material";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
   const [loading] = useState(false);

  const onSubmit = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axios.put(`/auth/reset-password?token=${token}`, {
        newPassword: data.newPassword,
      });
      toast.success("Password reset successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000000ff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </Box>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          backgroundColor:'transparent',
          backdropFilter: "blur(8px)",
          border: "0.5px solid white",
          borderRadius:4,
          boxShadow: "0 8px 32px 0 rgba(135, 135, 137, 0.37)",
        }}
      >
        <Typography variant="h5" gutterBottom color="white">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            {...register("newPassword")}
            sx={{
                my:2,
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
            sx={{
                my:2,
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
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "green",
              color: "#fff",
              "&:hover": { backgroundColor: "#2e7d32" },
            }}
          >
            {loading ? (
            <CircularProgress size={24} sx={{ color: "#ffffff" }} />
          ) : (
            "Reset Password"
          )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ResetPassword;
