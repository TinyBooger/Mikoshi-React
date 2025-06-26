// App.jsx
import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/layout';
import HomePage from './pages/HomePage';
import WelcomePage from './pages/WelcomePage'; // You need to create this

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <HomePage /> }],
  },
]);

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/current-user`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => setUser(data));
  }, []);

  if (user === undefined) return null; // wait for check
  if (!user) return <WelcomePage setUser={setUser} />;

  return <RouterProvider router={router} />;
}
