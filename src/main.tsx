import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import GarageView from './views/Garage.view.tsx';
import WinnersView from './views/Winners.view.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFoundView from './views/NotFound.view.tsx';

const router = createBrowserRouter([
  { path: "/", element: <App />},
  { path: "/garage", element: <GarageView />},
  { path: "/winners", element: <WinnersView />},
  { path: "*", element: <NotFoundView />},
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
