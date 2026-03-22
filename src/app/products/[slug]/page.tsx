import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import StorefrontLayout from '@/components/StorefrontLayout';
import ProductDetail from './ProductDetail';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <StorefrontLayout>
      <ProductDetail product={product} />
    </StorefrontLayout>
  );
}
