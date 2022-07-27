import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {COLOR_BROWN, COLOR_LIGHT_BROWN, COLOR_RED, COLOR_WHITE} from '../../utils/constants';
import {useAppSelector} from '../../redux/useTypedSelectorHook';
import {RootState} from '../../redux/store';
import {showMessage} from '../../services/misc';

interface ProfileTopProps {
  SelectionItem?: number;
  OnSelectedItem?: any;
}

const ToggleButton = (props: any) => {
  return (
    <TouchableOpacity
      style={[
        styles.ToggleButton,
        {backgroundColor: props.id === props.SelectionItem ? COLOR_BROWN : COLOR_LIGHT_BROWN},
      ]}
      onPress={() => props.press(props.id)}>
      <Text style={styles.toggleButtonText}> {props.text}</Text>
    </TouchableOpacity>
  );
};

interface ProfilePicProps {
  uri?: string;
}

const ProfilePic = (props: ProfilePicProps) => {
  return (
    <View style={styles.profilePictureContainer}>
      {props.uri ? (
        <Image style={styles.image} source={{uri: props.uri}} />
      ) : (
        <Image style={styles.image} source={require('../../images/blank_face.jpg')} />
      )}
    </View>
  );
};

const ProfileTopSection = ({OnSelectedItem, SelectionItem}: ProfileTopProps) => {
  const {userDetail} = useAppSelector((state: RootState) => state.user);
  return (
    <View style={styles.container}>
      <View style={styles.uidContainer}>
        <Text style={styles.UidText}> UID: {userDetail?.id}</Text>
        <TouchableOpacity
          onPress={() => {
            userDetail?.id && Clipboard.setString(userDetail?.id.toString());
            showMessage('Copied', 1000);
          }}>
          <FeatherIcon name="copy" size={25} color={COLOR_RED} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileWrapper}>
        <ProfilePic uri={userDetail?.profilePic} />
      </View>
      <View style={styles.userNameWrapper}>
        <Text style={styles.UidText}> {userDetail?.name || ''}</Text>
      </View>
      <View style={styles.btnContainer}>
        <ToggleButton
          text={'Favourites'}
          id={1}
          press={OnSelectedItem}
          SelectionItem={SelectionItem}
        />
        <ToggleButton
          text={'Achievements'}
          id={2}
          press={OnSelectedItem}
          SelectionItem={SelectionItem}
        />
        <ToggleButton
          text={'Settings'}
          id={3}
          press={OnSelectedItem}
          SelectionItem={SelectionItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderStartColor: COLOR_WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileWrapper: {
    height: '45%',
  },
  profilePictureContainer: {
    borderRadius: 60,
    alignSelf: 'center',
    zIndex: 9000,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 51,
  },
  userNameWrapper: {
    height: '10%',
  },
  uidContainer: {
    height: '20%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    marginRight: 10,
    flexDirection: 'row',
  },
  UidText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 10,
    color: COLOR_BROWN,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '25%',
  },
  ToggleButton: {
    padding: 5,
    borderRadius: 10,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: COLOR_WHITE,
    fontWeight: '500',
  },
});

export default ProfileTopSection;
