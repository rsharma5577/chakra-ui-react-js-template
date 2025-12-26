// Chakra UI v3 Theme System
import { createSystem, defaultConfig } from '@chakra-ui/react';

// Create the system with default config
// Customize by extending defaultConfig as needed
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          50: { value: '#e6f2ff' },
          100: { value: '#b3d9ff' },
          200: { value: '#80bfff' },
          300: { value: '#4da6ff' },
          400: { value: '#1a8cff' },
          500: { value: '#0073e6' },
          600: { value: '#005cb3' },
          700: { value: '#004480' },
          800: { value: '#002d4d' },
          900: { value: '#00151a' },
        },
      },
    },
  },
});

export default system;
