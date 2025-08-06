import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { toast } from "react-toastify";

const UserDetails = ({ onUpdate }) => {
  const [formData, setFormData] = useState({});
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("/auth/profile", { withCredentials: true });
      setFormData(res.data.admin);
      if (onUpdate) onUpdate(res.data.admin);
    } catch (err) {
      console.error("Failed to fetch profile", err);
      toast.error("Failed to fetch profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    setProfileImageFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("phone", formData.phone);
      if (profileImageFile) {
        data.append("profileImage", profileImageFile);
      }

      const res = await axios.put("/auth/profile", data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData(res.data.admin);
      if (onUpdate) onUpdate(res.data.admin);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Profile update failed", err);
      toast.error("Profile update failed");
    }
  };

  if (loading) return <Typography>Loading profile...</Typography>;

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 4,
        p: 4,
        maxWidth: 800,
        mx: "auto",
        backgroundColor: "#fdfdfd",
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Account Settings
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={4} md={3}>
          <Box
            position="relative"
            display="inline-block"
            sx={{
              "&:hover .edit-btn": { opacity: 1 },
              mx: "auto",
              textAlign: "center",
            }}
          >
            <Avatar
              src={
                profileImageFile
                  ? URL.createObjectURL(profileImageFile)
                  : formData.profileImage
              }
              sx={{
                width: 100,
                height: 100,
                border: "4px solid #ddd",
                mx: "auto",
              }}
            />
            <IconButton
              component="label"
              size="small"
              className="edit-btn"
              sx={{
                position: "absolute",
                bottom: -10,
                right: -10,
                backgroundColor: "#0cb085",
                color: "#fff",
                border: "2px solid #fff",
                "&:hover": {
                  backgroundColor: "#0a906cff",
                },
                opacity: 0,
                transition: "opacity 0.3s",
              }}
            >
              <EditIcon fontSize="small" />
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </IconButton>
          </Box>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formData.name || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="phone"
                label="Phone"
                value={formData.phone || ""}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                disabled
                label="Email"
                value={formData.email || ""}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Box textAlign="right">
        <Button
          variant="contained"
          size="large"
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 600,
            textTransform: "none",
            borderRadius: 2,
            backgroundColor: "#0cb085",
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#0cb085",
            },
          }}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </Box>
    </Paper>
  );
};

export default UserDetails;
