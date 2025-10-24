# 💡 FHEVM SDK Examples

Real-world examples demonstrating SDK usage in different scenarios.

---

## Table of Contents

1. [Simple Encryption](#1-simple-encryption)
2. [Confidential Voting](#2-confidential-voting)
3. [Private Auction](#3-private-auction)
4. [Encrypted Token Transfer](#4-encrypted-token-transfer)
5. [Waste Recycling (Full App)](#5-waste-recycling-full-app)
6. [Batch Operations](#6-batch-operations)
7. [React Form Integration](#7-react-form-integration)
8. [Next.js Page Example](#8-nextjs-page-example)
9. [Error Handling](#9-error-handling)
10. [Testing Encrypted Data](#10-testing-encrypted-data)

---

## 1. Simple Encryption

Basic encryption and submission to contract.

```typescript
import { createFhevmInstance, encryptU32 } from 'fhevm-sdk';
import { ethers } from 'ethers';

async function simpleExample() {
  // Initialize
  const fhevm = await createFhevmInstance({
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org'
  });

  // Encrypt
  const plainValue = 42;
  const encrypted = await encryptU32(fhevm, plainValue);

  // Submit to contract
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const tx = await contract.submitValue(encrypted);
  await tx.wait();

  console.log('Value submitted successfully!');
}
```

---

## 2. Confidential Voting

Private voting system where individual votes remain secret.

```typescript
import { createFhevmInstance, encryptBool } from 'fhevm-sdk';

async function vote(proposalId: number, voteYes: boolean) {
  const fhevm = await createFhevmInstance({
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org'
  });

  // Encrypt vote (true = YES, false = NO)
  const encryptedVote = await encryptBool(fhevm, voteYes);

  // Submit to voting contract
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const votingContract = new ethers.Contract(
    votingContractAddress,
    votingABI,
    signer
  );

  const tx = await votingContract.castVote(proposalId, encryptedVote);
  await tx.wait();

  console.log(`Vote cast for proposal ${proposalId}`);
}

// Usage
await vote(1, true); // Vote YES on proposal 1
await vote(2, false); // Vote NO on proposal 2
```

---

## 3. Private Auction

Sealed-bid auction where bids are kept confidential.

```typescript
import { createFhevmInstance, encryptU64 } from 'fhevm-sdk';

async function placeBid(auctionId: number, bidAmount: bigint) {
  const fhevm = await createFhevmInstance({
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org'
  });

  // Encrypt bid amount
  const encryptedBid = await encryptU64(fhevm, bidAmount);

  // Submit to auction contract
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const auctionContract = new ethers.Contract(
    auctionAddress,
    auctionABI,
    signer
  );

  const tx = await auctionContract.placeBid(auctionId, encryptedBid);
  await tx.wait();

  console.log(`Bid placed: ${bidAmount} (encrypted)`);
}

// Usage
await placeBid(1, 1000000000000000000n); // 1 ETH in wei
```

---

## 4. Encrypted Token Transfer

Transfer tokens with encrypted amounts.

```typescript
import { createFhevmInstance, encryptU64, encryptAddress } from 'fhevm-sdk';

async function transferTokens(
  recipient: string,
  amount: bigint
) {
  const fhevm = await createFhevmInstance({
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org'
  });

  // Encrypt recipient and amount
  const encryptedRecipient = await encryptAddress(fhevm, recipient);
  const encryptedAmount = await encryptU64(fhevm, amount);

  // Submit to token contract
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const tokenContract = new ethers.Contract(
    tokenAddress,
    tokenABI,
    signer
  );

  const tx = await tokenContract.transfer(
    encryptedRecipient,
    encryptedAmount
  );
  await tx.wait();

  console.log('Transfer successful');
}

// Usage
await transferTokens(
  '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  1000000n
);
```

---

## 5. Waste Recycling (Full App)

Complete example from the included Next.js application.

```tsx
'use client';

import { FhevmProvider, useEncrypt, useFhevm } from 'fhevm-sdk/react';
import { useState } from 'react';

// Root layout
function App() {
  return (
    <FhevmProvider config={{ chainId: 11155111, rpcUrl: '...' }}>
      <WasteReportForm />
    </FhevmProvider>
  );
}

// Form component
function WasteReportForm() {
  const { isReady } = useFhevm();
  const { encryptMultiple, isEncrypting } = useEncrypt();

  const [formData, setFormData] = useState({
    plastic: '',
    paper: '',
    glass: '',
    metal: '',
    organic: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse values
    const values = [
      parseInt(formData.plastic) || 0,
      parseInt(formData.paper) || 0,
      parseInt(formData.glass) || 0,
      parseInt(formData.metal) || 0,
      parseInt(formData.organic) || 0
    ];

    // Encrypt all values in batch
    const encrypted = await encryptMultiple(values);

    // Submit to contract
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    const tx = await contract.submitReport(...encrypted);
    await tx.wait();

    console.log('Report submitted!');
  };

  if (!isReady) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Plastic (kg)"
        value={formData.plastic}
        onChange={(e) => setFormData({ ...formData, plastic: e.target.value })}
      />
      <input
        type="number"
        placeholder="Paper (kg)"
        value={formData.paper}
        onChange={(e) => setFormData({ ...formData, paper: e.target.value })}
      />
      {/* More inputs... */}

      <button type="submit" disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Submit Report'}
      </button>
    </form>
  );
}
```

---

## 6. Batch Operations

Efficiently encrypt multiple values at once.

```typescript
import { createFhevmInstance, encryptBatch } from 'fhevm-sdk';

async function batchExample() {
  const fhevm = await createFhevmInstance({
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org'
  });

  // Encrypt multiple values
  const values = [100, 200, 300, 400, 500];
  const encrypted = await encryptBatch(fhevm, values);

  console.log('Encrypted values:', encrypted);
  // ["0x...", "0x...", "0x...", "0x...", "0x..."]

  // Submit to contract
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  const tx = await contract.submitBatch(encrypted);
  await tx.wait();
}
```

---

## 7. React Form Integration

Complete form with validation and error handling.

```tsx
import { FhevmProvider, useEncrypt, useFhevm } from 'fhevm-sdk/react';
import { useState } from 'react';

function DataForm() {
  const { isReady, error: fhevmError } = useFhevm();
  const { encrypt, isEncrypting, error: encryptError } = useEncrypt();

  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!value || isNaN(Number(value))) {
      setStatus('Please enter a valid number');
      return;
    }

    try {
      setStatus('Encrypting...');
      const encrypted = await encrypt(Number(value));

      setStatus('Submitting to blockchain...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      const tx = await contract.submitData(encrypted);
      await tx.wait();

      setStatus('Success! Transaction confirmed.');
      setValue('');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  if (!isReady) return <div>Initializing FHEVM...</div>;
  if (fhevmError) return <div>Error: {fhevmError.message}</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter value"
        disabled={isEncrypting}
      />
      <button type="submit" disabled={isEncrypting || !value}>
        {isEncrypting ? 'Processing...' : 'Submit'}
      </button>
      {status && <div className="status">{status}</div>}
      {encryptError && <div className="error">{encryptError.message}</div>}
    </form>
  );
}
```

---

## 8. Next.js Page Example

Complete Next.js page with App Router.

```tsx
// app/page.tsx
'use client';

import { useEncrypt } from 'fhevm-sdk/react';
import { useState } from 'react';

export default function HomePage() {
  const { encrypt, isEncrypting } = useEncrypt();
  const [result, setResult] = useState('');

  const handleEncrypt = async () => {
    const encrypted = await encrypt(100);
    setResult(encrypted);
  };

  return (
    <main>
      <h1>FHEVM Encryption Example</h1>
      <button onClick={handleEncrypt} disabled={isEncrypting}>
        {isEncrypting ? 'Encrypting...' : 'Encrypt Value'}
      </button>
      {result && (
        <div>
          <p>Encrypted Result:</p>
          <code>{result}</code>
        </div>
      )}
    </main>
  );
}

// app/layout.tsx
import { FhevmProvider } from 'fhevm-sdk/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FhevmProvider config={{
          chainId: 11155111,
          rpcUrl: process.env.NEXT_PUBLIC_RPC_URL
        }}>
          {children}
        </FhevmProvider>
      </body>
    </html>
  );
}
```

---

## 9. Error Handling

Comprehensive error handling patterns.

```typescript
import { createFhevmInstance, encryptU32 } from 'fhevm-sdk';

async function robustExample() {
  let fhevm;

  // Initialize with error handling
  try {
    fhevm = await createFhevmInstance({
      chainId: 11155111,
      rpcUrl: 'https://rpc.sepolia.org'
    });
  } catch (error) {
    console.error('Failed to initialize FHEVM:', error);
    throw new Error('FHEVM initialization failed');
  }

  // Encrypt with validation
  try {
    const value = 100;

    if (value < 0 || value > 4294967295) {
      throw new Error('Value out of range for uint32');
    }

    const encrypted = await encryptU32(fhevm, value);
    return encrypted;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw error;
  }
}

// React hook with error handling
function useRobustEncrypt() {
  const { encrypt } = useEncrypt();
  const [error, setError] = useState(null);

  const safeEncrypt = async (value) => {
    try {
      setError(null);
      return await encrypt(value);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { encrypt: safeEncrypt, error };
}
```

---

## 10. Testing Encrypted Data

Testing patterns for encrypted values.

```typescript
import { createFhevmInstance, encryptU32, publicDecrypt } from 'fhevm-sdk';

async function testEncryption() {
  const fhevm = await createFhevmInstance({
    chainId: 11155111,
    rpcUrl: 'https://rpc.sepolia.org'
  });

  // Test encryption
  const originalValue = 42;
  const encrypted = await encryptU32(fhevm, originalValue);

  console.log('Original:', originalValue);
  console.log('Encrypted:', encrypted);

  // Submit to contract and retrieve
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);

  await contract.submitValue(encrypted);
  const retrievedCiphertext = await contract.getValue();

  // Decrypt and verify
  const decrypted = await publicDecrypt(fhevm, retrievedCiphertext);

  console.log('Decrypted:', decrypted);
  console.log('Match:', BigInt(originalValue) === decrypted);
}
```

---

## Additional Resources

- [SDK Guide](./SDK_GUIDE.md) - Complete SDK documentation
- [Quick Start](./QUICK_START.md) - Get started in <10 lines
- [API Reference](./API_REFERENCE.md) - Full API documentation
- [Live Example](https://fhe-waste-recycling.vercel.app/) - Working application

---

<div align="center">

**More examples coming soon!**

Contribute your examples on [GitHub](https://github.com/DixieMetz/fhevm-react-template)

</div>
