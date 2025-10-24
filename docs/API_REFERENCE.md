# 📖 API Reference

Complete API documentation for the Universal FHEVM SDK.

---

## Core API

### createFhevmInstance

Creates a new FHEVM instance for encryption/decryption operations.

```typescript
function createFhevmInstance(config: FhevmConfig): Promise<FhevmInstance>
```

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `FhevmConfig` | Yes | Configuration object |
| `config.chainId` | `number` | Yes | Network chain ID (e.g., 11155111 for Sepolia) |
| `config.rpcUrl` | `string` | Yes | RPC endpoint URL |
| `config.aclAddress` | `string` | No | Custom ACL contract address |
| `config.kmsVerifierAddress` | `string` | No | Custom KMS verifier address |
| `config.gatewayUrl` | `string` | No | Custom gateway URL |

**Returns:** `Promise<FhevmInstance>`

**Example:**
```typescript
const fhevm = await createFhevmInstance({
  chainId: 11155111,
  rpcUrl: 'https://rpc.sepolia.org'
});
```

---

### getFhevmInstance

Gets the current global FHEVM instance.

```typescript
function getFhevmInstance(): FhevmInstance | null
```

**Returns:** `FhevmInstance | null` - Current instance or null if not initialized

**Example:**
```typescript
const instance = getFhevmInstance();
if (instance) {
  // Use instance
}
```

---

### destroyFhevmInstance

Destroys the current FHEVM instance and frees resources.

```typescript
function destroyFhevmInstance(): void
```

**Example:**
```typescript
destroyFhevmInstance();
```

---

## Encryption Functions

### encryptBool

Encrypts a boolean value.

```typescript
function encryptBool(fhevm: FhevmInstance, value: boolean): Promise<string>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `value`: Boolean value to encrypt

**Returns:** `Promise<string>` - Encrypted value as hex string

**Example:**
```typescript
const encrypted = await encryptBool(fhevm, true);
// Returns: "0x..."
```

---

### encryptU8

Encrypts a uint8 value (0-255).

```typescript
function encryptU8(fhevm: FhevmInstance, value: number): Promise<string>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `value`: Number between 0 and 255

**Returns:** `Promise<string>` - Encrypted value as hex string

**Throws:** Error if value is out of range

**Example:**
```typescript
const encrypted = await encryptU8(fhevm, 255);
```

---

### encryptU16

Encrypts a uint16 value (0-65535).

```typescript
function encryptU16(fhevm: FhevmInstance, value: number): Promise<string>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `value`: Number between 0 and 65535

**Returns:** `Promise<string>` - Encrypted value as hex string

**Example:**
```typescript
const encrypted = await encryptU16(fhevm, 65535);
```

---

### encryptU32

Encrypts a uint32 value.

```typescript
function encryptU32(fhevm: FhevmInstance, value: number): Promise<string>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `value`: Number between 0 and 4294967295

**Returns:** `Promise<string>` - Encrypted value as hex string

**Example:**
```typescript
const encrypted = await encryptU32(fhevm, 1000000);
```

---

### encryptU64

Encrypts a uint64 value.

```typescript
function encryptU64(fhevm: FhevmInstance, value: bigint): Promise<string>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `value`: BigInt value

**Returns:** `Promise<string>` - Encrypted value as hex string

**Example:**
```typescript
const encrypted = await encryptU64(fhevm, 999999999999n);
```

---

### encryptAddress

Encrypts an Ethereum address.

```typescript
function encryptAddress(fhevm: FhevmInstance, address: string): Promise<string>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `address`: Ethereum address (0x... format)

**Returns:** `Promise<string>` - Encrypted value as hex string

**Throws:** Error if address format is invalid

**Example:**
```typescript
const encrypted = await encryptAddress(fhevm, '0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
```

---

### encryptBatch

Encrypts multiple uint32 values in batch.

```typescript
function encryptBatch(fhevm: FhevmInstance, values: number[]): Promise<string[]>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `values`: Array of numbers to encrypt

**Returns:** `Promise<string[]>` - Array of encrypted values

**Example:**
```typescript
const encrypted = await encryptBatch(fhevm, [100, 200, 300]);
// Returns: ["0x...", "0x...", "0x..."]
```

---

### encrypt

Generic encryption function based on type.

```typescript
function encrypt(
  fhevm: FhevmInstance,
  value: number | bigint | boolean | string,
  type: EncryptionType
): Promise<string>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `value`: Value to encrypt
- `type`: Encryption type ('bool' | 'u8' | 'u16' | 'u32' | 'u64' | 'address')

**Returns:** `Promise<string>` - Encrypted value as hex string

**Example:**
```typescript
const encrypted = await encrypt(fhevm, 100, 'u32');
```

---

## Decryption Functions

### userDecrypt

Decrypts a value using user signature (EIP-712).

