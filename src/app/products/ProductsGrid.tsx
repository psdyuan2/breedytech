'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { useRouter } from 'next/navigation';
import { formatINR } from '@/lib/constants';

interface Product {
  id: string;
  slug: string;
  name: string;
  pricePaise: number;
  imagePath: string;
}

export default function ProductsGrid({ products }: { products: Product[] }) {
  const router = useRouter();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom fontWeight={600} mb={4}>
        All Products
      </Typography>

      {products.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No products available yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Card elevation={2}>
                <CardActionArea onClick={() => router.push(`/products/${product.slug}`)}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={product.imagePath}
                    alt={product.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        minHeight: '3.5rem',
                        fontSize: '1rem',
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Typography variant="h5" color="primary" fontWeight={600}>
                      {formatINR(product.pricePaise)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
