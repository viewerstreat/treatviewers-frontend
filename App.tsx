import React from 'react';
import {NativeBaseProvider, Box, extendTheme} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './components/home/Home';
import Splash from './components/splash/Splash';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const noHeader = () => null;

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
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Box flex={1}>
          <RootStack.Navigator initialRouteName="Splash">
            <RootStack.Screen name="Splash" options={{header: noHeader}} component={Splash} />
            <RootStack.Screen name="Home" options={{header: noHeader}} component={Home} />
          </RootStack.Navigator>
        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
