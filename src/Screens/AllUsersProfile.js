import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/dist/query/core/apiState';
import {ActivityIndicator, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {CText} from '../Components/CText';
import {getAllUsersProf} from '../Redux/Slices/allUsersSlice';
import {dynamicSize} from '../Utils';
import {FlatGrid} from 'react-native-super-grid';

function UserCard(data, index) {
  return (
    <View style={{alignItems: 'center'}} key={index}>
      <FastImage
        source={{uri: data.item.avatar}}
        style={{width: 150, height: 150, borderRadius: 99, borderWidth: 1}}
        resizeMode={'contain'}
      />
      <View style={{flexDirection: 'row', margin: 5}}>
        <CText
          title={data.item.first_name + ' '}
          h3={true}
          style={{color: 'black'}}
        />
        <CText title={data.item.last_name} h3={true} style={{color: 'black'}} />
      </View>
      <CText title={data.item.email} h5={true} style={{color: 'black'}} />
    </View>
  );
}

export default function AllUsersProfile({navigation}) {
  const dispatch = useDispatch();

  const {data, processing} = useSelector(
    (state: RootState) => state.allUserProfiles,
  );

  useEffect(() => {
    dispatch(getAllUsersProf());
  }, [dispatch]);

  if (processing) {
    return <ActivityIndicator size={'large'} color={'black'} />;
  }

  return (
    <>
      {data.length > 0 ? (
        <FlatGrid
          fixed={true}
          itemDimension={dynamicSize(175)}
          data={data}
          style={{}}
          spacing={5}
          renderItem={({item, index}) => <UserCard item={item} key={index} />}
        />
      ) : null}
    </>
  );
}
