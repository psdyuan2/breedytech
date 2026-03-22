'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import { formatINR } from '@/lib/constants';
import StorefrontLayout from '@/components/StorefrontLayout';

export default function PaymentPage() {
  const { items, totalPaise, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = React.useState('upi');
  const [processing, setProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (items.length === 0 && !success) {
      router.push('/cart');
    }
  }, [items, success, router]);

  const handleConfirmPayment = async () => {
    setProcessing(true);

    const checkoutInfo = localStorage.getItem('zobbi-checkout-info');
    if (!checkoutInfo) {
      router.push('/checkout');
      return;
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
            pricePaise: i.pricePaise,
          })),
          totalPaise,
          shippingInfo: JSON.parse(checkoutInfo),
          paymentMethod,
        }),
      });

      if (response.ok) {
        const order = await response.json();
        setSuccess(true);
        clearCart();
        localStorage.removeItem('zobbi-checkout-info');

        setTimeout(() => {
          router.push(`/order-success?orderNumber=${order.orderNumber}`);
        }, 2000);
      }
    } catch (error) {
      console.error('Payment failed', error);
    } finally {
      setProcessing(false);
    }
  };

  if (success) {
    return (
      <StorefrontLayout>
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" gutterBottom fontWeight={600}>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Redirecting to order confirmation...
          </Typography>
        </Container>
      </StorefrontLayout>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <StorefrontLayout>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600} mb={3}>
          Payment
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Order Total
            </Typography>
            <Typography variant="h3" color="primary" fontWeight={700}>
              {formatINR(totalPaise)}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend" sx={{ mb: 2, fontWeight: 600 }}>
                Payment Method
              </FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit / Debit Card"
                />
                <FormControlLabel
                  value="netbanking"
                  control={<Radio />}
                  label="Net Banking"
                />
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This is a demo payment. No actual transaction will occur.
          </Typography>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleConfirmPayment}
            disabled={processing}
            sx={{ py: 1.5 }}
          >
            {processing ? <CircularProgress size={24} /> : 'Confirm Payment'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Button variant="text" fullWidth onClick={() => router.push('/checkout')}>
          Back to Checkout
        </Button>
      </Container>
    </StorefrontLayout>
  );
}
