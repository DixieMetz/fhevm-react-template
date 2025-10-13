/**
 * FHEVM Encryption Utilities
 * Provides functions to encrypt various data types
 */

import type { FhevmInstance } from './instance';

/**
 * Encrypt a boolean value
 * @param fhevm - FHEVM instance
 * @param value - Boolean to encrypt
 * @returns Encrypted value as hex string
 */
export async function encryptBool(fhevm: FhevmInstance, value: boolean): Promise<string> {
  const encrypted = fhevm.instance.encrypt_bool(value);
  return `0x${Buffer.from(encrypted).toString('hex')}`;
}

/**
 * Encrypt a uint8 value (0-255)
 * @param fhevm - FHEVM instance
 * @param value - Number to encrypt
 * @returns Encrypted value as hex string
 */
export async function encryptU8(fhevm: FhevmInstance, value: number): Promise<string> {
  if (value < 0 || value > 255) {
    throw new Error('Value must be between 0 and 255 for uint8');
  }
  const encrypted = fhevm.instance.encrypt_uint8(value);
  return `0x${Buffer.from(encrypted).toString('hex')}`;
}

/**
 * Encrypt a uint16 value (0-65535)
 * @param fhevm - FHEVM instance
 * @param value - Number to encrypt
 * @returns Encrypted value as hex string
 */
export async function encryptU16(fhevm: FhevmInstance, value: number): Promise<string> {
  if (value < 0 || value > 65535) {
    throw new Error('Value must be between 0 and 65535 for uint16');
  }
  const encrypted = fhevm.instance.encrypt_uint16(value);
  return `0x${Buffer.from(encrypted).toString('hex')}`;
}

/**
 * Encrypt a uint32 value
 * @param fhevm - FHEVM instance
 * @param value - Number to encrypt
 * @returns Encrypted value as hex string
 */
export async function encryptU32(fhevm: FhevmInstance, value: number): Promise<string> {
  if (value < 0 || value > 4294967295) {
    throw new Error('Value must be between 0 and 4294967295 for uint32');
  }
  const encrypted = fhevm.instance.encrypt_uint32(value);
  return `0x${Buffer.from(encrypted).toString('hex')}`;
}

/**
 * Encrypt a uint64 value
 * @param fhevm - FHEVM instance
 * @param value - BigInt to encrypt
 * @returns Encrypted value as hex string
 */
export async function encryptU64(fhevm: FhevmInstance, value: bigint): Promise<string> {
  const encrypted = fhevm.instance.encrypt_uint64(value);
  return `0x${Buffer.from(encrypted).toString('hex')}`;
}

/**
 * Encrypt an Ethereum address
 * @param fhevm - FHEVM instance
 * @param address - Ethereum address to encrypt
 * @returns Encrypted value as hex string
 */
export async function encryptAddress(fhevm: FhevmInstance, address: string): Promise<string> {
  if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
    throw new Error('Invalid Ethereum address format');
  }
  const encrypted = fhevm.instance.encrypt_address(address);
  return `0x${Buffer.from(encrypted).toString('hex')}`;
}

/**
 * Encrypt multiple uint32 values in batch
 * @param fhevm - FHEVM instance
 * @param values - Array of numbers to encrypt
 * @returns Array of encrypted values
 */
export async function encryptBatch(fhevm: FhevmInstance, values: number[]): Promise<string[]> {
  return Promise.all(values.map(v => encryptU32(fhevm, v)));
}

/**
 * Generic encrypt function based on type
 * @param fhevm - FHEVM instance
 * @param value - Value to encrypt
 * @param type - Type of encryption
 * @returns Encrypted value as hex string
 */
export async function encrypt(
  fhevm: FhevmInstance,
  value: number | bigint | boolean | string,
  type: 'bool' | 'u8' | 'u16' | 'u32' | 'u64' | 'address'
): Promise<string> {
  switch (type) {
    case 'bool':
      return encryptBool(fhevm, value as boolean);
    case 'u8':
      return encryptU8(fhevm, value as number);
    case 'u16':
      return encryptU16(fhevm, value as number);
    case 'u32':
      return encryptU32(fhevm, value as number);
    case 'u64':
      return encryptU64(fhevm, value as bigint);
    case 'address':
      return encryptAddress(fhevm, value as string);
    default:
      throw new Error(`Unsupported encryption type: ${type}`);
  }
}
