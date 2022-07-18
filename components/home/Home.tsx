import React, {useEffect} from 'react';
import {Text, View, StyleSheet, ToastAndroid} from 'react-native';
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
import FeedScreen from '../feed/FeedScreen';
import Leaderboards from '../leaderboards/Leaderboards';
import ClipsScreen from '../clips/ClipsScreen';
import Login from '../login/Login';
import ProfileContainer from '../profile/ProfileContainer';
import {useAppDispatch, useAppSelector} from '../../redux/useTypedSelectorHook';
import {RootState} from '../../redux/store';
import {errorUpdate, userDetailUpdate, userLogout} from '../../redux/userSlice';
import SpinnerView from '../spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RenewToken} from '../../services/Services';

import RNUpiPayment from 'react-native-upi-pay';

function SettingsScreen() {
  // function failureCallback() {
  //   console.log('failureCallback');
  // }
  // vpa: '7980420791@ibl',
  function pay() {
    RNUpiPayment.initializePayment(
      {
        vpa: '9051337003@upi',
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
    if (route.name === 'Feed') {
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
  const dispatch = useAppDispatch();
  const {user_detail, error} = useAppSelector((state: RootState) => state.userState);
  const {token} = useAppSelector((state: RootState) => state.tokenSlice);
  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, 3000);
      dispatch(errorUpdate(undefined));
    }
  }, [dispatch, error]);
  const retrieveUserData = async () => {
    RenewToken()
      .then(response => {
        if (!!response && !!response.data) {
          dispatch(userDetailUpdate(response.data.data));
        }
      })
      .catch(_err => {
        dispatch(userLogout());
        AsyncStorage.multiRemove(['userData', 'token']);
      });
  };
  useEffect(() => {
    retrieveUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const setuserData = async () => {
      await AsyncStorage.setItem('userData', JSON.stringify(user_detail));
    };
    if (user_detail) {
      setuserData();
    }
  }, [user_detail]);
  useEffect(() => {
    const setuserData = async (tokn: string) => {
      await AsyncStorage.setItem('token', tokn);
    };
    if (token) {
      setuserData(token);
    }
  }, [token]);
  useEffect(() => {
    const settoken = async () => {
      if (token) {
        await AsyncStorage.setItem('token', token);
      }
    };
    if (token) {
      settoken();
    }
  }, [token]);
  return (
    <>
      <Tab.Navigator screenOptions={getScreenOptions}>
        <Tab.Screen name={PATH_FEED} component={FeedScreen} options={{header: AppHeader}} />
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
          component={user_detail?.id ? ProfileContainer : Login}
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
