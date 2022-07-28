import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {COLOR_RED} from '../../utils/constants';

function Loader(props: {loading: boolean}) {
  if (props.loading) {
    return (
      <View>
        <ActivityIndicator color={COLOR_RED} size="large" />
      </View>
    );
  }
  return <></>;
}

export default Loader;
