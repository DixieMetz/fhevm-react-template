# FHEVM SDK

Universal, framework-agnostic FHEVM SDK for building confidential dApps.

## Installation

```bash
npm install fhevm-sdk ethers
```

## Quick Start

### Framework-Agnostic (Core)

```typescript
import { createFhevmInstance, encryptU32, userDecrypt } from 'fhevm-sdk';

// Initialize
const fhevm = await createFhevmInstance({
  chainId: 11155111,
  rpcUrl: 'https://rpc.sepolia.org'
});

// Encrypt
const encrypted = await encryptU32(fhevm, 100);

// Decrypt
const decrypted = await userDecrypt(fhevm, signer, contractAddress, ciphertext);
```

### React Integration

```tsx
import { FhevmProvider, useFhevm, useEncrypt } from 'fhevm-sdk/react';

// Wrap your app
<FhevmProvider config={{ chainId: 11155111, rpcUrl: '...' }}>
  <App />
</FhevmProvider>

// Use in components
function Component() {
  const { isReady } = useFhevm();
  const { encrypt } = useEncrypt();

  const handleSubmit = async (value: number) => {
    const encrypted = await encrypt(value);
    await contract.submitData(encrypted);
  };
}
```

## API

### Core Functions

- `createFhevmInstance(config)` - Initialize FHEVM
- `encryptBool/U8/U16/U32/U64/Address()` - Encrypt values
- `userDecrypt()` - Decrypt with EIP-712 signature
- `publicDecrypt()` - Decrypt public values
- `encryptBatch()` / `decryptBatch()` - Batch operations

### React Hooks

- `<FhevmProvider>` - Context provider
- `useFhevm()` - Access FHEVM instance
- `useEncrypt()` - Encryption utilities

## License

MIT
