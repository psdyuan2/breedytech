import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/session';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const priceINR = formData.get('priceINR') as string;
    const isFeatured = formData.get('isFeatured') === 'true';
    const imageFile = formData.get('image') as File | null;

    if (!name || !slug || !description || !priceINR) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.product.findFirst({
      where: { slug, id: { not: id } },
    });
    if (existing) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    let imagePath: string | undefined;

    if (imageFile) {
      const uploadsDir = join(process.cwd(), 'public', 'uploads', 'products');
      await mkdir(uploadsDir, { recursive: true });

      const ext = imageFile.name.split('.').pop();
      const filename = `${slug}-${Date.now()}.${ext}`;
      const filepath = join(uploadsDir, filename);

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await writeFile(filepath, buffer);

      imagePath = `/uploads/products/${filename}`;
    }

    const pricePaise = Math.round(parseFloat(priceINR) * 100);

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        pricePaise,
        isFeatured,
        ...(imagePath && { imagePath }),
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Product update failed:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Product deletion failed:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
