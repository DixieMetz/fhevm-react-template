/**
 * React Hook for Encryption
 * Provides encryption utilities
 */

import { useState, useCallback } from 'react';
import { useFhevm } from './useFhevm';
import { encryptU32, encryptBool, encryptU8, encryptU16, encryptU64, encryptAddress, encryptBatch } from '../core/encryption';
import type { EncryptionType } from '../types';

export interface UseEncryptReturn {
  encrypt: (value: number) => Promise<string>;
  encryptTyped: (value: any, type: EncryptionType) => Promise<string>;
  encryptMultiple: (values: number[]) => Promise<string[]>;
  isEncrypting: boolean;
  error: Error | null;
}

/**
 * Hook for encrypting data
 * @returns Encryption functions and status
 * @example
 * ```tsx
 * const { encrypt, isEncrypting } = useEncrypt();
 *
 * const handleSubmit = async (value: number) => {
 *   const encrypted = await encrypt(value);
 *   await contract.submitData(encrypted);
 * };
 * ```
 */
export function useEncrypt(): UseEncryptReturn {
  const { instance, isReady } = useFhevm();
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const encrypt = useCallback(
    async (value: number): Promise<string> => {
      if (!instance || !isReady) {
        throw new Error('FHEVM instance not ready');
      }

      try {
        setIsEncrypting(true);
        setError(null);
        const encrypted = await encryptU32(instance, value);
        return encrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [instance, isReady]
  );

  const encryptTyped = useCallback(
    async (value: any, type: EncryptionType): Promise<string> => {
      if (!instance || !isReady) {
        throw new Error('FHEVM instance not ready');
      }

      try {
        setIsEncrypting(true);
        setError(null);

        let encrypted: string;
        switch (type) {
          case 'bool':
            encrypted = await encryptBool(instance, value as boolean);
            break;
          case 'u8':
            encrypted = await encryptU8(instance, value as number);
            break;
          case 'u16':
            encrypted = await encryptU16(instance, value as number);
            break;
          case 'u32':
            encrypted = await encryptU32(instance, value as number);
            break;
          case 'u64':
            encrypted = await encryptU64(instance, value as bigint);
            break;
          case 'address':
            encrypted = await encryptAddress(instance, value as string);
            break;
          default:
            throw new Error(`Unsupported type: ${type}`);
        }

        return encrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [instance, isReady]
  );

  const encryptMultiple = useCallback(
    async (values: number[]): Promise<string[]> => {
      if (!instance || !isReady) {
        throw new Error('FHEVM instance not ready');
      }

      try {
        setIsEncrypting(true);
        setError(null);
        const encrypted = await encryptBatch(instance, values);
        return encrypted;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Batch encryption failed');
        setError(error);
        throw error;
      } finally {
        setIsEncrypting(false);
      }
    },
    [instance, isReady]
  );

  return {
    encrypt,
    encryptTyped,
    encryptMultiple,
    isEncrypting,
    error,
  };
}
