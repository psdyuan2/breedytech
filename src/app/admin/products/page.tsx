import { prisma } from '@/lib/prisma';
import AdminLayout from '@/components/AdminLayout';
import AdminProductsContent from './AdminProductsContent';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <AdminLayout>
      <AdminProductsContent products={products} />
    </AdminLayout>
  );
}
