import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AdminLayout from '@/components/AdminLayout';
import ProductForm from '../ProductForm';

export default function NewProductPage() {
  return (
    <AdminLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600} mb={3}>
          Add New Product
        </Typography>
        <ProductForm />
      </Container>
    </AdminLayout>
  );
}
