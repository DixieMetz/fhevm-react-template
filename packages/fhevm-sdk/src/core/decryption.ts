/**
 * FHEVM Decryption Utilities
 * Provides functions to decrypt encrypted values
 */

import type { FhevmInstance } from './instance';
import type { Signer } from 'ethers';

/**
 * Decrypt a value using user signature (EIP-712)
 * Requires user to sign a message proving ownership
 * @param fhevm - FHEVM instance
 * @param signer - Ethers signer for EIP-712 signature
 * @param contractAddress - Contract address containing the encrypted data
 * @param ciphertext - Encrypted value to decrypt
 * @returns Decrypted value as bigint
 */
export async function userDecrypt(
  fhevm: FhevmInstance,
  signer: Signer,
  contractAddress: string,
  ciphertext: string
): Promise<bigint> {
  try {
    const userAddress = await signer.getAddress();

    // Create EIP-712 signature for decryption
    const domain = {
      name: 'FHEVM',
      version: '1',
      chainId: fhevm.config.chainId,
      verifyingContract: contractAddress,
    };

    const types = {
      Decryption: [
        { name: 'ciphertext', type: 'bytes' },
      ],
    };

    const value = {
      ciphertext,
    };

    // Sign the decryption request
    const signature = await signer.signTypedData(domain, types, value);

    // Request decryption from gateway
    const decrypted = await fhevm.instance.decrypt(ciphertext, signature);

    return BigInt(decrypted);
  } catch (error) {
    console.error('User decryption failed:', error);
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypt a publicly accessible encrypted value
 * Does not require signature - only for public values
 * @param fhevm - FHEVM instance
 * @param ciphertext - Encrypted value to decrypt
 * @returns Decrypted value as bigint
 */
export async function publicDecrypt(
  fhevm: FhevmInstance,
  ciphertext: string
): Promise<bigint> {
  try {
    const decrypted = await fhevm.instance.decrypt(ciphertext);
    return BigInt(decrypted);
  } catch (error) {
    console.error('Public decryption failed:', error);
    throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Decrypt multiple ciphertexts in batch
 * @param fhevm - FHEVM instance
 * @param signer - Ethers signer for EIP-712 signature
 * @param contractAddress - Contract address
 * @param ciphertexts - Array of encrypted values
 * @returns Array of decrypted values
 */
export async function decryptBatch(
  fhevm: FhevmInstance,
  signer: Signer,
  contractAddress: string,
  ciphertexts: string[]
): Promise<bigint[]> {
  return Promise.all(
    ciphertexts.map(ct => userDecrypt(fhevm, signer, contractAddress, ct))
  );
}
