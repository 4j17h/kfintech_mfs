import * as React from 'react';
import RouteConfig from './src/RouteConfig';
import {LogBox, StatusBar} from 'react-native';
import {store} from './src/Redux/Store';
import {Provider} from 'react-redux';

LogBox.ignoreAllLogs();

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Provider store={store}>
        <RouteConfig />
      </Provider>
    </>
  );
}

export default App;
