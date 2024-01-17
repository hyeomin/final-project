import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import GlobalStyle from './styles/GlobalStyles';
import AuthContextProvider from './context/AuthContext';
import { ModalProvider } from './hooks/useModal';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <AuthContextProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
        <GlobalStyle />
      </AuthContextProvider>
    </RecoilRoot>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
