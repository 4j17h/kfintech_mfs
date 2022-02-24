import React from 'react';
import {ActivityIndicator, Alert, Image, View} from 'react-native';
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
import {signupValSchema} from '../Common/FormValidationSchema';
import {signupUser} from '../Redux/Slices/userSignupSlice';
import {CommonActions} from '@react-navigation/native';

export default function Registration({navigation}) {
  const dispatch = useDispatch();

  const {success, id, token, processing} = useSelector(
    (state: RootState) => state.signup,
  );

  const userSignup = data => {
    if (data?.password !== data?.confirmationPassword) {
      return Alert.alert('Error', "Passwords doesn't match");
    }

    const d = JSON.stringify({email: data.email, password: data.password});

    dispatch(signupUser(d));
  };

  if (success) {
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
            <Formik
              enableReinitialize={true}
              validationSchema={signupValSchema}
              initialValues={{
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
                confirmationPassword: 'cityslicka',
              }}
              onSubmit={data => userSignup(data)}>
              {({handleSubmit, errors, touched, isValid}) => (
                <View
                  style={{
                    height: WinDimen.height / 1.2,
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
                    name="confirmationPassword"
                    placeholder="Confirmation Password"
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
                        title: 'SIGNUP',
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
        </>
      </SafeAreaView>
    </>
  );
}
