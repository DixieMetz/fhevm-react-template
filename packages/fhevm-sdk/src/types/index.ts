/**
 * TypeScript Type Definitions for FHEVM SDK
 */

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

export type EncryptionType = 'bool' | 'u8' | 'u16' | 'u32' | 'u64' | 'address';

export type EncryptedValue<T extends EncryptionType> = string & { __type?: T };

export type DecryptedValue = bigint;

export interface EncryptOptions {
  type: EncryptionType;
}

export interface DecryptOptions {
  requireSignature?: boolean;
  contractAddress?: string;
}
