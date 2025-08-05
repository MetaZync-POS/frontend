import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  useTheme,
} from '@mui/material';
import Navigation from '../components/Navigation';
import { motion } from 'framer-motion';

import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import PeopleIcon from '@mui/icons-material/People';
import StoreIcon from '@mui/icons-material/Store';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

import StockAvailabilityTable from '../components/StockAvailabilityTable';
import RecentSalesTable from '../components/RecentSalesTable';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const isSuperAdmin = user?.role === 'SuperAdmin';
  const theme = useTheme();

  const outOfStockCount = 2;

  // Common Cards (Admin + Super Admin)
  const commonCards = [
    {
      icon: <PointOfSaleIcon />,
      label: "Today's Sales",
      value: 'LKR 23,500',
    },
    {
      icon: <InventoryIcon />,
      label: 'Total Products',
      value: 124,
    },
    {
      icon: <PeopleIcon />,
      label: 'Customers',
      value: 87,
    },
    {
      icon: <StoreIcon />,
      label: 'Out of Stock',
      value: outOfStockCount,
    },
  ];

  // Super Admin Only Cards
  const superAdminCards = [
    {
      icon: <SupervisorAccountIcon />,
      label: 'Admins',
      value: 5,
    },
  ];

  return (
    <>
      <Navigation />
      <Box p={4}>
        <Typography variant="h4" color={theme.palette.primary.main} mb={4}>
          Welcome, {user?.name || 'Admin'}
        </Typography>

        <Grid container spacing={3}>
          {/* Common Cards */}
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
                    display: 'flex',
                    alignItems: 'center',
                    background: '#e1f5fe',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: theme.palette.primary.main,
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

          {/* Super Admin Only Cards */}
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
                      display: 'flex',
                      alignItems: 'center',
                      background: '#d0f0c0',
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: theme.palette.secondary.main,
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
