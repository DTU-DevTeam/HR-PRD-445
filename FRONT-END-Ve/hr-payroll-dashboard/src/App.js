import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import AppRoutes from './routes/AppRoutes';
import theme from './theme';
import { AuthProvider } from './features/auth/context/AuthContext';
import Notification from './components/Notification';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
          <Notification />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;