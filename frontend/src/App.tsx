import { Navbar } from './components/Navbar';
import './index.css';

function App() {
  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <Navbar />

      <main className="grid-dashboard">
        <section className="glass-panel" style={{ padding: '2rem' }}>
          <h2>Active Grant Proposals</h2>
          <p style={{ marginTop: '1rem' }}>No active proposals found. Submit the first one to get started.</p>

          <div style={{ marginTop: '2rem' }}>
            {/* Proposal cards will be mapped here */}
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
            <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Create Grant Proposal
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default App;
