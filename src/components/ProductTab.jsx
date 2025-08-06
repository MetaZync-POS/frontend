import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  CircularProgress,
  Typography,
} from '@mui/material';
import ProductCard from './ProductCard';
import ProductFormDialog from './ProductFormDialog';
import ConfirmDialog from './ConfirmDialog';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductTab = ({ userRole }) => {
  const [products, setProducts] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, product: null });
  const [loading, setLoading] = useState(false);

  const isAdmin = userRole === 'admin' || userRole === 'Admin';
  const isSuperAdmin = userRole === 'superadmin' || userRole === 'SuperAdmin';

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/products');
      setProducts(data.products);
    } catch (err) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Save (Add or Update)
  const handleSave = async (formData) => {
    try {
      if (editingProduct) {
        // UPDATE product
        const { data } = await axios.put(`/products/${editingProduct._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product updated successfully');
        console.log('Updated product from backend:', data.product);
        setProducts((prev) =>
          prev.map((p) => (p._id.toString() === data.product._id.toString() ? data.product : p))
        );
      } else {
        // ADD new product
        const { data } = await axios.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Product added successfully');
        setProducts((prev) => [...prev, data.product]);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save product');
    } finally {
      setFormOpen(false);
      setEditingProduct(null);
    }
  };
  

  // Handle Delete
  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${deleteDialog.product._id}`);
      toast.success('Product deleted successfully');
      setProducts((prev) =>
        prev.filter((p) => p._id !== deleteDialog.product._id)
      );
      await fetchProducts();
    } catch (err) {
      toast.error('Failed to delete product');
    } finally {
      setDeleteDialog({ open: false, product: null });
    }
  };

  return (
    <Box>
      {(isAdmin || isSuperAdmin) && (
        <Button
          variant="contained"
          sx={{ mb: 2, backgroundColor: '#0cb085' }}
          onClick={() => setFormOpen(true)}
        >
          Add Product
        </Button>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : products.length === 0 ? (
        <Typography variant="h6" align="center" mt={4} color="text.secondary">
          No products found.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product._id}>
              <ProductCard
                product={product}
                userRole={userRole}
                onEdit={(p) => {
                  setEditingProduct(p);
                  setFormOpen(true);
                }}
                onDelete={(p) => {
                  if (isSuperAdmin) {
                    setDeleteDialog({ open: true, product: p });
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add / Edit Dialog */}
      <ProductFormDialog
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
        initialProduct={editingProduct}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, product: null })}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${deleteDialog.product?.name}"?`}
      />
    </Box>
  );
};

export default ProductTab;
