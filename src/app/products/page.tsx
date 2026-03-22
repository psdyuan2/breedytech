import { prisma } from '@/lib/prisma';
import StorefrontLayout from '@/components/StorefrontLayout';
import ProductsGrid from './ProductsGrid';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <StorefrontLayout>
      <ProductsGrid products={products} />
    </StorefrontLayout>
  );
}
