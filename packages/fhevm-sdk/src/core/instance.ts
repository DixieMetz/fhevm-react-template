/**
 * FHEVM Instance Management
 * Creates and manages FHE instances for encryption/decryption
 */

import { createInstance } from 'fhevmjs';

export interface FhevmConfig {
  chainId: number;
  rpcUrl: string;
  aclAddress?: string;
  kmsVerifierAddress?: string;
  gatewayUrl?: string;
}

export interface FhevmInstance {
  instance: any;
  config: FhevmConfig;
}

let globalInstance: FhevmInstance | null = null;

/**
 * Create a new FHEVM instance
 * @param config - Configuration for the FHE instance
 * @returns Promise resolving to FhevmInstance
 */
export async function createFhevmInstance(config: FhevmConfig): Promise<FhevmInstance> {
  try {
    const instance = await createInstance({
      chainId: config.chainId,
      networkUrl: config.rpcUrl,
      aclAddress: config.aclAddress,
      kmsVerifierAddress: config.kmsVerifierAddress,
      gatewayUrl: config.gatewayUrl,
    });

    globalInstance = {
      instance,
      config,
    };

    return globalInstance;
  } catch (error) {
    console.error('Failed to create FHEVM instance:', error);
    throw new Error(`FHEVM initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get the current global FHEVM instance
 * @returns FhevmInstance or null if not initialized
 */
export function getFhevmInstance(): FhevmInstance | null {
  return globalInstance;
}

/**
 * Destroy the current FHEVM instance
 */
export function destroyFhevmInstance(): void {
  globalInstance = null;
}
