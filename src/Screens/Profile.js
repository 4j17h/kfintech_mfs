import * as React from 'react';
import {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getProf} from '../Redux/Slices/profileSlice';
import {RootState} from '@reduxjs/toolkit/dist/query/core/apiState';
import {ActivityIndicator, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CText} from '../Components/CText';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const {firstName, lastName, email, profilePhoto, processing} = useSelector(
    (state: RootState) => state.profile,
  );

  useLayoutEffect(() => {
    dispatch(getProf(4));
  }, [dispatch]);

  if (processing) {
    return <ActivityIndicator size={'large'} color={'black'} />;
  }

  return (
    <>
      <View style={{alignItems: 'center', top: 15}}>
        <FastImage
          source={{uri: profilePhoto}}
          style={{width: 150, height: 150, borderRadius: 99, borderWidth: 1}}
          resizeMode={'contain'}
        />
        <View style={{flexDirection: 'row', margin: 5}}>
          <CText title={firstName + ' '} h2={true} style={{color: 'black'}} />
          <CText title={lastName} h2={true} style={{color: 'black'}} />
        </View>
        <CText title={email} h2={true} style={{color: 'black'}} />
      </View>
    </>
  );
}
