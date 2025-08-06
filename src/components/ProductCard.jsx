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

const fallbackImage = 'https://via.placeholder.com/240x160.png?text=No+Image';

const ProductCard = ({ product, onEdit, onDelete, userRole }) => {
  const imageUrl = product.imageUrl || fallbackImage;

  return (
    <Card
      sx={{
        width: 240,
        m: 2,
        mx: 'auto',
        borderRadius: 4,
        boxShadow: 6,
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 10,
        },
        bgcolor: '#ffffff',
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        height="260"
        image={imageUrl}
        alt={product.name}
        sx={{
          objectFit: 'cover',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
      />

      {/* Product Details */}
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
        {(userRole === 'SuperAdmin' || userRole === 'Admin') && (
          <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
            <Tooltip title="Edit Product">
              <IconButton
                size="small"
                onClick={() => onEdit(product)}
                sx={{
                  bgcolor: 'primary.light',
                  '&:hover': { bgcolor: 'primary.main', color: 'white' },
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            {userRole === 'SuperAdmin' && (
              <Tooltip title="Delete Product">
                <IconButton
                  size="small"
                  onClick={() => onDelete(product)}
                  sx={{
                    bgcolor: 'error.light',
                    '&:hover': { bgcolor: 'error.main', color: 'white' },
                  }}
                >
                  <DeleteIcon />
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
