import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'admin123';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash,
    },
  });

  const products = [
    {
      slug: 'pressure-washer-1800w',
      name: '1800W 150-Bar Pressure Washer with Adjustable Nozzle',
      description: 'High-pressure washer perfect for cleaning vehicles, patios, and outdoor surfaces. Features adjustable nozzle for different spray patterns.',
      pricePaise: 850000,
      imagePath: '/placeholder-product.jpg',
      isFeatured: true,
    },
    {
      slug: 'cordless-pruning-kit',
      name: '4-in-1 Cordless Pole Pruning Kit with 2×3000mAh Battery',
      description: 'Complete pruning solution with electric shears, pole saw, 7 adjustable head angles. Includes two rechargeable batteries for extended use.',
      pricePaise: 1230000,
      imagePath: '/placeholder-product.jpg',
      isFeatured: true,
    },
    {
      slug: 'portable-wifi-router-4g',
      name: '4G Wireless Router Vehicle-mounted Portable Wi-Fi',
      description: 'Mobile 4G router perfect for vehicles and travel. Compact design with long battery life.',
      pricePaise: 310000,
      imagePath: '/placeholder-product.jpg',
      isFeatured: false,
    },
    {
      slug: 'vr-headset-4k',
      name: '4K All-in-One 3D Gaming Headset with Panoramic VR',
      description: 'Immersive VR experience with 4K resolution. All-in-one design requires no external devices.',
      pricePaise: 1850000,
      imagePath: '/placeholder-product.jpg',
      isFeatured: true,
    },
    {
      slug: 'outdoor-power-station-512wh',
      name: '512Wh Outdoor Power Station 800W Portable Energy Storage',
      description: 'Portable power station for camping and outdoor activities. 512Wh capacity with 800W output.',
      pricePaise: 2400000,
      imagePath: '/placeholder-product.jpg',
      isFeatured: false,
    },
    {
      slug: 'gaming-router-5g',
      name: '5G Dual-Band Gigabit Gaming Router with Wall-Penetrating Tech',
      description: 'High-performance gaming router with dual-band support and enhanced signal penetration.',
      pricePaise: 680000,
      imagePath: '/placeholder-product.jpg',
      isFeatured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
  }

  console.log('✓ Seeded admin user (username: admin)');
  console.log(`✓ Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
