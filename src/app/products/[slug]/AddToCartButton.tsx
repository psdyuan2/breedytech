'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '@/components/CartProvider';

interface Product {
  id: string;
  slug: string;
  name: string;
  pricePaise: number;
  imagePath: string;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = React.useState(1);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        pricePaise: product.pricePaise,
        imagePath: product.imagePath,
      },
      quantity
    );
    setSnackbarOpen(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
        <TextField
          type="number"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
          inputProps={{ min: 1 }}
          sx={{ width: 120 }}
        />
        <Button
          variant="contained"
          size="large"
          startIcon={<AddShoppingCartIcon />}
          onClick={handleAddToCart}
          sx={{ px: 4 }}
        >
          Add to Cart
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          Added to cart successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
