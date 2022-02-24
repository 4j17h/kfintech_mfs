import {Text} from 'react-native';
import React from 'react';
import {FONTS} from '../Common/Constants';
import {getFontSize} from '../Utils';

const CText = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  p,
  bold,
  regular,
  title,
  style,
  ...rest
}) => {
  return (
    <Text
      allowFontScaling={false}
      style={[
        {textAlign: 'center'},
        h1 && {fontSize: getFontSize(48)},
        h2 && {fontSize: getFontSize(32)},
        h3 && {fontSize: getFontSize(20)},
        h4 && {fontSize: getFontSize(18)},
        h5 && {fontSize: getFontSize(16)},
        p && {fontSize: getFontSize(12)},
        bold && {fontFamily: FONTS.Bold},
        regular && {fontFamily: FONTS.Regular},
        style,
      ]}
      {...rest}>
      {title}
    </Text>
  );
};

export {CText};
