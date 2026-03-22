import { prisma } from '@/lib/prisma';
import StorefrontLayout from '@/components/StorefrontLayout';
import HomeContent from './HomeContent';

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { isFeatured: true },
    take: 6,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <StorefrontLayout>
      <HomeContent products={featuredProducts} />
    </StorefrontLayout>
  );
}
