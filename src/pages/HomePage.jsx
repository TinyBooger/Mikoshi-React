import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Topbar from '../components/topbar';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [user, setUser] = useState(null);
  const [popular, setPopular] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/current-user').then(async res => {
      if (res.ok) setUser(await res.json());
    });

    fetch('/api/characters/popular')
      .then(res => res.json())
      .then(setPopular);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    alert(data.message || data.detail);
    if (res.ok) {
      const user = await fetch("/api/current-user").then(r => r.json());
      setUser(user);
    }
  };

  if (!user) {
    return (
      <div className="container d-flex flex-column justify-content-center align-items-center text-center vh-100">
        <h1 className="mb-4">Welcome to Character Library</h1>
        <p className="mb-4">Discover and chat with your favorite characters.</p>
        <form onSubmit={handleLogin} className="w-100" style={{ maxWidth: 400 }}>
          <div className="mb-3">
            <input name="email" type="email" className="form-control" placeholder="Email" required />
          </div>
          <div className="mb-3">
            <input name="password" type="password" className="form-control" placeholder="Password" required />
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-dark">Login</button>
            <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/account-setup')}>Sign up</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      <div style={{ width: 250, flexShrink: 0 }}>
        <Sidebar />
      </div>

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

          {/* Placeholder sections for recent and recommended */}
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
