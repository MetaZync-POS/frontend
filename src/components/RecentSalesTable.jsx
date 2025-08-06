import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const columns = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
  { field: 'product', headerName: 'Product', flex: 2, minWidth: 150 },
  { field: 'quantity', headerName: 'Qty', type: 'number', flex: 1, minWidth: 80 },
  { field: 'total', headerName: 'Total ($)', type: 'number', flex: 1, minWidth: 100 },
  { field: 'date', headerName: 'Date', flex: 2, minWidth: 140 },
];

const RecentSalesTable = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const res = await axios.get('/orders', { withCredentials: true });
        const completedOrders = res.data.orders.filter(order => order.status === 'Completed');

        const formattedRows = [];

        completedOrders.forEach(order => {
          const orderDate = new Date(order.createdAt).toISOString().split('T')[0];

          order.products.forEach(item => {
            formattedRows.push({
              id: item._id,
              product: item.product?.name || 'N/A',
              quantity: item.quantity,
              total: (item.product?.price || 0) * item.quantity,
              date: orderDate
            });
          });
        });

        // Sort by date descending (latest first)
        formattedRows.sort((a, b) => new Date(b.date) - new Date(a.date));

        setSales(formattedRows);
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error('Failed to load sales');
      }
    };

    fetchCompletedOrders();
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h6" color="primary" gutterBottom>
        Recent Sales
      </Typography>
      <DataGrid
        rows={sales}
        columns={columns}
        autoHeight
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

export default RecentSalesTable;
