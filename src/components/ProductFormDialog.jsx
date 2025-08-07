import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, TextField, Stack, Typography, Box, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { CircularProgress } from "@mui/material";

const ProductFormDialog = ({ open, onClose, onSave, initialProduct }) => {
  const [product, setProduct] = useState({
    name: '', brand: '', category: '',
    price: '', quantity: '', description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [brands, setBrands] = useState(['Apple','Google', 'Samsung','Huawei', 'Xiaomi', 'Oppo', 'OnePlus', 'Vivo', 'Nokia']);
  const [categories, setCategories] = useState(['Smartphones', 'Accessories', 'Tablets', 'Laptops', 'Wearables']);
  const [quantities, setQuantities] = useState(['1', '2', '3', '4', '5', '10', '20', '50', '100']);
  const [showBrandDialog, setShowBrandDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [showQuantityDialog, setShowQuantityDialog] = useState(false);
  const [newBrand, setNewBrand] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newQuantity, setNewQuantity] = useState('');

  useEffect(() => {
    if (initialProduct) {
      setProduct(initialProduct);
      setImagePreview(initialProduct.image || null);
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

const handleSubmit = async () => {
  setLoading(true);
  try {
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    formData.set('price', parseFloat(product.price));
    formData.set('quantity', parseInt(product.quantity));

    await onSave(formData); // Ensure this returns a Promise

    // ✅ Reset form after successful save
    setProduct({ name: '', brand: '', category: '', price: '', quantity: '', description: '' });
    setImageFile(null);
    setImagePreview(null);
    onClose(); // Optionally close the dialog after save
  } catch (error) {
    console.error("Error saving product:", error);
  } finally {
    setLoading(false);
  }
};



  const handleAddNewBrand = () => {
    if (newBrand && !brands.includes(newBrand)) {
      setBrands([...brands, newBrand]);
      setProduct({ ...product, brand: newBrand });
    }
    setShowBrandDialog(false);
    setNewBrand('');
  };

  const handleAddNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setProduct({ ...product, category: newCategory });
    }
    setShowCategoryDialog(false);
    setNewCategory('');
  };

  const handleAddNewQuantity = () => {
    if (newQuantity && !quantities.includes(newQuantity)) {
      setQuantities([...quantities, newQuantity]);
      setProduct({ ...product, quantity: newQuantity });
    }
    setShowQuantityDialog(false);
    setNewQuantity('');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>{initialProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            {/* Centered Upload Image Section */}
            <Box display="flex" flexDirection="column" alignItems="center">
              <Button variant="outlined" component="label">
                Upload Image
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Button>
              {imagePreview && (
                <Box mt={1} textAlign="center">
                  <Typography variant="caption">Preview:</Typography>
                  <img
                    src={imagePreview}
                    alt="preview"
                    style={{ width: '100px', height: 'auto', borderRadius: 4 }}
                  />
                </Box>
              )}
            </Box>

            {/* Name Field */}
            <TextField name="name" label="Name" value={product.name} onChange={handleChange} fullWidth />

            {/* Brand Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select
                name="brand"
                value={product.brand}
                label="Brand"
                onChange={(e) => {
                  if (e.target.value === '__add_new__') {
                    setShowBrandDialog(true);
                  } else {
                    setProduct({ ...product, brand: e.target.value });
                  }
                }}
              >
                {brands.map((b, i) => (
                  <MenuItem key={i} value={b}>{b}</MenuItem>
                ))}
                <MenuItem value="__add_new__" style={{ fontStyle: 'italic', color: '#1976d2' }}>
                  + Add new brand...
                </MenuItem>
              </Select>
            </FormControl>

            {/* Category Dropdown */}
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={product.category}
                label="Category"
                onChange={(e) => {
                  if (e.target.value === '__add_new__') {
                    setShowCategoryDialog(true);
                  } else {
                    setProduct({ ...product, category: e.target.value });
                  }
                }}
              >
                {categories.map((c, i) => (
                  <MenuItem key={i} value={c}>{c}</MenuItem>
                ))}
                <MenuItem value="__add_new__" style={{ fontStyle: 'italic', color: '#1976d2' }}>
                  + Add new category...
                </MenuItem>
              </Select>
            </FormControl>

            {/* Price, Quantity, Description */}
            <TextField name="price" label="Price" type='number' value={product.price} onChange={handleChange} fullWidth />
            <FormControl fullWidth>
              <InputLabel>Quantity</InputLabel>
              <Select
                name="quantity"
                value={product.quantity}
                label="Quantity"
                onChange={(e) => {
                  if (e.target.value === '__add_new__') {
                    setShowQuantityDialog(true);
                  } else {
                    setProduct({ ...product, quantity: e.target.value });
                  }
                }}
              >
                {quantities.map((c, i) => (
                  <MenuItem key={i} value={c}>{c}</MenuItem>
                ))}
                <MenuItem value="__add_new__" style={{ fontStyle: 'italic', color: '#1976d2' }}>
                  + Add new quantity...
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="description"
              label="Description"
              value={product.description}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='error'>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add New Brand Dialog */}
      <Dialog open={showBrandDialog} onClose={() => setShowBrandDialog(false)}>
        <DialogTitle>Add New Brand</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Brand Name"
            value={newBrand}
            onChange={(e) => setNewBrand(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowBrandDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNewBrand} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      {/* Add New Category Dialog */}
      <Dialog open={showCategoryDialog} onClose={() => setShowCategoryDialog(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCategoryDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNewCategory} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showQuantityDialog} onClose={() => setShowQuantityDialog(false)}>
        <DialogTitle>Add New Quantity</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            fullWidth
            label="Quantity"
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowQuantityDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNewQuantity} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductFormDialog;
