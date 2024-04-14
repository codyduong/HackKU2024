import type { Metadata } from 'next';
import { Atkinson_Hyperlegible } from 'next/font/google';
import './globals.css';
import StyledComponentsRegistry from './registry';
import SessionWrapper from './session';
import { Providers } from './providers';

const atkin = Atkinson_Hyperlegible({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Beacon Board',
  description: 'Empowering communities and individuals',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <SessionWrapper>
      <StyledComponentsRegistry>
        <html lang="en">
          <body className={atkin.className}>
            <Providers>{children}</Providers>
          </body>
        </html>
      </StyledComponentsRegistry>
    </SessionWrapper>
  );
}
