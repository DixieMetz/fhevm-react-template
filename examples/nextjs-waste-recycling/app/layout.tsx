/**
 * Root Layout with FHEVM Provider
 * Wraps entire app with SDK provider
 */

import { FhevmProvider } from 'fhevm-sdk/react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confidential Waste Recycling',
  description: 'Privacy-preserving waste management with FHEVM SDK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fhevmConfig = {
    chainId: 11155111, // Sepolia
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://rpc.sepolia.org',
  };

  return (
    <html lang="en">
      <body>
        <FhevmProvider config={fhevmConfig}>
          {children}
        </FhevmProvider>
      </body>
    </html>
  );
}
