import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';  // Import the theme file
import { UserProvider } from './Context/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>  {/* Use the custom theme */}
      <BrowserRouter>
      <UserProvider>
        <App />
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
