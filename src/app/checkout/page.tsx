'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { formatINR } from '@/lib/constants';
import StorefrontLayout from '@/components/StorefrontLayout';

export default function CheckoutPage() {
  const { items, totalPaise } = useCart();
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    pinCode: '',
  });

  React.useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('zobbi-checkout-info', JSON.stringify(formData));
    router.push('/checkout/payment');
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <StorefrontLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600} mb={3}>
          Checkout
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Shipping Information
              </Typography>
              <Stack spacing={2.5} sx={{ mt: 2 }}>
                <TextField
                  label="Full Name"
                  required
                  fullWidth
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <TextField
                  label="Phone Number"
                  required
                  fullWidth
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  inputProps={{ pattern: '[0-9]{10}' }}
                />
                <TextField
                  label="Address"
                  required
                  fullWidth
                  multiline
                  rows={2}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField
                    label="City"
                    required
                    fullWidth
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                  <TextField
                    label="PIN Code"
                    required
                    fullWidth
                    value={formData.pinCode}
                    onChange={(e) =>
                      setFormData({ ...formData, pinCode: e.target.value })
                    }
                    inputProps={{ pattern: '[0-9]{6}' }}
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Order Summary
              </Typography>
              {items.map((item) => (
                <Box
                  key={item.productId}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1,
                  }}
                >
                  <Typography variant="body2">
                    {item.name} × {item.quantity}
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {formatINR(item.pricePaise * item.quantity)}
                  </Typography>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight={600}>
                  Total
                </Typography>
                <Typography variant="h6" color="primary" fontWeight={700}>
                  {formatINR(totalPaise)}
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ mt: 3, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button variant="outlined" fullWidth onClick={() => router.push('/cart')}>
              Back to Cart
            </Button>
            <Button type="submit" variant="contained" fullWidth>
              Continue to Payment
            </Button>
          </Box>
        </Box>
      </Container>
    </StorefrontLayout>
  );
}
