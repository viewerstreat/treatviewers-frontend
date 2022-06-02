import React, {useState, useEffect, useRef} from 'react';
import {Text, ImageBackground, StyleSheet, Animated} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SPLASH_TIMEOUT} from '../../config';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

function Splash(props: Props) {
  const animation = useRef(new Animated.Value(300)).current;
  const [authLoaded, setAuthLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, SPLASH_TIMEOUT);
  }, []);

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 0,
      friction: 3,
      tension: 100,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authLoaded) {
      props.navigation.replace('Home');
    }
  }, [authLoaded, props.navigation]);

  return (
    <ImageBackground
      source={require('../../images/bgimage.png')}
      resizeMode="cover"
      style={styles.container}>
      <Animated.View style={[styles.txtContainer, {transform: [{translateY: animation}]}]}>
        <Text style={styles.txt}>Treat Viewers</Text>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtContainer: {
    borderColor: '#FFFFFA',
    borderBottomWidth: 5,
  },
  txt: {
    fontSize: 36,
    color: '#FFFFFA',
  },
});

export default Splash;
