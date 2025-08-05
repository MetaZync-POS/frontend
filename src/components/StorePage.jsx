import React, { useState } from "react";
import { Box, Tabs, Tab, Typography, useMediaQuery } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ProductTab from "./ProductTab";
import OrderTab from "./OrderTab";

// Optional: get role from context or props
const StorePage = ({ userRole }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  const tabContentVariants = {
    hidden: { opacity: 0, x: 50 },
    enter: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <Box sx={{ p: isMobile ? 1 : 4 }}>


      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Products" />
        <Tab label="Orders" />
      </Tabs>

      <AnimatePresence mode="wait">
        <motion.div
          key={tabIndex}
          variants={tabContentVariants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.4 }}
        >
          {tabIndex === 0 ? (
            <ProductTab userRole={userRole} />
          ) : (
            <OrderTab userRole={userRole} />
          )}
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default StorePage;
