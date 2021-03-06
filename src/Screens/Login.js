import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CTextInputs from '../Components/CTextInputs';
import CButton from '../Components/CButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Assets} from '../Common/Assets';
import {Field, Formik} from 'formik';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {dynamicSize, WinDimen} from '../Utils';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/dist/query/core/apiState';
import {authUser} from '../Redux/Slices/authSlice';
import {loginValSchema} from '../Common/FormValidationSchema';
import {CommonActions} from '@react-navigation/native';

export default function Login({navigation}) {
  const dispatch = useDispatch();

  const {isLoggedIn, token, processing} = useSelector(
    (state: RootState) => state.auth,
  );

  const userVal = data => {
    dispatch(authUser(JSON.stringify(data)));
  };

  if (isLoggedIn) {
    navigation.dispatch(CommonActions.navigate('HomeScreen'));
  }

  return (
    <>
      <SafeAreaView>
        <Image
          source={Assets.login_bg}
          resizeMode={'stretch'}
          style={{
            position: 'absolute',
            width: WinDimen.width,
            height: WinDimen.height,
          }}
        />
        <>
          <KeyboardAwareScrollView
            contentContainerStyle={{alignItems: 'center'}}>
            <Image
              source={Assets.logo}
              resizeMode={'contain'}
              style={{
                alignSelf: 'center',
                backgroundColor: 'white',
                height: dynamicSize(100),
                width: dynamicSize(250),
                margin: 50,
              }}
            />
            <Formik
              enableReinitialize={true}
              validationSchema={loginValSchema}
              initialValues={{
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
              }}
              onSubmit={data => userVal(data)}>
              {({handleSubmit, errors, touched, isValid}) => (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Field
                    component={CTextInputs.CIconTextInput}
                    Icon={
                      <FeatherIcon
                        style={{marginLeft: 10}}
                        name="mail"
                        size={25}
                        color="gray"
                      />
                    }
                    name="email"
                    placeholder="E-Mail ID"
                    errors={errors}
                    touched={touched}
                  />
                  <Field
                    component={CTextInputs.CIconTextInput}
                    Icon={
                      <FeatherIcon
                        style={{marginLeft: 10}}
                        name="lock"
                        size={25}
                        color="gray"
                      />
                    }
                    name="password"
                    placeholder="Password"
                    spellCheck={false}
                    secureText={true}
                    errors={errors}
                    touched={touched}
                  />
                  <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                    <CButton
                      width={dynamicSize(150)}
                      onPress={handleSubmit}
                      buttonBGColor={'darkred'}
                      marginTop={50}
                      textCompProps={{
                        title: 'LOGIN',
                        bold: true,
                        h3: true,
                        style: {color: 'white'},
                      }}
                    />
                    {processing ? (
                      <ActivityIndicator
                        size="large"
                        color={'white'}
                        style={{left: -40}}
                      />
                    ) : null}
                  </View>
                </View>
              )}
            </Formik>
          </KeyboardAwareScrollView>
          <View
            style={{
              top: WinDimen.height / 4.2,
              alignSelf: 'center',
            }}>
            <CButton
              onPress={() =>
                navigation.dispatch(CommonActions.navigate('Registration'))
              }
              width={WinDimen.width}
              buttonBGColor={'white'}
              textCompProps={{
                title: 'CREATE NEW ACCOUNT',
                bold: true,
                h3: true,
                style: {color: 'black'},
              }}
            />
          </View>
        </>
      </SafeAreaView>
    </>
  );
}
