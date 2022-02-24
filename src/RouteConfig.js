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

const Stack = createNativeStackNavigator();

function RouteConfig() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
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
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={({navigation, route}) => ({
              headerTitle: () => (
                <Image
                  source={Assets.brandLogo}
                  style={{
                    height: dynamicSize(40),
                    flex: 1,
                    left: -15,
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
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RouteConfig;
