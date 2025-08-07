import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, Chip } from '@mui/material';

const columns = [
  { field: '_id', headerName: 'ID', flex: 1 },
  { field: 'name', headerName: 'Product', flex: 2 },
  {
    field: 'quantity',
    headerName: 'Stock',
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value > 0 ? `${params.value} available` : 'Out of stock'}
        color={params.value > 0 ? 'success' : 'error'}
        variant="outlined"
      />
    ),
  },
];

const StockAvailabilityTable = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/products');
        const sorted = res.data.products.sort((a, b) => a.quantity - b.quantity);
        setRows(sorted);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h6" color="primary" gutterBottom>
        Stock Availability
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row._id}
        loading={loading}
        pagination
        pageSizeOptions={[]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
              page: 0,
            },
          },
        }}
        disableRowSelectionOnClick
        hideFooterSelectedRowCount
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#0cb085',
            color: '#000000',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f1fdf7',
          },
        }}
      />
    </Box>
  );
};

export default StockAvailabilityTable;
