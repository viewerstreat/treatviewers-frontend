import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  COLOR_BROWN,
  COLOR_RED,
  COLOR_WHITE,
  PATH_CLIPS,
  PATH_FEED,
  PATH_LEADERBOARD,
  PATH_NOTIFICATIONS,
  PATH_PROFILE,
} from '../../utils/constants';
import AppHeader from '../AppHeader';
import FeedStackScreen from '../feed/FeedScreen';
import Leaderboards from '../leaderboards/Leaderboards';
import ClipsScreen from '../clips/ClipsScreen';
import Login from '../login/Login';
import ProfileContainer from '../profile/ProfileContainer';
import {useAppSelector} from '../../redux/useTypedSelectorHook';
import {RootState} from '../../redux/store';
import SpinnerView from '../spinner';

import RNUpiPayment from 'react-native-upi-pay';

function SettingsScreen() {
  // function failureCallback() {
  //   console.log('failureCallback');
  // }
  // vpa: '7980420791@ibl',
  function pay() {
    RNUpiPayment.initializePayment(
      {
        vpa: '7980420791@ibl',
        payeeName: 'Sibaprasad Maiti',
        amount: '1',
        transactionRef: '0013-312-110',
        transactionNote: 'Trailsbuddy transaction',
      },
      data => {
        console.log('success', data);
      },
      data => {
        console.log('failure', data);
      },
    );
  }

  return (
    <View style={styles.container}>
      <Text onPress={pay}>Pay Here!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const getScreenOptions = ({route}: {route: any}) => ({
  tabBarIcon: ({color, size}: {color: string; size: number}) => {
    if (route.name === PATH_FEED) {
      return <MaterialCommunityIcons name="bucket-outline" size={size} color={color} />;
    }
    if (route.name === PATH_LEADERBOARD) {
      return <MaterialIcons name="leaderboard" size={size} color={color} />;
    }
    if (route.name === PATH_CLIPS) {
      return <Octicons name="video" size={size} color={color} />;
    }
    if (route.name === PATH_NOTIFICATIONS) {
      return <MaterialIcons name="notifications" size={size} color={color} />;
    }
    if (route.name === PATH_PROFILE) {
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
  const {userDetail} = useAppSelector((state: RootState) => state.user);

  return (
    <>
      <Tab.Navigator screenOptions={getScreenOptions}>
        <Tab.Screen name={PATH_FEED} component={FeedStackScreen} options={{header: AppHeader}} />
        <Tab.Screen
          name={PATH_LEADERBOARD}
          component={Leaderboards}
          options={{header: AppHeader}}
        />
        <Tab.Screen name={PATH_CLIPS} component={ClipsScreen} options={{header: AppHeader}} />
        <Tab.Screen
          name={PATH_NOTIFICATIONS}
          component={SettingsScreen}
          options={{tabBarBadge: 3, header: AppHeader}}
        />
        <Tab.Screen
          name={PATH_PROFILE}
          component={userDetail?.id ? ProfileContainer : Login}
          options={{header: AppHeader}}
        />
      </Tab.Navigator>
      <SpinnerView />
    </>
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
