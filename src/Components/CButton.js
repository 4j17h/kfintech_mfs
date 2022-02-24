import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {CText} from './CText';

export default function CButton({
  onPress,
  buttonBGColor,
  textCompProps,
  marginTop,
  borderColor,
  borderWidth,
  width,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor: buttonBGColor,
        alignSelf: 'center',
        justifyContent: 'center',
        width: width,
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
        borderColor: borderColor,
        borderWidth: borderWidth,
        marginTop: marginTop,
      }}
      onPress={onPress}>
      <CText {...textCompProps} />
    </TouchableOpacity>
  );
}
