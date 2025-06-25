// components/Topbar.jsx
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

function Topbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const input = document.getElementById('search-bar');
    const q = input?.value.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  useEffect(() => {
    const input = document.getElementById('search-bar');
    const keyListener = (e) => {
      if (e.key === 'Enter') handleSearch();
    };
    input?.addEventListener('keydown', keyListener);
    return () => input?.removeEventListener('keydown', keyListener);
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-between px-3 py-2 shadow-sm bg-light position-sticky top-0"
      style={{ zIndex: 1030 }}
    >
      {location.pathname !== '/' && document.referrer !== '' && (
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => window.history.back()}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
      )}
      <div className="ms-auto" style={{ width: 250 }}>
        <div className="input-group input-group-sm">
          <input
            type="text"
            className="form-control"
            id="search-bar"
            placeholder="Search characters..."
          />
          <button className="btn btn-outline-primary" id="search-btn" onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
