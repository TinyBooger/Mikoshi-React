// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import WelcomePage from './WelcomePage';
import { useNavigate } from 'react-router';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function HomePage() {
  const [user, setUser] = useState(null);
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/api/current-user`, { credentials: 'include' })
      .then(async res => {
        if (res.ok) setUser(await res.json());
      });

    fetch(`${API_BASE}/api/characters/popular`, { credentials: 'include' })
      .then(res => res.json())
      .then(setPopular);
  }, []);

  if (!user) return <WelcomePage onLoginSuccess={setUser} />;

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <div style={{ width: 250, flexShrink: 0 }}><Sidebar /></div>
      <div className="d-flex flex-column flex-grow-1 overflow-hidden">
        <div className="flex-shrink-0"><Topbar /></div>
        <main className="flex-grow-1 p-4 overflow-auto">
          <h2>Character Library</h2>
          <section className="mb-4">
            <h4>Popular Characters</h4>
            <div className="d-flex flex-row overflow-auto gap-3">
              {popular.map(c => (
                <div
                  key={c.id}
                  className="card text-center"
                  style={{ width: 150, margin: 5, cursor: 'pointer' }}
                  onClick={() => navigate(`/chat?character=${encodeURIComponent(c.id)}`)}
                >
                  <img src={c.picture || '/static/default.png'} className="card-img-top" alt={c.name} style={{ borderRadius: 8 }} />
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1">{c.name}</h6>
                    <p className="text-muted" style={{ fontSize: 12 }}>❤️ {c.views}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-4">
            <h4>Recently Uploaded</h4>
            <div className="d-flex flex-row overflow-auto gap-3"></div>
          </section>
          <section className="mb-4">
            <h4>Recommended for You</h4>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"></div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
