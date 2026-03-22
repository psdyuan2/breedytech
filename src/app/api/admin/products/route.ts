import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const priceINR = formData.get('priceINR') as string;
    const isFeatured = formData.get('isFeatured') === 'true';
    const imageFile = formData.get('image') as File;

    if (!name || !slug || !description || !priceINR || !imageFile) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'products');
    await mkdir(uploadsDir, { recursive: true });

    const ext = imageFile.name.split('.').pop();
    const filename = `${slug}-${Date.now()}.${ext}`;
    const filepath = join(uploadsDir, filename);

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await writeFile(filepath, buffer);

    const pricePaise = Math.round(parseFloat(priceINR) * 100);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        pricePaise,
        imagePath: `/uploads/products/${filename}`,
        isFeatured,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Product creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
