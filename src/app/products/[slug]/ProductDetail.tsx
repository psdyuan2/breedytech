'use client';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { formatINR } from '@/lib/constants';
import AddToCartButton from './AddToCartButton';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricePaise: number;
  imagePath: string;
}

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.imagePath}
            alt={product.name}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 500,
              objectFit: 'contain',
              borderRadius: 2,
              bgcolor: 'grey.100',
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
            {product.name}
          </Typography>

          <Typography variant="h3" color="primary" fontWeight={700} gutterBottom>
            {formatINR(product.pricePaise)}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, lineHeight: 1.7 }}
          >
            {product.description}
          </Typography>

          <AddToCartButton product={product} />
        </Grid>
      </Grid>
    </Container>
  );
}
