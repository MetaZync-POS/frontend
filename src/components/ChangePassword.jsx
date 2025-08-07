import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const ChangePassword = () => {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.put("/auth/change-password", form, { withCredentials: true });
      alert("Password changed successfully");
      setForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Change Password</Typography>
      <TextField
        label="Current Password"
        type="password"
        name="currentPassword"
        fullWidth
        margin="normal"
        value={form.currentPassword}
        onChange={handleChange}
      />
      <TextField
        label="New Password"
        type="password"
        name="newPassword"
        fullWidth
        margin="normal"
        value={form.newPassword}
        onChange={handleChange}
      />
      <Button variant="contained" onClick={handleSubmit}>
        {loading ? (
          <CircularProgress size={24} sx={{ color: "#ffffff" }} />
        ) : (
          "Update Password"
        )}
      </Button>
    </Box>
  );
};

export default ChangePassword;
