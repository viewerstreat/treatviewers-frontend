import React from 'react';
import {NativeBaseProvider, Box, extendTheme} from 'native-base';
import Login from './components/login/Login';

export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        700: '#182A46',
      },
      red: {
        700: '#F83836',
      },
      white: {
        700: '#FFFFFA',
      },
    },
  });

  return (
    <NativeBaseProvider theme={theme}>
      <Box flex={1}>
        <Login />
      </Box>
    </NativeBaseProvider>
  );
}
