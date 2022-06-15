import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Share} from 'react-native';
import {COLOR_BLACK, COLOR_BROWN, COLOR_GREY, COLOR_WHITE} from '../../utils/constants';

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
      <Text style={styles.pTxt}>
        Refer your friends to play the contests together and earn bonus points upto ₹100.
      </Text>

      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnTxt}>Invite Friends</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: COLOR_WHITE,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pTxt: {
    marginTop: 10,
    width: '60%',
    color: COLOR_BLACK,
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 10,
    width: 120,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOR_BROWN,
    borderRadius: 30,
  },
  btnTxt: {
    color: COLOR_GREY,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InviteFriend;
