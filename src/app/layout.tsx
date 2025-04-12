import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MaziwaChain',
  description: 'Streamlining Milk Transactions for a Sustainable Future',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-secondary p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-lg font-semibold">
              MaziwaChain
            </Link>
            <ul className="flex space-x-6">
              <li>
                <Link href="/milk-man" className="hover:text-primary">
                  Milk Man
                </Link>
              </li>
              <li>
                <Link href="/milk-shop" className="hover:text-primary">
                  Milk Shop
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-primary">
                  Admin
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
