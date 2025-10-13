# 🚀 Quick Start Guide - FHEVM SDK

Get started with the Universal FHEVM SDK in **less than 10 lines of code**.

---

## Installation

```bash
npm install fhevm-sdk ethers
```

---

## Method 1: Framework-Agnostic (Core SDK)

Perfect for **Node.js**, **vanilla JavaScript**, or any framework.

```typescript
import { createFhevmInstance, encryptU32, userDecrypt } from 'fhevm-sdk';

// 1. Initialize (one time)
const fhevm = await createFhevmInstance({ chainId: 11155111, rpcUrl: 'https://rpc.sepolia.org' });

// 2. Encrypt input
const encrypted = await encryptU32(fhevm, 100);

// 3. Send to contract
await contract.submitData(encrypted);

// 4. Decrypt result
const decrypted = await userDecrypt(fhevm, signer, contractAddress, ciphertext);
```

**That's it!** 8 lines of code to encrypt, submit, and decrypt.

---

## Method 2: React Hooks (wagmi-style)

Perfect for **React** and **Next.js** applications.

### Step 1: Wrap Your App

```tsx
import { FhevmProvider } from 'fhevm-sdk/react';

function App() {
  return (
    <FhevmProvider config={{ chainId: 11155111, rpcUrl: '...' }}>
      <YourComponent />
    </FhevmProvider>
  );
}
```

### Step 2: Use Hooks in Components

```tsx
import { useFhevm, useEncrypt, useDecrypt } from 'fhevm-sdk/react';

function YourComponent() {
  const { isReady } = useFhevm();
  const { encrypt } = useEncrypt();
  const { decrypt } = useDecrypt();

  const handleSubmit = async (value: number) => {
    const encrypted = await encrypt(value);
    await contract.submitData(encrypted);
    const result = await decrypt(contractAddress, ciphertext);
  };
}
```

**7 lines total!**

---

## Method 3: Vue Composables

Perfect for **Vue 3** applications.

```typescript
import { useFhevm, useEncrypt, useDecrypt } from 'fhevm-sdk/vue';

export default {
  setup() {
    const { instance, isReady } = useFhevm({ chainId: 11155111, rpcUrl: '...' });
    const { encrypt } = useEncrypt(instance);
    const { decrypt } = useDecrypt(instance);

    const submitData = async (value: number) => {
      const encrypted = await encrypt(value);
      await contract.submitData(encrypted);
    };

    return { submitData };
  }
};
```

---

## Complete Example: Confidential Waste Reporting

### Smart Contract

```solidity
contract ConfidentialWasteRecycling {
    function submitReport(uint32 plasticWeight, uint32 paperWeight) external {
        // Store encrypted data
    }
}
```

### Frontend (Next.js)

```tsx
'use client';
import { FhevmProvider, useEncrypt } from 'fhevm-sdk/react';

export default function Page() {
  return (
    <FhevmProvider config={{ chainId: 11155111, rpcUrl: process.env.NEXT_PUBLIC_RPC_URL }}>
      <Form />
    </FhevmProvider>
  );
}

function Form() {
  const { encrypt } = useEncrypt();

  const submit = async (plastic: number, paper: number) => {
    const [encPlastic, encPaper] = await Promise.all([encrypt(plastic), encrypt(paper)]);
    await contract.submitReport(encPlastic, encPaper);
  };

  return <form onSubmit={() => submit(100, 50)}>...</form>;
}
```

**9 lines of logic!**

---

## All Encryption Types

```typescript
import { encryptBool, encryptU8, encryptU16, encryptU32, encryptU64, encryptAddress } from 'fhevm-sdk';

// Boolean
const encBool = await encryptBool(fhevm, true);

// Numbers
const encU8 = await encryptU8(fhevm, 255);
const encU16 = await encryptU16(fhevm, 65535);
const encU32 = await encryptU32(fhevm, 1000000);
const encU64 = await encryptU64(fhevm, 999999999999n);

// Address
const encAddr = await encryptAddress(fhevm, '0x...');
```

---

## Decryption Methods

### User Decrypt (EIP-712 Signature)

```typescript
// Requires user signature for access control
const decrypted = await userDecrypt(fhevm, signer, contractAddress, ciphertext);
```

### Public Decrypt

```typescript
// For publicly accessible values
const decrypted = await publicDecrypt(fhevm, ciphertext);
```

---

## Batch Operations

```typescript
// Encrypt multiple values at once
const encrypted = await encryptBatch(fhevm, [100, 200, 300, 400, 500]);

// Decrypt multiple values at once
const decrypted = await decryptBatch(fhevm, ciphertexts);
```

---

## Configuration Options

```typescript
const fhevm = await createFhevmInstance({
  chainId: 11155111,              // Sepolia testnet
  rpcUrl: 'https://rpc.sepolia.org',
  aclAddress: '0x...',            // Optional: ACL contract
  kmsVerifierAddress: '0x...',    // Optional: KMS verifier
  gatewayUrl: 'https://...'       // Optional: Gateway URL
});
```

---

## Next Steps

- 📚 **Full Documentation**: See [SDK_GUIDE.md](./SDK_GUIDE.md)
- 🎨 **API Reference**: See [API_REFERENCE.md](./API_REFERENCE.md)
- 💡 **Examples**: See [EXAMPLES.md](./EXAMPLES.md)
- 🎥 **Video Tutorial**: Watch [demo.mp4](../demo.mp4)

---

## Need Help?

- GitHub Issues: [Report a problem](#)
- Zama Docs: [docs.zama.ai](https://docs.zama.ai)
- Example Code: See `examples/` directory

---

<div align="center">

**From zero to encrypted in <10 lines** 🚀

Built for the Zama FHEVM SDK Bounty

</div>
