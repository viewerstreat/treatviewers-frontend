import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FeedScreen from '../feed/FeedScreen';

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const getScreenOptions = ({route}: {route: any}) => ({
  tabBarIcon: ({color, size}: {color: string; size: number}) => {
    if (route.name === 'Feed') {
      return <MaterialIcons name="folder-special" size={size} color={color} />;
    }
    if (route.name === 'Leaderboard') {
      return <MaterialIcons name="leaderboard" size={size} color={color} />;
    }
    if (route.name === 'Clips') {
      return <Octicons name="video" size={size} color={color} />;
    }
    if (route.name === 'Notifications') {
      return <MaterialIcons name="notifications" size={size} color={color} />;
    }
    if (route.name === 'Profile') {
      return <MaterialIcons name="account-circle" size={size} color={color} />;
    }
  },
  tabBarStyle: {
    backgroundColor: '#182A46',
    paddingBottom: 10,
    paddingTop: 10,
    height: 65,
    borderTopColor: '#182A46',
  },
  tabBarActiveTintColor: '#F83836',
  tabBarInactiveTintColor: '#FFFFFA',
  headerStyle: {backgroundColor: '#182A46'},
  headerTintColor: '#FFFFFA',
});

function Home() {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Leaderboard" component={SettingsScreen} />
      <Tab.Screen name="Clips" component={SettingsScreen} />
      <Tab.Screen name="Notifications" component={SettingsScreen} options={{tabBarBadge: 3}} />
      <Tab.Screen name="Profile" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
