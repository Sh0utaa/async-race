import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import App from './App.tsx';
// import GarageView from './views/Garage.view.tsx';
// import WinnersView from './views/Winners.view.tsx';
import NotFoundView from './views/NotFound.view.tsx';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/garage', element: <App /> },
  { path: '/winners', element: <App /> },
  { path: '*', element: <NotFoundView /> },
]);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>,
);
