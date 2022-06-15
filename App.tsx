import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './redux/store';

import Home from './components/home/Home';
import Splash from './components/splash/Splash';
import {COLOR_DARK_BROWN} from './utils/constants';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const noHeader = () => null;

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar animated={true} backgroundColor={COLOR_DARK_BROWN} />
        <View style={styles.wrapper}>
          <RootStack.Navigator initialRouteName="Splash">
            <RootStack.Screen name="Splash" options={{header: noHeader}} component={Splash} />
            <RootStack.Screen name="Home" options={{header: noHeader}} component={Home} />
          </RootStack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
