import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  CircularProgress,
  Chip,
  Typography,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import OrderFormDialog from "./OrderFormDialog";
import ConfirmDialog from "./ConfirmDialog";
import axios from "axios";
import { toast } from "react-toastify";

const OrderTab = ({ userRole }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    order: null,
  });

  const isSuperAdmin = userRole === "SuperAdmin";

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/orders");
      setOrders(data.orders ?? []);
    } catch {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSave = async (formData) => {
    try {
      if (editingOrder) {
        await axios.put(`/orders/${editingOrder._id}`, formData);
        toast.success("Order updated");
      } else {
        await axios.post("/orders", formData);
        toast.success("Order created");
      }
      fetchOrders();
    } catch {
      toast.error("Failed to save order");
    } finally {
      setFormOpen(false);
      setEditingOrder(null);
    }
  };

const handleDelete = async () => {
  try {
    await axios.delete(`/orders/${deleteDialog.order._id}`, {
      withCredentials: true, // This is key!
    });
    toast.success("Order deleted");
    fetchOrders();
  } catch (error) {
    console.error("Delete error:", error);
    toast.error("Failed to delete order");
  } finally {
    setDeleteDialog({ open: false, order: null });
  }
};


  const handleConfirm = async (order) => {
    try {
      await axios.put(`/orders/status/${order._id}`, { status: "Completed" });
      toast.success("Order confirmed");
      fetchOrders();
    } catch {
      toast.error("Failed to confirm order");
    }
  };

  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2 }}
        onClick={() => setFormOpen(true)}
      >
        Add Order
      </Button>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Typography variant="h6" align="center" mt={4}>
          No orders found.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mb: 4 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#0cb085" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Products</TableCell>
                <TableCell sx={{ color: "#fff" }}>Total</TableCell>
                <TableCell sx={{ color: "#fff" }}>Customer</TableCell>
                <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                <TableCell sx={{ color: "#fff" }}>Created On</TableCell>
                <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id?.slice(-6)}</TableCell>
                  <TableCell>
                    {(order.products ?? []).map((i, idx) => (
                      <Box key={idx}>
                        {i.product?.name ?? "Unnamed"} × {i.quantity}
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>${order.totalAmount ?? "-"}</TableCell>
                  <TableCell>
                    {order.customerName ?? "N/A"}
                    {order.customerContact ? ` (${order.customerContact})` : ""}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status ?? "Pending"}
                      color={
                        order.status === "Completed" ? "success" : "warning"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {order.status !== "Completed" && (
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => {
                            setEditingOrder(order);
                            setFormOpen(true);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {isSuperAdmin && order.status === "Pending" && (
                      <Tooltip title="Confirm">
                        <IconButton onClick={() => handleConfirm(order)}>
                          <CheckIcon color="success" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {isSuperAdmin && (
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => setDeleteDialog({ open: true, order })}
                        >
                          <DeleteIcon color="error" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <OrderFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingOrder(null);
        }}
        onSave={handleSave}
        initialOrder={editingOrder}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, order: null })}
        onConfirm={handleDelete}
        message={`Delete order ${deleteDialog.order?.customerName ?? ""}?`}
      />
    </Box>
  );
};

export default OrderTab;
