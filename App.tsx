import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './redux/store';

import Home from './components/home/Home';
import Splash from './components/splash/Splash';
import FullscreenVideo from './components/fullscreen/FullscreenVideo';
import QuizLanding from './components/quiz/landing';
import {
  COLOR_DARK_BROWN,
  PATH_FULLSCREEN,
  PATH_HOME,
  PATH_QUIZ_LANDING,
  PATH_SPLASH,
} from './utils/constants';
import {RootStackParamList} from './definitions/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const noHeader = () => null;

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar animated={true} backgroundColor={COLOR_DARK_BROWN} />
        <View style={styles.wrapper}>
          <RootStack.Navigator initialRouteName={PATH_SPLASH}>
            <RootStack.Screen name={PATH_SPLASH} options={{header: noHeader}} component={Splash} />
            <RootStack.Screen name={PATH_HOME} options={{header: noHeader}} component={Home} />
            <RootStack.Screen
              name={PATH_FULLSCREEN}
              options={{header: noHeader}}
              component={FullscreenVideo}
            />
            <RootStack.Screen
              name={PATH_QUIZ_LANDING}
              options={{header: noHeader}}
              component={QuizLanding}
            />
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
