import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography, Grid, Paper, Avatar, useTheme } from "@mui/material";
import Navigation from "../components/Navigation";
import { motion } from "framer-motion";
import axios from "axios";

import InventoryIcon from "@mui/icons-material/Inventory";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import StockAvailabilityTable from "../components/StockAvailabilityTable";
import RecentSalesTable from "../components/RecentSalesTable";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const isSuperAdmin = user?.role === "SuperAdmin";
  const theme = useTheme();

  const [dashboardData, setDashboardData] = useState({
    totalProducts: 0,
    outOfStock: 0,
    todaysSales: 0,
    totalInventoryValue: 0,
    adminCount: 0,
  });
  const [exchangeRate, setExchangeRate] = useState(200); // Default exchange rate

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
      const res = await axios.get("/summary", { withCredentials: true });
      setDashboardData(res.data);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  };

  const fetchExchangeRate = async () => {
    try {
      const res = await axios.get(
        "https://v6.exchangerate-api.com/v6/bcb49a967036f7354c1ec05e/latest/USD"
      );
      const rate = res.data.conversion_rates.LKR;
      setExchangeRate(rate);
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
      setExchangeRate(300);
    }
  };

  fetchDashboardData();
  fetchExchangeRate();
}, []);


  

  const commonCards = [
    {
      icon: <StoreIcon />,
      label: "Out of Stock",
      value: dashboardData.outOfStock,
    },
    {
      icon: <PointOfSaleIcon />,
      label: "Today's Sales",
      value: `${new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(exchangeRate * dashboardData.todaysSales)}`

    },
    {
      icon: <InventoryIcon />,
      label: "Total Products",
      value: dashboardData.totalProducts,
    },
    
  ];

  const superAdminCards = [
    {
      icon: <PointOfSaleIcon />,
      label: "Total Inventory Value",
      value: `${new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(exchangeRate * dashboardData.totalInventoryValue)}`

    },
    {
      icon: <SupervisorAccountIcon />,
      label: "Admins",
      value: dashboardData.adminCount,
    },
    {
      icon: <PeopleIcon />,
      label: "Customers",
      value: "Coming Soon",
    },
  ];



  return (
    <>
      <Navigation />
      <Box p={4}>
        <Typography variant="h4" color={theme.palette.success.dark} mb={4}>
          Welcome, {user?.name || "Admin"}
        </Typography>

        <Grid container spacing={3}>
          {commonCards.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
              >
                <Paper
                  elevation={4}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    background: item.label === "Out of Stock" ? "#ffebee" : "#def3d5ff",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        item.label === "Out of Stock"
                          ? "error.main"
                          : theme.palette.success.light,
                      mr: 2,
                      width: 56,
                      height: 56,
                    }}
                  >
                    {item.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="body2">{item.label}</Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {item.value}
                    </Typography>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}

          {isSuperAdmin &&
            superAdminCards.map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={`super-${index}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.2 }}
                >
                  <Paper
                    elevation={4}
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      display: "flex",
                      alignItems: "center",
                      background: "#d0f0c0",
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.success.dark,
                        mr: 2,
                        width: 56,
                        height: 56,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="body2">{item.label}</Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {item.value}
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
        </Grid>

        {/* Tables */}
        <Box mt={6}>
          {isSuperAdmin && <RecentSalesTable />}
          <StockAvailabilityTable />
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
