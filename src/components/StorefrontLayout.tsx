'use client';

import * as React from 'react';
import AppHeader from './AppHeader';
import { useCart } from './CartProvider';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { totalItems } = useCart();

  return (
    <>
      <AppHeader cartCount={totalItems} />
      {children}
    </>
  );
}
