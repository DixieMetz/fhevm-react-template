/**
 * React Hook for FHEVM Instance
 * Provides access to the FHEVM instance and its status
 */

import { useFhevmContext } from './FhevmProvider';
import type { FhevmInstance } from '../core/instance';

export interface UseFhevmReturn {
  instance: FhevmInstance | null;
  isReady: boolean;
  error: Error | null;
}

/**
 * Hook to access FHEVM instance
 * @returns FHEVM instance, ready status, and error
 * @example
 * ```tsx
 * const { instance, isReady, error } = useFhevm();
 *
 * if (!isReady) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * ```
 */
export function useFhevm(): UseFhevmReturn {
  const { instance, isReady, error } = useFhevmContext();

  return {
    instance,
    isReady,
    error,
  };
}
