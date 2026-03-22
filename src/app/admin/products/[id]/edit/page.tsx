import { notFound } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { prisma } from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import ProductForm from '../../ProductForm';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <AdminLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight={600} mb={3}>
          Edit Product
        </Typography>
        <ProductForm product={product} />
      </Container>
    </AdminLayout>
  );
}
