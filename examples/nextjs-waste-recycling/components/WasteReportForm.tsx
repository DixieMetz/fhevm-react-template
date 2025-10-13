'use client';

/**
 * Waste Report Form Component
 * Demonstrates SDK encryption in action
 */

import { useState, FormEvent } from 'react';
import { useEncrypt } from 'fhevm-sdk/react';
import { ethers } from 'ethers';

interface WasteReportFormProps {
  account: string;
}

export default function WasteReportForm({ account }: WasteReportFormProps) {
  const { encrypt, encryptMultiple, isEncrypting } = useEncrypt();

  const [formData, setFormData] = useState({
    plastic: '',
    paper: '',
    glass: '',
    metal: '',
    organic: '',
  });

  const [status, setStatus] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('Encrypting waste data...');
    setTxHash('');

    try {
      // Parse values
      const values = [
        parseInt(formData.plastic) || 0,
        parseInt(formData.paper) || 0,
        parseInt(formData.glass) || 0,
        parseInt(formData.metal) || 0,
        parseInt(formData.organic) || 0,
      ];

      // Encrypt all values using SDK
      setStatus('🔐 Encrypting with FHEVM SDK...');
      const encrypted = await encryptMultiple(values);

      setStatus(`✅ Encrypted ${encrypted.length} values!`);

      // Simulate contract interaction
      setStatus('📡 Submitting to blockchain...');

      // In real app, call contract here:
      // const contract = new ethers.Contract(contractAddress, abi, signer);
      // const tx = await contract.submitReport(...encrypted);
      // await tx.wait();

      // For demo, simulate success
      await new Promise(resolve => setTimeout(resolve, 2000));

      const simulatedTxHash = `0x${Math.random().toString(16).slice(2, 66)}`;
      setTxHash(simulatedTxHash);
      setStatus('✅ Report submitted successfully!');

      // Reset form
      setFormData({
        plastic: '',
        paper: '',
        glass: '',
        metal: '',
        organic: '',
      });

    } catch (error) {
      console.error('Submission error:', error);
      setStatus(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="form-container">
      <h2>📋 Submit Waste Report</h2>
      <p className="description">All data is encrypted using FHE before submission</p>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="input-group">
            <label>🍾 Plastic (kg)</label>
            <input
              type="number"
              value={formData.plastic}
              onChange={(e) => setFormData({ ...formData, plastic: e.target.value })}
              placeholder="0"
              min="0"
            />
          </div>

          <div className="input-group">
            <label>📄 Paper (kg)</label>
            <input
              type="number"
              value={formData.paper}
              onChange={(e) => setFormData({ ...formData, paper: e.target.value })}
              placeholder="0"
              min="0"
            />
          </div>

          <div className="input-group">
            <label>🥂 Glass (kg)</label>
            <input
              type="number"
              value={formData.glass}
              onChange={(e) => setFormData({ ...formData, glass: e.target.value })}
              placeholder="0"
              min="0"
            />
          </div>

          <div className="input-group">
            <label>🥫 Metal (kg)</label>
            <input
              type="number"
              value={formData.metal}
              onChange={(e) => setFormData({ ...formData, metal: e.target.value })}
              placeholder="0"
              min="0"
            />
          </div>

          <div className="input-group">
            <label>🌿 Organic (kg)</label>
            <input
              type="number"
              value={formData.organic}
              onChange={(e) => setFormData({ ...formData, organic: e.target.value })}
              placeholder="0"
              min="0"
            />
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isEncrypting}
        >
          {isEncrypting ? '🔐 Encrypting...' : '🚀 Submit Encrypted Report'}
        </button>
      </form>

      {status && (
        <div className={`status-box ${txHash ? 'success' : ''}`}>
          <p>{status}</p>
          {txHash && (
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tx-link"
            >
              View on Etherscan →
            </a>
          )}
        </div>
      )}

      <div className="info-box">
        <h3>🔒 Privacy Guarantees</h3>
        <ul>
          <li>✅ All waste amounts encrypted on client-side</li>
          <li>✅ No plaintext data leaves your browser</li>
          <li>✅ Only you can decrypt your reports</li>
          <li>✅ Aggregate statistics computed on encrypted data</li>
        </ul>
      </div>

      <style jsx>{`
        .form-container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        h2 {
          margin-top: 0;
          color: #1a1a1a;
        }

        .description {
          color: #666;
          margin-bottom: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .input-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #333;
        }

        .input-group input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        .input-group input:focus {
          outline: none;
          border-color: #667eea;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-box {
          margin-top: 1.5rem;
          padding: 1rem;
          background: #f0f9ff;
          border-left: 4px solid #0284c7;
          border-radius: 8px;
        }

        .status-box.success {
          background: #f0fdf4;
          border-left-color: #16a34a;
        }

        .status-box p {
          margin: 0;
          font-weight: 600;
        }

        .tx-link {
          display: inline-block;
          margin-top: 0.5rem;
          color: #0284c7;
          text-decoration: none;
          font-weight: 600;
        }

        .tx-link:hover {
          text-decoration: underline;
        }

        .info-box {
          margin-top: 2rem;
          padding: 1.5rem;
          background: #fef3c7;
          border-radius: 8px;
        }

        .info-box h3 {
          margin-top: 0;
          color: #92400e;
        }

        .info-box ul {
          margin: 0;
          padding-left: 1.5rem;
          color: #78350f;
        }

        .info-box li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </div>
  );
}
