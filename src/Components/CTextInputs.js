import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {dynamicSize, getFontSize, WinDimen} from '../Utils';
import {FONTS} from '../Common/Constants';

const CTextInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    Icon,
    textInputStyle,
    multiline,
    editable,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <View
      style={{
        width: '100%',
        maxWidth: WinDimen.width - 20,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: dynamicSize(5),
        borderWidth: dynamicSize(1.5),
        borderColor: 'gray',
      }}>
      <TextInput
        editable={editable}
        multiline={multiline ? true : props.secureTextEntry ? false : false}
        style={[
          {
            fontSize: getFontSize(18),
            textAlign: 'center',
            fontFamily: FONTS.Regular,
            width: '100%',
          },
          textInputStyle,
        ]}
        placeholderTextColor={'silver'}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
};

const CIconTextInput = props => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    Icon,
    textInputStyle,
    multiline,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  if (hasError != null && errors.email) {
    Alert.alert('Error', errors.email);
  }

  if (hasError != null && errors.password) {
    Alert.alert('Error', errors.password);
  }

  return (
    <>
      <View
        style={{
          margin: 5,
        }}>
        <View
          style={{
            width: '100%',
            maxWidth: WinDimen.width - 20,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: dynamicSize(5),
            borderWidth: dynamicSize(1.5),
            borderColor: 'gray',
          }}>
          {Icon}
          <TextInput
            secureTextEntry={
              props.secureText && !visiblePassword ? true : false
            }
            multiline={multiline ? true : props.secureTextEntry ? false : false}
            style={[
              {
                fontSize: getFontSize(18),
                color: 'black',
                fontFamily: FONTS.Regular,
                width: '100%',
              },
              textInputStyle,
            ]}
            placeholderTextColor={'black'}
            value={value}
            onChangeText={text => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            {...inputProps}
          />
          {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
        </View>
        {props.secureText ? (
          <FeatherIcon
            onPress={() => setVisiblePassword(!visiblePassword)}
            name={visiblePassword ? 'eye' : 'eye-off'}
            size={25}
            color="gray"
            style={{position: 'absolute', margin: 15, right: 0}}
          />
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    bottom: 18,
    fontSize: 13,
    color: 'red',
  },
});

export default {CTextInput, CIconTextInput};
