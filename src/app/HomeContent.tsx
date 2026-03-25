'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
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

export default function HomeContent({ products }: { products: Product[] }) {
  const router = useRouter();

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 300, sm: 400, md: 500 },
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'url(/banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            zIndex: 1,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              textAlign: 'center',
              px: 2,
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '3rem', md: '3.75rem' },
              }}
            >
              Quality Gear for Every Need
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' },
              }}
            >
              Discover amazing products at unbeatable prices
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => router.push('/products')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight={600} mb={3}>
          Featured Products
        </Typography>

        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
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

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push('/products')}
            sx={{ px: 4 }}
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </>
  );
}
