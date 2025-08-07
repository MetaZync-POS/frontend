import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, Paper, Box } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import Particles from "./Particles/Particles";
import { CircularProgress } from "@mui/material";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("/auth/forgot-password", data);
      toast.success("Reset link sent! Check your email.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error sending reset email");
    } finally {
      setLoading(false);
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
    ><Box sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
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
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%", backgroundColor:'transparent',backdropFilter: "blur(8px)", border: "0.5px solid white", boxShadow: "0 8px 32px 0 rgba(135, 135, 137, 0.37)", borderRadius: 4}}>
        <Typography variant="h5" gutterBottom color="white">
          Forgot Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            {...register("email")}
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
            "Send Reset Link"
          )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
