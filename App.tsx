/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View} from 'react-native';
import {NativeBaseProvider, Box, extendTheme} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MI from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import Login from './components/login/Login';

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

  function HomeScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
      </View>
    );
  }

  function SettingsScreen() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme}>
        <Box flex={1}>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                if (route.name === 'Leaderboard') {
                  return <MI name="leaderboard" size={size} color={color} />;
                }
                if (route.name === 'Clips') {
                  return <Octicons name="video" size={size} color={color} />;
                }
                if (route.name === 'Profile') {
                  return <MI name="account-circle" size={size} color={color} />;
                }

                let iconName = '';

                if (route.name === 'Home') {
                  iconName = focused ? 'md-home-sharp' : 'md-home-outline';
                } else if (route.name === 'Notifications') {
                  iconName = focused ? 'notifications' : 'notifications-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Leaderboard" component={SettingsScreen} />
            <Tab.Screen name="Clips" component={SettingsScreen} />
            <Tab.Screen
              name="Notifications"
              component={SettingsScreen}
              options={{tabBarBadge: 3}}
            />
            <Tab.Screen name="Profile" component={SettingsScreen} />
          </Tab.Navigator>
        </Box>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
