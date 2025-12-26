import React from 'react';

const CATEGORIES = ['All', 'Youth', 'Crisis Support', 'Research', 'Community'];

export const ProposalFilters = ({ activeCategory, onCategoryChange }: {
    activeCategory: string,
    onCategoryChange: (category: string) => void
}) => {
    return (
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(category => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className="glass-button"
                    style={{
                        padding: '8px 16px',
                        fontSize: '0.85rem',
                        background: activeCategory === category ? 'var(--color-primary)' : 'rgba(255,255,255,0.05)',
                        borderColor: activeCategory === category ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)',
                        color: activeCategory === category ? 'var(--bg-dark)' : 'var(--text-primary)'
                    }}
                >
                    {category}
                </button>
            ))}
        </div>
    );
};
