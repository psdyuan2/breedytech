'use client';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import ProductsTable from './ProductsTable';

interface Product {
  id: string;
  slug: string;
  name: string;
  pricePaise: number;
  isFeatured: boolean;
  createdAt: Date;
}

export default function AdminProductsContent({ products }: { products: Product[] }) {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h4" component="h1" fontWeight={600}>
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => router.push('/admin/products/new')}
        >
          Add Product
        </Button>
      </Box>

      <ProductsTable products={products} />
    </Container>
  );
}
