import React from 'react';
import {StyleSheet, View} from 'react-native';
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
  return (
    <NavigationContainer>
      <View style={styles.wrapper}>
        <RootStack.Navigator initialRouteName="Splash">
          <RootStack.Screen name="Splash" options={{header: noHeader}} component={Splash} />
          <RootStack.Screen name="Home" options={{header: noHeader}} component={Home} />
        </RootStack.Navigator>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
