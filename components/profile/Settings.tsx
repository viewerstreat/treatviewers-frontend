import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLOR_GREY, COLOR_RED, COLOR_WHITE} from '../../utils/constants';
import Accounts from './Accounts';
import Payments from './Payments';
import {useAppDispatch} from '../../redux/useTypedSelectorHook';
import {logoutUser} from '../../redux/userSlice';

interface ToggleButtonProps {
  id: number;
  text: string;
  selectedItemId: number;
  onPress: (id: number) => void;
}
const ToggleButton = (props: ToggleButtonProps) => {
  const btnPress = () => props.onPress(props.id);
  const backgroundColor = props.id === props.selectedItemId ? COLOR_RED : COLOR_GREY;
  return (
    <TouchableOpacity style={[styles.toggleBtn, {backgroundColor}]} onPress={btnPress}>
      <Text style={styles.btnText}> {props.text}</Text>
    </TouchableOpacity>
  );
};

const Settings = () => {
  const [btnId, setBtnId] = useState(1);
  const dispatch = useAppDispatch();
  const logout = () => dispatch(logoutUser());
  const onBtnPress = (id: number) => {
    setBtnId(id);
    if (id === 3) {
      logout();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <ToggleButton text={'Account'} id={1} onPress={onBtnPress} selectedItemId={btnId} />
        <ToggleButton text={'Payment'} id={2} onPress={onBtnPress} selectedItemId={btnId} />
        <ToggleButton text={'Logout'} id={3} onPress={onBtnPress} selectedItemId={btnId} />
      </View>
      <View style={styles.w70}>{btnId === 1 ? <Accounts /> : btnId === 2 && <Payments />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  wrapper: {
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  w70: {
    width: '70%',
  },
  toggleBtn: {
    padding: 5,
    borderRadius: 10,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  btnText: {
    color: COLOR_WHITE,
    fontWeight: '500',
  },
});

export default Settings;
