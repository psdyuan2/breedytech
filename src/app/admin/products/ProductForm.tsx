'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricePaise: number;
  imagePath: string;
  isFeatured: boolean;
}

export default function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    priceINR: product ? (product.pricePaise / 100).toString() : '',
    isFeatured: product?.isFeatured || false,
  });
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState(product?.imagePath || '');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('slug', formData.slug);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('priceINR', formData.priceINR);
      formDataToSend.append('isFeatured', formData.isFeatured.toString());

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      const url = product
        ? `/api/admin/products/${product.id}`
        : '/api/admin/products';
      const method = product ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (response.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to save product');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Stack spacing={3}>
            <TextField
              label="Product Name"
              required
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <TextField
              label="Slug"
              required
              fullWidth
              helperText="URL-friendly identifier (e.g., pressure-washer-1800w)"
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value.toLowerCase() })
              }
            />

            <TextField
              label="Description"
              required
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <TextField
              label="Price (INR)"
              required
              fullWidth
              type="number"
              inputProps={{ min: 0, step: 0.01 }}
              helperText="Enter price in Indian Rupees"
              value={formData.priceINR}
              onChange={(e) =>
                setFormData({ ...formData, priceINR: e.target.value })
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isFeatured}
                  onChange={(e) =>
                    setFormData({ ...formData, isFeatured: e.target.checked })
                  }
                />
              }
              label="Featured Product (show on homepage)"
            />

            <Box>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                sx={{ mb: 2 }}
              >
                {imageFile ? 'Change Image' : product ? 'Replace Image' : 'Upload Image'}
                <input
                  type="file"
                  hidden
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  required={!product}
                />
              </Button>

              {imagePreview && (
                <Box
                  component="img"
                  src={imagePreview}
                  alt="Preview"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 300,
                    objectFit: 'contain',
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => router.push('/admin/products')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : product ? 'Update Product' : 'Create Product'}
              </Button>
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
