import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { nanoid } from 'nanoid';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, totalPaise, shippingInfo, paymentMethod } = body;

    if (!items || !totalPaise || !shippingInfo) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const orderNumber = `ZG${nanoid(10).toUpperCase()}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        totalPaise,
        status: 'paid_mock',
        shippingJson: JSON.stringify({
          ...shippingInfo,
          paymentMethod,
          items,
        }),
      },
    });

    return NextResponse.json({
      orderNumber: order.orderNumber,
      status: order.status,
    });
  } catch (error) {
    console.error('Order creation failed:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
