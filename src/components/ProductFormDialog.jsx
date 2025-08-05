import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Stack, Typography, Box
} from '@mui/material';

const ProductFormDialog = ({ open, onClose, onSave, initialProduct }) => {
  const [product, setProduct] = useState({
    name: '', brand: '', category: '',
    price: '', quantity: '', description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setImagePreview(initialProduct.image || null); // if editing, show current image
    } else {
      setProduct({ name: '', brand: '', category: '', price: '', quantity: '', description: '' });
      setImagePreview(null);
      setImageFile(null);
    }
  }, [initialProduct]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    formData.set('price', parseFloat(product.price));
    formData.set('quantity', parseInt(product.quantity));

    onSave(formData); // send FormData to parent
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{initialProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField name="name" label="Name" value={product.name} onChange={handleChange} fullWidth />
          <TextField name="brand" label="Brand" value={product.brand} onChange={handleChange} fullWidth />
          <TextField name="category" label="Category" value={product.category} onChange={handleChange} fullWidth />
          <TextField name="price" label="Price" value={product.price} onChange={handleChange} fullWidth />
          <TextField name="quantity" label="Quantity" value={product.quantity} onChange={handleChange} fullWidth />
          <TextField name="description" label="Description" value={product.description} onChange={handleChange} multiline rows={2} fullWidth />

          <Box>
            <Button variant="outlined" component="label">
              Upload Image
              <input type="file" accept="image/*" hidden onChange={handleImageChange} />
            </Button>
            {imagePreview && (
              <Box mt={1}>
                <Typography variant="caption">Preview:</Typography>
                <img src={imagePreview} alt="preview" style={{ width: '100px', height: 'auto', borderRadius: 4 }} />
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;
