import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useAppDispatch, useAppSelector} from '../../redux/useTypedSelectorHook';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {errorUpdate, loadingUpdate, userRegLogState} from '../../redux/userSlice';
import {CreateUser} from '../../services/backend';
import {showMessage} from '../../services/misc';
import {isValidEmail} from '../../utils/utils';
import {COLOR_BLACK, COLOR_WHITE, COLOR_GREY, COLOR_BROWN} from '../../utils/constants';

const Registration = () => {
  const dispatch = useAppDispatch();
  const {intermidiatePhone} = useAppSelector(state => state.user);
  const {control, setValue, handleSubmit} = useForm<any>({mode: 'all'});

  const onSubmit = async (data: any) => {
    if (!data || !data.name) {
      showMessage('Name required.');
      return;
    }
    if (data.email && isValidEmail(data.email)) {
      showMessage('Invalid email.');
      return;
    }

    dispatch(loadingUpdate(true));
    try {
      await CreateUser({name: data.name, phone: data.phone, email: data.email});
      dispatch(loadingUpdate(false));
    } catch (err: any) {
      dispatch(loadingUpdate(false));
      dispatch(errorUpdate(err?.response?.data?.message));
      showMessage('Not able to signup.');
    }
  };

  useEffect(() => {
    if (intermidiatePhone) {
      setValue('phone', intermidiatePhone);
    }
  }, [intermidiatePhone, setValue]);

  const back = () => {
    dispatch(userRegLogState({value: 0, phone: undefined}));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <Controller
          name="phone"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              editable={false}
              onBlur={onBlur}
              selectionColor={COLOR_BLACK}
              textAlign={'center'}
              style={[styles.textInput]}
              maxLength={10}
              keyboardType={'number-pad'}
              placeholder={'Phone Number'}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          name="email"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              selectionColor={COLOR_BLACK}
              textAlign={'center'}
              style={[styles.textInput]}
              placeholder={'Email (Optional)'}
            />
          )}
        />
      </View>
      <View style={styles.textInputContainer}>
        <Controller
          name="name"
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              selectionColor={COLOR_BLACK}
              textAlign={'center'}
              style={[styles.textInput]}
              placeholder={'Name'}
            />
          )}
        />
      </View>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.button} onPress={() => back()}>
          <FeatherIcon name="arrow-left-circle" size={50} color={COLOR_WHITE} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <FeatherIcon name="arrow-right-circle" size={50} color={COLOR_WHITE} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Registration;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 80,
  },
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  textInputContainer: {
    height: 45,
    backgroundColor: COLOR_WHITE,
    width: '70%',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLOR_GREY,
    marginBottom: 10,
  },
  textInput: {
    fontSize: 18,
    textAlign: 'center',
    flex: 1,
    color: COLOR_BROWN,
  },
  button: {
    marginTop: 20,
  },
  socialButton: {
    borderWidth: 4,
    borderColor: COLOR_WHITE,
    padding: 2,
    borderRadius: 5,
    margin: 15,
  },
});
