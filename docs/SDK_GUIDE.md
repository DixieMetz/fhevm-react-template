# 📚 FHEVM SDK Complete Guide

Comprehensive guide to using the Universal FHEVM SDK for building confidential dApps.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Core Concepts](#core-concepts)
4. [Framework-Agnostic Usage](#framework-agnostic-usage)
5. [React Integration](#react-integration)
6. [Next.js Integration](#nextjs-integration)
7. [Advanced Usage](#advanced-usage)
8. [Best Practices](#best-practices)
9. [Troubleshooting](#troubleshooting)
10. [API Reference](#api-reference)

---

## Introduction

The Universal FHEVM SDK provides a simple, consistent interface for encrypting and decrypting data using Fully Homomorphic Encryption (FHE) in your blockchain applications.

### Why Use This SDK?

- **Framework-Agnostic**: Works with React, Vue, Node.js, or vanilla JavaScript
- **Simple API**: Get started with less than 10 lines of code
- **Type-Safe**: Full TypeScript support with type definitions
- **Production-Ready**: Error handling, loading states, and batch operations
- **wagmi-Inspired**: Familiar API for web3 developers

---

## Installation

### NPM

```bash
npm install fhevm-sdk ethers
```

### Yarn

```bash
yarn add fhevm-sdk ethers
```

### PNPM

```bash
pnpm add fhevm-sdk ethers
```

---

## Core Concepts

### FHEVM Instance

The FHEVM instance is the core object that handles all encryption and decryption operations. You create it once and reuse it throughout your application.

```typescript
import { createFhevmInstance } from 'fhevm-sdk';

const fhevm = await createFhevmInstance({
  chainId: 11155111,        // Sepolia testnet
  rpcUrl: 'https://rpc.sepolia.org'
});
```

### Encryption Types

The SDK supports all FHE types:

| Type | Range | Function |
|------|-------|----------|
| `bool` | true/false | `encryptBool()` |
| `u8` | 0-255 | `encryptU8()` |
| `u16` | 0-65535 | `encryptU16()` |
| `u32` | 0-4294967295 | `encryptU32()` |
| `u64` | 0-2^64-1 | `encryptU64()` |
| `address` | Ethereum address | `encryptAddress()` |

### Decryption Methods

Two decryption methods are available:

1. **User Decrypt**: Requires EIP-712 signature (for private data)
2. **Public Decrypt**: No signature needed (for public encrypted data)

---

## Framework-Agnostic Usage

### Basic Setup

```typescript
import { createFhevmInstance, encryptU32, userDecrypt } from 'fhevm-sdk';
import { ethers } from 'ethers';

// 1. Initialize FHEVM
const fhevm = await createFhevmInstance({
  chainId: 11155111,
  rpcUrl: 'https://rpc.sepolia.org'
});

// 2. Encrypt data
const plainValue = 100;
const encrypted = await encryptU32(fhevm, plainValue);
console.log('Encrypted:', encrypted);

// 3. Send to smart contract
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
const contract = new ethers.Contract(contractAddress, abi, signer);

const tx = await contract.submitData(encrypted);
await tx.wait();

// 4. Decrypt result
const ciphertext = await contract.getEncryptedData();
const decrypted = await userDecrypt(fhevm, signer, contractAddress, ciphertext);
console.log('Decrypted:', decrypted);
```

### Encrypting Different Types

```typescript
import {
  encryptBool,
  encryptU8,
  encryptU16,
  encryptU32,
  encryptU64,
  encryptAddress
} from 'fhevm-sdk';

// Boolean
const encBool = await encryptBool(fhevm, true);

// Numbers
const encU8 = await encryptU8(fhevm, 255);
const encU16 = await encryptU16(fhevm, 65535);
const encU32 = await encryptU32(fhevm, 1000000);
const encU64 = await encryptU64(fhevm, 999999999999n);

// Ethereum address
const encAddr = await encryptAddress(fhevm, '0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
```

### Batch Operations

Encrypt multiple values efficiently:

```typescript
import { encryptBatch } from 'fhevm-sdk';

const values = [100, 200, 300, 400, 500];
const encrypted = await encryptBatch(fhevm, values);
// Returns: ['0x...', '0x...', '0x...', '0x...', '0x...']
```

Decrypt multiple values:

```typescript
import { decryptBatch } from 'fhevm-sdk';

const ciphertexts = ['0x...', '0x...', '0x...'];
const decrypted = await decryptBatch(fhevm, signer, contractAddress, ciphertexts);
// Returns: [100n, 200n, 300n]
```

---

## React Integration

### Provider Setup

Wrap your application with the `FhevmProvider`:

```tsx
import { FhevmProvider } from 'fhevm-sdk/react';

function App() {
  const fhevmConfig = {
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org'
  };

  return (
    <FhevmProvider config={fhevmConfig}>
      <YourComponents />
    </FhevmProvider>
  );
}
```

### Using Hooks

#### useFhevm

Access the FHEVM instance and its status:

```tsx
import { useFhevm } from 'fhevm-sdk/react';

function Component() {
  const { instance, isReady, error } = useFhevm();

  if (!isReady) return <div>Loading FHEVM...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>FHEVM Ready!</div>;
}
```

#### useEncrypt

Encrypt data with hooks:

```tsx
import { useEncrypt } from 'fhevm-sdk/react';

function EncryptionComponent() {
  const { encrypt, encryptMultiple, isEncrypting, error } = useEncrypt();

  const handleSubmit = async (value: number) => {
    try {
      const encrypted = await encrypt(value);
      await contract.submitData(encrypted);
    } catch (err) {
      console.error('Encryption failed:', err);
    }
  };

  const handleBatchSubmit = async (values: number[]) => {
    const encrypted = await encryptMultiple(values);
    await contract.submitBatch(encrypted);
  };

  return (
    <button onClick={() => handleSubmit(100)} disabled={isEncrypting}>
      {isEncrypting ? 'Encrypting...' : 'Submit'}
    </button>
  );
}
```

### Complete Example

```tsx
import { FhevmProvider, useFhevm, useEncrypt } from 'fhevm-sdk/react';
import { useState } from 'react';

function App() {
  return (
    <FhevmProvider config={{ chainId: 11155111, rpcUrl: '...' }}>
      <DataForm />
    </FhevmProvider>
  );
}

function DataForm() {
  const { isReady } = useFhevm();
  const { encrypt, isEncrypting } = useEncrypt();
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encrypted = await encrypt(Number(value));
    // Submit to contract
    console.log('Encrypted:', encrypted);
  };

  if (!isReady) return <div>Initializing...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Submit'}
      </button>
    </form>
  );
}
```

---

## Next.js Integration

### App Router (Recommended)

#### app/layout.tsx

```tsx
import { FhevmProvider } from 'fhevm-sdk/react';

export default function RootLayout({ children }) {
  const fhevmConfig = {
    chainId: 11155111,
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL!
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
```

#### app/page.tsx

```tsx
'use client';

import { useEncrypt } from 'fhevm-sdk/react';

export default function Page() {
  const { encrypt } = useEncrypt();

  const handleEncrypt = async () => {
    const encrypted = await encrypt(100);
    console.log(encrypted);
  };

  return <button onClick={handleEncrypt}>Encrypt</button>;
}
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_RPC_URL=https://rpc.sepolia.org
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### next.config.js

```javascript
module.exports = {
  transpilePackages: ['fhevm-sdk'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};
```

---

## Advanced Usage

### Custom Configuration

```typescript
const fhevm = await createFhevmInstance({
  chainId: 11155111,
  rpcUrl: 'https://rpc.sepolia.org',
  aclAddress: '0x...', // Optional: Custom ACL contract
  kmsVerifierAddress: '0x...', // Optional: Custom KMS verifier
  gatewayUrl: 'https://gateway.fhevm.io' // Optional: Custom gateway
});
```

### Error Handling

```typescript
import { createFhevmInstance, encryptU32 } from 'fhevm-sdk';

try {
  const fhevm = await createFhevmInstance({
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org'
  });

  const encrypted = await encryptU32(fhevm, 100);
} catch (error) {
  if (error instanceof Error) {
    console.error('FHEVM Error:', error.message);
  }
}
```

### Instance Management

```typescript
import { getFhevmInstance, destroyFhevmInstance } from 'fhevm-sdk';

// Get current instance
const instance = getFhevmInstance();

// Destroy instance (cleanup)
destroyFhevmInstance();
```

---

## Best Practices

### 1. Initialize Once

Create the FHEVM instance once at app startup, not on every operation:

```typescript
// ✅ Good
const fhevm = await createFhevmInstance(config);
// Reuse `fhevm` throughout app

// ❌ Bad
async function encrypt(value) {
  const fhevm = await createFhevmInstance(config); // Don't do this
  return encryptU32(fhevm, value);
}
```

### 2. Use Provider in React

Always use `<FhevmProvider>` in React applications:

```tsx
// ✅ Good
<FhevmProvider config={config}>
  <App />
</FhevmProvider>

// ❌ Bad - Creating instance in component
function Component() {
  const [fhevm, setFhevm] = useState(null);
  useEffect(() => {
    createFhevmInstance(config).then(setFhevm);
  }, []);
}
```

### 3. Handle Loading States

Always check if FHEVM is ready before using:

```tsx
const { isReady, error } = useFhevm();

if (!isReady) return <Spinner />;
if (error) return <Error message={error.message} />;
```

### 4. Batch When Possible

Use batch operations for multiple values:

```typescript
// ✅ Good - Batch operation
const encrypted = await encryptBatch(fhevm, [100, 200, 300]);

// ❌ Less efficient - Individual operations
const enc1 = await encryptU32(fhevm, 100);
const enc2 = await encryptU32(fhevm, 200);
const enc3 = await encryptU32(fhevm, 300);
```

### 5. Type Safety

Use TypeScript for better development experience:

```typescript
import type { FhevmInstance, EncryptionType } from 'fhevm-sdk';

const fhevm: FhevmInstance = await createFhevmInstance(config);
const encrypted: string = await encryptU32(fhevm, 100);
```

---

## Troubleshooting

### FHEVM not initializing

**Problem**: `createFhevmInstance()` fails or times out

**Solutions**:
- Check RPC URL is accessible
- Verify chain ID is correct
- Ensure network connection is stable
- Try different RPC provider

### Encryption fails

**Problem**: `encryptU32()` throws error

**Solutions**:
- Verify FHEVM instance is initialized
- Check value is within range for type
- Ensure instance is ready before encrypting

### React hooks not working

**Problem**: `useFhevm()` throws "must be used within FhevmProvider"

**Solution**: Wrap app with `<FhevmProvider>`:

```tsx
<FhevmProvider config={config}>
  <App />
</FhevmProvider>
```

### Next.js build errors

**Problem**: Build fails with module errors

**Solution**: Add to `next.config.js`:

```javascript
module.exports = {
  transpilePackages: ['fhevm-sdk'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};
```

---

## API Reference

See [API_REFERENCE.md](./API_REFERENCE.md) for complete API documentation.

### Quick Reference

**Core Functions**:
- `createFhevmInstance(config)` → `Promise<FhevmInstance>`
- `encryptBool(instance, value)` → `Promise<string>`
- `encryptU8/U16/U32/U64(instance, value)` → `Promise<string>`
- `encryptAddress(instance, address)` → `Promise<string>`
- `userDecrypt(instance, signer, address, ct)` → `Promise<bigint>`
- `publicDecrypt(instance, ct)` → `Promise<bigint>`

**React Hooks**:
- `useFhevm()` → `{ instance, isReady, error }`
- `useEncrypt()` → `{ encrypt, encryptMultiple, isEncrypting, error }`

---

## Additional Resources

- [Quick Start Guide](./QUICK_START.md)
- [Examples](./EXAMPLES.md)
- [API Reference](./API_REFERENCE.md)
- [Zama Documentation](https://docs.zama.ai)

---

<div align="center">

**Need help?** Open an issue on [GitHub](https://github.com/DixieMetz/fhevm-react-template)

Built with ❤️ for the Zama FHEVM ecosystem

</div>
