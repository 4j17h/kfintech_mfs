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

const Stack = createNativeStackNavigator();

function RouteConfig() {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <NavigationContainer>
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
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default RouteConfig;
