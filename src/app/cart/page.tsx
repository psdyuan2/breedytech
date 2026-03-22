'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { formatINR } from '@/lib/constants';
import StorefrontLayout from '@/components/StorefrontLayout';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPaise } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <StorefrontLayout>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Add some products to get started!
            </Typography>
            <Button variant="contained" onClick={() => router.push('/products')}>
              Browse Products
            </Button>
          </Box>
        </Container>
      </StorefrontLayout>
    );
  }

  return (
    <StorefrontLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600} mb={3}>
          Shopping Cart
        </Typography>

        {items.map((item) => (
          <Card key={item.productId} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box
                  component="img"
                  src={item.imagePath}
                  alt={item.name}
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />

                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight={600}>
                    {formatINR(item.pricePaise)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    alignItems: 'center',
                  }}
                >
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.productId, parseInt(e.target.value) || 1)
                    }
                    inputProps={{ min: 1 }}
                    sx={{ width: 80 }}
                    size="small"
                  />

                  <IconButton
                    color="error"
                    onClick={() => removeItem(item.productId)}
                    sx={{ minWidth: 44, minHeight: 44 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal: {formatINR(item.pricePaise * item.quantity)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            Total
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={700}>
            {formatINR(totalPaise)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => router.push('/products')}
          >
            Continue Shopping
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push('/checkout')}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Container>
    </StorefrontLayout>
  );
}
