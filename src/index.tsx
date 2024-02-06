import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './types/styles/GlobalStyles';
import AuthContextProvider from './context/AuthContext';
import { ModalProvider } from './hooks/useModal';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <AuthContextProvider>
        <ModalProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </ModalProvider>
        <GlobalStyle />
      </AuthContextProvider>
    </RecoilRoot>
  </QueryClientProvider>
);

reportWebVitals();
