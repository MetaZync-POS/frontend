import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  CardMedia,
  Stack,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const fallbackImage =
  'https://via.placeholder.com/240x160.png?text=No+Image';

const ProductCard = ({ product, onEdit, onDelete, userRole }) => {
  const imageUrl = product.imageUrl || fallbackImage;

  return (
    <Card
      sx={{
        width: 240,
        m: 2,
        marginInline:'auto',        borderRadius: 4,
        boxShadow: 6,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 10,
        },
        bgcolor: '#ffffff',
      }}
    >
      {/* Product Image */}
      <CardMedia
        component="img"
        height="240"
        image={imageUrl}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />

      {/* Product Info */}
      <CardContent>
        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={600} noWrap>
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.brand} • {product.category}
          </Typography>
          <Typography variant="body2" color="text.primary">
            ${product.price}
          </Typography>
          <Typography
            variant="body2"
            color={product.quantity > 0 ? 'success.main' : 'error.main'}
          >
            {product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'}
          </Typography>
        </Stack>

        {/* Action Buttons */}
        {(userRole === 'superadmin' || userRole === 'admin') && (
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Tooltip title="Edit">
              <IconButton size="small" onClick={() => onEdit(product)}>
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            {userRole === 'superadmin' && (
              <Tooltip title="Delete">
                <IconButton size="small" onClick={() => onDelete(product)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
