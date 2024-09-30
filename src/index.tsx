import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './main.css';
import { PenumbraUIProvider } from '@penumbra-zone/ui/PenumbraUIProvider';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <PenumbraUIProvider>
        <App />
      </PenumbraUIProvider>
    </React.StrictMode>,
  );
}
