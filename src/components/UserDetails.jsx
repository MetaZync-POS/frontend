import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import axios from "axios";

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
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Profile update failed", err);
      alert("Profile update failed");
    }
  };

  if (loading) return <Typography>Loading profile...</Typography>;

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Account Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar
            src={
              profileImageFile
                ? URL.createObjectURL(profileImageFile)
                : formData.profileImage
            }
            sx={{ width: 80, height: 80 }}
          />
          <Button component="label" variant="outlined" sx={{ mt: 1 }}>
            Change Photo
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </Button>
        </Grid>
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
      <Box mt={2}>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default UserDetails;
