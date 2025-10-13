'use client';

/**
 * Contract Information Component
 * Shows deployment details
 */

export default function ContractInfo() {
  const contractAddress = '0x6a65Ea0Ce4F2fc31acFA2722d0153145dc48Cc83';
  const network = 'Sepolia';
  const chainId = 11155111;

  return (
    <div className="contract-info">
      <h3>📜 Contract Information</h3>
      <div className="info-grid">
        <div className="info-item">
          <span className="label">Network:</span>
          <span className="value">{network}</span>
        </div>
        <div className="info-item">
          <span className="label">Chain ID:</span>
          <span className="value">{chainId}</span>
        </div>
        <div className="info-item full-width">
          <span className="label">Contract:</span>
          <a
            href={`https://sepolia.etherscan.io/address/${contractAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contract-link"
          >
            <code>{contractAddress}</code>
            <span className="external-icon">↗</span>
          </a>
        </div>
      </div>

      <style jsx>{`
        .contract-info {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          border: 1px solid #e2e8f0;
        }

        h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #1e293b;
          font-size: 1.1rem;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .info-item.full-width {
          grid-column: 1 / -1;
        }

        .label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        .value {
          font-weight: 600;
          color: #0f172a;
        }

        .contract-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: #0284c7;
          text-decoration: none;
          transition: color 0.2s;
        }

        .contract-link:hover {
          color: #0369a1;
        }

        .contract-link code {
          background: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
          border: 1px solid #e2e8f0;
        }

        .external-icon {
          font-size: 1.25rem;
        }
      `}</style>
    </div>
  );
}
