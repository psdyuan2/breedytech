import type { Metadata, Viewport } from "next";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { CartProvider } from "@/components/CartProvider";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Quality Gear for India`,
  description: "Shop the latest gear and equipment at great prices. Fast delivery across India.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <CartProvider>{children}</CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
