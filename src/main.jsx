import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss';
import './i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>,
)