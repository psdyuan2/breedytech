'use client';

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter, useSearchParams } from 'next/navigation';
import StorefrontLayout from '@/components/StorefrontLayout';

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <StorefrontLayout>
      <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 100, mb: 3 }} />
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Order Placed!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          Thank you for your purchase
        </Typography>
        {orderNumber && (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Order Number: <strong>{orderNumber}</strong>
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          You will receive a confirmation email shortly.
        </Typography>
        <Button variant="contained" size="large" onClick={() => router.push('/')}>
          Continue Shopping
        </Button>
      </Container>
    </StorefrontLayout>
  );
}
