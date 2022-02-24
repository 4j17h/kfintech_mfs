import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Screens/Login';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import Registration from './Screens/Registration';
import {dynamicSize} from './Utils';
import {FONTS} from './Common/Constants';
import HomeScreen from './Screens/HomeScreen';
import {Assets} from './Common/Assets';
import {Image} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/dist/query/core/apiState';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {logout} from './Redux/Slices/authSlice';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={{
          fontWeight: 'bold',
        }}
        icon={() => <AntDesign name="logout" size={18} />}
        onPress={() => {
          dispatch(logout());
        }}
      />
    </DrawerContentScrollView>
  );
}

function NavDrawer({navigation}) {
  return (
    <Drawer.Navigator
      initialRouteName={'HomeScreen'}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={'Home'}
        component={HomeScreen}
        options={({navigation, route}) => ({
          headerTitle: () => (
            <Image
              source={Assets.brandLogo}
              style={{
                height: dynamicSize(40),
                alignSelf: 'center',
              }}
              resizeMode={'contain'}
            />
          ),
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: dynamicSize(22),
            fontFamily: FONTS.Bold,
          },
          animation: 'none',
          headerTitleAlign: 'center',
          headerRight: () => <></>,
          headerLeftContainerStyle: {
            zIndex: 999,
          },
        })}
      />
    </Drawer.Navigator>
  );
}

function RouteConfig() {
  const state = useSelector((state: RootState) => state);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        {state.auth.token || state.signup.token ? (
          <NavDrawer />
        ) : (
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Registration"
              component={Registration}
              options={({navigation, route}) => ({
                title: route.name.toUpperCase(),
                headerBackVisible: true,
                headerStyle: {
                  backgroundColor: 'black',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontSize: dynamicSize(22),
                  fontFamily: FONTS.Bold,
                },
                animation: 'none',
                headerTitleAlign: 'center',
                headerRight: () => <></>,
              })}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RouteConfig;
