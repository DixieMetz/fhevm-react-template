# Next.js Waste Recycling Example

Next.js application demonstrating FHEVM SDK integration for confidential waste reporting.

## Features

- ✅ FHEVM SDK integration with `<FhevmProvider>`
- ✅ React hooks (`useFhevm`, `useEncrypt`)
- ✅ Client-side encryption before blockchain submission
- ✅ Real-time status updates
- ✅ MetaMask wallet integration
- ✅ Privacy-preserving waste data reporting

## Setup

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works

### 1. FHEVM Provider Setup (`app/layout.tsx`)

```tsx
import { FhevmProvider } from 'fhevm-sdk/react';

export default function RootLayout({ children }) {
  return (
    <FhevmProvider config={{ chainId: 11155111, rpcUrl: '...' }}>
      {children}
    </FhevmProvider>
  );
}
```

### 2. Using Hooks in Components

```tsx
import { useFhevm, useEncrypt } from 'fhevm-sdk/react';

function WasteReportForm() {
  const { isReady } = useFhevm();
  const { encrypt, encryptMultiple } = useEncrypt();

  const handleSubmit = async (data) => {
    // Encrypt multiple values
    const encrypted = await encryptMultiple([
      data.plastic,
      data.paper,
      data.glass,
      data.metal,
      data.organic
    ]);

    // Submit to contract
    await contract.submitReport(...encrypted);
  };
}
```

## SDK Integration

This example shows:

- **Provider Pattern**: Wrapping app with `FhevmProvider`
- **Hooks Usage**: `useFhevm()` and `useEncrypt()`
- **Batch Encryption**: Encrypting multiple values efficiently
- **Error Handling**: Loading states and error messages
- **Type Safety**: Full TypeScript support

## Build for Production

```bash
npm run build
npm run start
```

## Deploy

```bash
# Deploy to Vercel
vercel

# Or use any hosting platform that supports Next.js
```

## Learn More

- [FHEVM SDK Documentation](../../packages/fhevm-sdk/README.md)
- [Main README](../../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
