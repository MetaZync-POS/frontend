import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', flex: 1, minWidth: 70 },
  { field: 'product', headerName: 'Product', flex: 2, minWidth: 150 },
  { field: 'quantity', headerName: 'Qty', type: 'number', flex: 1, minWidth: 80 },
  { field: 'total', headerName: 'Total ($)', type: 'number', flex: 1, minWidth: 100 },
  { field: 'date', headerName: 'Date', flex: 2, minWidth: 140 },
];

const rows = [
  { id: 1, product: 'Phone Case', quantity: 2, total: 20, date: '2025-08-05' },
  { id: 2, product: 'iPhone 14', quantity: 1, total: 999, date: '2025-08-04' },
  { id: 3, product: 'Charger', quantity: 3, total: 45, date: '2025-08-04' },
  { id: 4, product: 'Samsung S22', quantity: 1, total: 850, date: '2025-08-03' },
  { id: 5, product: 'AirPods', quantity: 2, total: 300, date: '2025-08-02' },
  { id: 6, product: 'Screen Protector', quantity: 5, total: 50, date: '2025-08-01' },
];

const RecentSalesTable = () => {
  const sortedRows = [...rows].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Box mt={4}>
      <Typography variant="h6" color="primary" gutterBottom>
        Recent Sales
      </Typography>
      <DataGrid
        rows={sortedRows}
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
