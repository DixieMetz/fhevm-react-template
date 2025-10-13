/**
 * React Context Provider for FHEVM
 * Provides FHEVM instance to all child components
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { createFhevmInstance, type FhevmConfig, type FhevmInstance } from '../core/instance';

interface FhevmContextValue {
  instance: FhevmInstance | null;
  isReady: boolean;
  error: Error | null;
}

const FhevmContext = createContext<FhevmContextValue | undefined>(undefined);

interface FhevmProviderProps {
  config: FhevmConfig;
  children: ReactNode;
}

/**
 * Provider component that initializes and provides FHEVM instance
 * @example
 * ```tsx
 * <FhevmProvider config={{ chainId: 11155111, rpcUrl: '...' }}>
 *   <App />
 * </FhevmProvider>
 * ```
 */
export function FhevmProvider({ config, children }: FhevmProviderProps) {
  const [instance, setInstance] = useState<FhevmInstance | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function initializeFhevm() {
      try {
        setIsReady(false);
        setError(null);

        const fhevmInstance = await createFhevmInstance(config);

        if (mounted) {
          setInstance(fhevmInstance);
          setIsReady(true);
        }
      } catch (err) {
        if (mounted) {
          const error = err instanceof Error ? err : new Error('Failed to initialize FHEVM');
          setError(error);
          setIsReady(false);
        }
      }
    }

    initializeFhevm();

    return () => {
      mounted = false;
    };
  }, [config.chainId, config.rpcUrl]);

  const value: FhevmContextValue = {
    instance,
    isReady,
    error,
  };

  return <FhevmContext.Provider value={value}>{children}</FhevmContext.Provider>;
}

/**
 * Hook to access FHEVM context
 * Must be used within FhevmProvider
 */
export function useFhevmContext(): FhevmContextValue {
  const context = useContext(FhevmContext);

  if (context === undefined) {
    throw new Error('useFhevmContext must be used within FhevmProvider');
  }

  return context;
}
