import React from 'react';

export interface Proposal {
    id: number;
    title: string;
    amount: number;
    status: 'active' | 'passed' | 'failed';
    votes: { yes: number, no: number };
}

export const ProposalCard = ({ proposal }: { proposal: Proposal }) => {
    return (
        <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ margin: 0, color: 'var(--color-primary)' }}>{proposal.title}</h3>
                <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    background: proposal.status === 'active' ? 'rgba(0, 255, 204, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: proposal.status === 'active' ? 'var(--color-primary)' : 'var(--text-secondary)'
                }}>
                    {proposal.status.toUpperCase()}
                </span>
            </div>
            <p style={{ fontSize: '1.25rem', fontWeight: 600, margin: '1rem 0' }}>{proposal.amount} STX</p>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ flex: 1, height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                        width: `${(proposal.votes.yes / (proposal.votes.yes + proposal.votes.no || 1)) * 100}%`,
                        height: '100%',
                        background: 'var(--color-primary)'
                    }} />
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {proposal.votes.yes} / {proposal.votes.no}
                </span>
            </div>

            <button className="glass-button" style={{ width: '100%', marginTop: '1.5rem', padding: '10px' }}>
                View Details & Vote
            </button>
        </div>
    );
};
