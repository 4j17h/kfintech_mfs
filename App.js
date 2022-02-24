import * as React from 'react';
import RouteConfig from './src/RouteConfig';
import {StatusBar} from 'react-native';
import {store} from './src/Redux/Store';
import {Provider} from 'react-redux';

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
