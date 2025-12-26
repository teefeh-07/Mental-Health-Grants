import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CreateProposalModal } from './components/CreateProposalModal';
import { ProposalFilters } from './components/ProposalFilters';
import { ProposalCard, Proposal } from './components/ProposalCard';
import './index.css';

const MOCK_PROPOSALS: (Proposal & { category: string })[] = [
  { id: 1, title: 'Youth Mental Health Support', amount: 5000, status: 'active', votes: { yes: 1200, no: 300 }, category: 'Youth' },
  { id: 2, title: 'Crisis Hotline Expansion', amount: 15000, status: 'active', votes: { yes: 4500, no: 100 }, category: 'Crisis Support' },
  { id: 3, title: 'Psychology Research Fund', amount: 8000, status: 'passed', votes: { yes: 7000, no: 200 }, category: 'Research' },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProposals = activeCategory === 'All'
    ? MOCK_PROPOSALS
    : MOCK_PROPOSALS.filter(p => p.category === activeCategory);
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Navbar />

      <main className="grid-dashboard">
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2>Active Grant Proposals</h2>
          <div style={{ marginTop: '1.5rem' }}>
            <ProposalFilters
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
          <div style={{ marginTop: '2rem' }}>
            {filteredProposals.length > 0 ? (
              filteredProposals.map(proposal => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))
            ) : (
              <p style={{ marginTop: '1rem' }}>No active proposals found in <strong>{activeCategory}</strong>. Submit the first one to get started.</p>
            )}
          </div>
        </section>

        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3>DAO Treasury</h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, margin: '1rem 0', color: 'var(--color-primary)' }}>
              1,250,400 STX
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Allocated For Grants: 50%
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <h3>Quick Actions</h3>
            <button
              className="btn-primary"
              style={{ width: '100%', marginTop: '1rem' }}
              onClick={() => setIsModalOpen(true)}
            >
              Create Grant Proposal
            </button>
          </div>
        </aside>
      </main>

      {isModalOpen && <CreateProposalModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
