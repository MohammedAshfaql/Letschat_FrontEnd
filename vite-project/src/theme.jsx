// theme.js

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',  // Default color mode
    useSystemColorMode: false,  // Disable system color mode
  },
  colors: {
    light: {
      background: '#f0f0f0',  // Static light background color
      text: '#333',            // Light mode text color
      buttonBg: '#4CAF50',
      buttonHoverBg: '#45a049',
      iconColor: '#000',       // Light mode icon color
    },
    dark: {
      background: '#f0f0f0',  // Static background color (same for dark mode)
      text: '#f7fafc',         // Dark mode text color
      buttonBg: '#2d3748',
      buttonHoverBg: '#4a5568',
      iconColor: '#fff',       // Dark mode icon color
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'buttonBg',
          color: 'text',  // Ensure button text color changes based on theme
          _hover: {
            bg: 'buttonHoverBg',
          },
        },
      },
    },
    Text: {
      baseStyle: {
        fontFamily: 'Arial, sans-serif',
        color: 'text',  // Dynamically change text color based on theme
      },
    },
    Icon: {
      baseStyle: {
        color: 'iconColor',  // Dynamically change icon color based on theme
      },
    },
    Input: {
      baseStyle: {
        borderColor: 'gray.300',
        _hover: {
          borderColor: 'gray.400',
        },
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: 'light.background',  // Keep the background fixed for both light and dark
        color: props.colorMode === 'light' ? 'light.text' : 'dark.text',  // Dynamic text color
      },
    }),
  },
});

export default theme;
