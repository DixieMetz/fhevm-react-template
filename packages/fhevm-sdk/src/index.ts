/**
 * Universal FHEVM SDK
 * Framework-agnostic FHE encryption/decryption utilities
 */

// Core utilities (framework-agnostic)
export {
  createFhevmInstance,
  getFhevmInstance,
  destroyFhevmInstance,
} from './core/instance';

export {
  encryptBool,
  encryptU8,
  encryptU16,
  encryptU32,
  encryptU64,
  encryptAddress,
  encryptBatch,
  encrypt,
} from './core/encryption';

export {
  userDecrypt,
  publicDecrypt,
  decryptBatch,
} from './core/decryption';

// Type definitions
export type {
  FhevmConfig,
  FhevmInstance,
  EncryptionType,
  EncryptedValue,
  DecryptedValue,
  EncryptOptions,
  DecryptOptions,
} from './types';
