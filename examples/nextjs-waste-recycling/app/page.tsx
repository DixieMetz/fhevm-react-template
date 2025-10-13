'use client';

/**
 * Confidential Waste Recycling - Main Page
 * Demonstrates FHEVM SDK integration in Next.js
 */

import { useState } from 'react';
import { useEncrypt, useFhevm } from 'fhevm-sdk/react';
import { ethers } from 'ethers';
import WasteReportForm from '../components/WasteReportForm';
import ContractInfo from '../components/ContractInfo';

export default function HomePage() {
  const { isReady, error } = useFhevm();
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState<string>('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        setWalletConnected(true);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  if (error) {
    return (
      <div className="container">
        <div className="error-box">
          <h2>⚠️ FHEVM Initialization Error</h2>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  if (!isReady) {
    return (
      <div className="container">
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Initializing FHEVM SDK...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="container">
      <header className="header">
        <h1>🔐 Confidential Waste Recycling</h1>
        <p className="subtitle">Privacy-preserving waste management with FHEVM</p>
      </header>

      <ContractInfo />

      {!walletConnected ? (
        <div className="connect-section">
          <button className="btn-primary" onClick={connectWallet}>
            Connect Wallet
          </button>
          <p className="help-text">Connect MetaMask to submit encrypted waste reports</p>
        </div>
      ) : (
        <div>
          <div className="account-info">
            <span className="label">Connected:</span>
            <code className="address">{account.slice(0, 6)}...{account.slice(-4)}</code>
          </div>

          <WasteReportForm account={account} />
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          color: #1a1a1a;
        }

        .subtitle {
          color: #666;
          font-size: 1.1rem;
        }

        .loading-box, .error-box {
          text-align: center;
          padding: 3rem;
          background: #f5f5f5;
          border-radius: 12px;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #3498db;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .error-box {
          background: #fee;
          color: #c00;
        }

        .connect-section {
          text-align: center;
          padding: 3rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          color: white;
        }

        .btn-primary {
          background: white;
          color: #667eea;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.2s;
        }

        .btn-primary:hover {
          transform: scale(1.05);
        }

        .help-text {
          margin-top: 1rem;
          opacity: 0.9;
        }

        .account-info {
          background: #f0f9ff;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .label {
          font-weight: 600;
          color: #0369a1;
        }

        .address {
          background: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: monospace;
        }
      `}</style>
    </main>
  );
}
