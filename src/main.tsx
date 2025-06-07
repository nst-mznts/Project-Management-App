import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import './index.scss';
import './i18n';
import store from './redux/store';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element with id "root" was not found in the document.');
}

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </Suspense>
);
