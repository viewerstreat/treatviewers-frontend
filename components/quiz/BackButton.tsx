import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface BackBtnProps {
  showBtn: boolean;
  onclick: () => void;
}

function BackButton(props: BackBtnProps) {
  if (!props.showBtn) {
    return <></>;
  }
  return (
    <TouchableOpacity onPress={props.onclick}>
      <Image source={require('../../images/back-button-icon.png')} style={styles.img} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 25,
    width: 35,
  },
});

export default BackButton;
