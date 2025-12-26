import React, { useState } from 'react';

export const CreateProposalModal = ({ onClose }: { onClose: () => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '500px', position: 'relative' }}>
                <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
                <h2 style={{ marginBottom: '1.5rem' }}>Create Grant Proposal</h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="text"
                        placeholder="Proposal Title"
                        className="glass-panel"
                        style={{ padding: '1rem', border: 'var(--border-glass)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Project Description"
                        className="glass-panel"
                        style={{ padding: '1rem', border: 'var(--border-glass)', background: 'rgba(255,255,255,0.05)', color: 'white', minHeight: '100px' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Amount (STX)"
                        className="glass-panel"
                        style={{ padding: '1rem', border: 'var(--border-glass)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Recipient Address"
                        className="glass-panel"
                        style={{ padding: '1rem', border: 'var(--border-glass)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                    />
                    <button className="btn-primary" style={{ marginTop: '1rem' }}>
                        Submit Proposal
                    </button>
                </div>
            </div>
        </div>
    );
};
