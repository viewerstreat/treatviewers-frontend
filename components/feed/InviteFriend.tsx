import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Share} from 'react-native';

const SHARE_TXT_MSG =
  'Treat Viewers is an awesome app where you can participate in simple quizzes and win exciting prizes';

const SHARE_URL =
  'https://play.google.com/store/apps/details?id=com.application.zomato&hl=en_IN&gl=US';

const SHARE_TITLE = 'Treat Viewers';

function InviteFriend() {
  const onPress = async () => {
    console.log('onPress');
    const result = await Share.share({
      message: SHARE_TXT_MSG,
      url: SHARE_URL,
      title: SHARE_TITLE,
    });
    console.log(result);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.h1Txt}>Invite Friends</Text>
      <Text style={styles.pTxt}>
        Refer your friends and win exciting prizes. Play together with your friends.
      </Text>

      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnTxt}>Invite</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    backgroundColor: '#FFFFFA',
    padding: 10,
  },
  h1Txt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  pTxt: {
    marginTop: 10,
    alignSelf: 'center',
    width: '60%',
    textAlign: 'center',
  },
  btn: {
    marginTop: 10,
    width: 120,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F83836',
    borderRadius: 10,
  },
  btnTxt: {
    color: '#FFFFFA',
    fontWeight: 'bold',
  },
});

export default InviteFriend;
