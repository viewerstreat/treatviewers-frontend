import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import FeedScreen from '../feed/FeedScreen';
import Leaderboards from '../leaderboards/Leaderboards';
import AppHeader from '../AppHeader';
import {COLOR_BROWN, COLOR_RED, COLOR_WHITE} from '../../utils/constants';

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
      return <MaterialCommunityIcons name="bucket-outline" size={size} color={color} />;
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
    backgroundColor: COLOR_BROWN,
    paddingBottom: 10,
    paddingTop: 10,
    height: 65,
    borderTopColor: COLOR_BROWN,
  },
  tabBarActiveTintColor: COLOR_WHITE,
  tabBarInactiveTintColor: COLOR_RED,
  headerTintColor: COLOR_WHITE,
});

function Home() {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name="Feed" component={FeedScreen} options={{header: AppHeader}} />
      <Tab.Screen name="Leaderboard" component={Leaderboards} options={{header: AppHeader}} />
      <Tab.Screen name="Clips" component={SettingsScreen} options={{header: AppHeader}} />
      <Tab.Screen
        name="Notifications"
        component={SettingsScreen}
        options={{tabBarBadge: 3, header: AppHeader}}
      />
      <Tab.Screen name="Profile" component={SettingsScreen} options={{header: AppHeader}} />
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