```typescript
function userDecrypt(
  fhevm: FhevmInstance,
  signer: Signer,
  contractAddress: string,
  ciphertext: string
): Promise<bigint>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `signer`: Ethers signer for EIP-712 signature
- `contractAddress`: Contract address containing encrypted data
- `ciphertext`: Encrypted value to decrypt

**Returns:** `Promise<bigint>` - Decrypted value

**Example:**
```typescript
const decrypted = await userDecrypt(fhevm, signer, contractAddress, ciphertext);
console.log(decrypted); // 100n
```

---

### publicDecrypt

Decrypts a publicly accessible encrypted value.

```typescript
function publicDecrypt(
  fhevm: FhevmInstance,
  ciphertext: string
): Promise<bigint>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `ciphertext`: Encrypted value to decrypt

**Returns:** `Promise<bigint>` - Decrypted value

**Example:**
```typescript
const decrypted = await publicDecrypt(fhevm, ciphertext);
```

---

### decryptBatch

Decrypts multiple ciphertexts in batch.

```typescript
function decryptBatch(
  fhevm: FhevmInstance,
  signer: Signer,
  contractAddress: string,
  ciphertexts: string[]
): Promise<bigint[]>
```

**Parameters:**
- `fhevm`: FHEVM instance
- `signer`: Ethers signer
- `contractAddress`: Contract address
- `ciphertexts`: Array of encrypted values

**Returns:** `Promise<bigint[]>` - Array of decrypted values

**Example:**
```typescript
const decrypted = await decryptBatch(fhevm, signer, address, ciphertexts);
// Returns: [100n, 200n, 300n]
```

---

## React API

### FhevmProvider

Context provider component for FHEVM.

```typescript
function FhevmProvider({ config, children }: FhevmProviderProps): JSX.Element
```

**Props:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `config` | `FhevmConfig` | Yes | FHEVM configuration |
| `children` | `ReactNode` | Yes | Child components |

**Example:**
```tsx
<FhevmProvider config={{ chainId: 11155111, rpcUrl: '...' }}>
  <App />
</FhevmProvider>
```

---

### useFhevm

Hook to access FHEVM instance and status.

```typescript
function useFhevm(): UseFhevmReturn
```

**Returns:**

```typescript
interface UseFhevmReturn {
  instance: FhevmInstance | null;
  isReady: boolean;
  error: Error | null;
}
```

**Example:**
```tsx
const { instance, isReady, error } = useFhevm();

if (!isReady) return <Spinner />;
if (error) return <Error message={error.message} />;
```

---

### useEncrypt

Hook for encryption operations.

```typescript
function useEncrypt(): UseEncryptReturn
```

**Returns:**

```typescript
interface UseEncryptReturn {
  encrypt: (value: number) => Promise<string>;
  encryptTyped: (value: any, type: EncryptionType) => Promise<string>;
  encryptMultiple: (values: number[]) => Promise<string[]>;
  isEncrypting: boolean;
  error: Error | null;
}
```

**Example:**
```tsx
const { encrypt, encryptMultiple, isEncrypting } = useEncrypt();

const handleSubmit = async (value: number) => {
  const encrypted = await encrypt(value);
  await contract.submitData(encrypted);
};

const handleBatch = async (values: number[]) => {
  const encrypted = await encryptMultiple(values);
  await contract.submitBatch(encrypted);
};
```

---

## Type Definitions

### FhevmConfig

```typescript
interface FhevmConfig {
  chainId: number;
  rpcUrl: string;
  aclAddress?: string;
  kmsVerifierAddress?: string;
  gatewayUrl?: string;
}
```

---

### FhevmInstance

```typescript
interface FhevmInstance {
  instance: any;
  config: FhevmConfig;
}
```

---

### EncryptionType

```typescript
type EncryptionType = 'bool' | 'u8' | 'u16' | 'u32' | 'u64' | 'address';
```

---

### EncryptedValue

```typescript
type EncryptedValue<T extends EncryptionType> = string & { __type?: T };
```

---

### DecryptedValue

```typescript
type DecryptedValue = bigint;
```

---

## Error Handling

All functions may throw errors. Always use try-catch:

```typescript
try {
  const encrypted = await encryptU32(fhevm, 100);
} catch (error) {
  if (error instanceof Error) {
    console.error('Encryption failed:', error.message);
  }
}
```

Common errors:
- `FHEVM initialization failed` - Instance creation failed
- `Value must be between X and Y` - Value out of range
- `Invalid Ethereum address format` - Invalid address
- `FHEVM instance not ready` - Instance not initialized
- `Decryption failed` - Decryption operation failed

---

## Additional Resources

- [SDK Guide](./SDK_GUIDE.md)
- [Quick Start](./QUICK_START.md)
- [Examples](./EXAMPLES.md)

---

<div align="center">

**Complete API documentation for FHEVM SDK**

For more information, visit [GitHub](https://github.com/DixieMetz/fhevm-react-template)

</div>
