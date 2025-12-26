import React from 'react';

export const Navbar = () => {
    return (
        <nav className="glass-panel" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            marginBottom: '2rem'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0, background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Mental Health Grants DAO
                </h2>
            </div>
            <div>
                <button className="glass-button">
                    Connect Wallet
                </button>
            </div>
        </nav>
    );
};
