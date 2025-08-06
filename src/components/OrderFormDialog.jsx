import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Autocomplete,
} from "@mui/material";
import axios from "axios";

const OrderFormDialog = ({ open, onClose, onSave, initialOrder }) => {
  const [productsOpts, setProductsOpts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerContact, setCustomerContact] = useState("");

  useEffect(() => {
    axios.get("/products").then((res) => {
      const inStockProducts = res.data.products.filter((p) => p.quantity > 0);
      setProductsOpts(inStockProducts);
    });
  }, []);

  useEffect(() => {
    if (initialOrder) {
      setCustomerName(initialOrder.customerName);
      setCustomerContact(initialOrder.customerContact);
      setSelectedItems(
        initialOrder.products.map((i) => ({
          product: i.product,
          quantity: i.quantity,
        }))
      );
    } else {
      setCustomerName("");
      setCustomerContact("");
      setSelectedItems([]);
    }
  }, [initialOrder]);

  const handleSave = () => {
    const formData = {
      products: selectedItems.map((i) => ({
        product: i.product._id,
        quantity: i.quantity,
      })),
      totalAmount: selectedItems.reduce(
        (sum, i) => sum + i.product.price * i.quantity,
        0
      ),
      customerName,
      customerContact,
    };
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initialOrder ? "Edit Order" : "Add Order"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Autocomplete
            multiple
            options={productsOpts}
            getOptionLabel={(opt) => `${opt.name} (${opt.quantity} in stock)`}
            onChange={(e, val) =>
              setSelectedItems(
                val.map((p) => ({
                  product: p,
                  quantity: 1,
                }))
              )
            }
            renderInput={(params) => <TextField {...params} label="Products" />}
          />
          {selectedItems.map((item, idx) => (
            <TextField
              key={idx}
              label={`${item.product.name} quantity`}
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const qty = parseInt(e.target.value);
                const newItems = [...selectedItems];
                newItems[idx].quantity = qty;
                setSelectedItems(newItems);
              }}
              inputProps={{ min: 1, max: item.product.quantity }}
            />
          ))}
          <TextField
            label="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Customer Contact"
            value={customerContact}
            onChange={(e) => setCustomerContact(e.target.value)}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          {initialOrder ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderFormDialog;
