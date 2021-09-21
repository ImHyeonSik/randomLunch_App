/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { Provider } from "react-redux";
import {createStore, applyMiddleware} from 'redux';
import { NavigationContainer } from "@react-navigation/native";
import rootReducer from './src/redux/reducers/index';
import MainTab from "./navigation/MainTab";
import {
  StyleSheet,
} from 'react-native';

const middlewares = [];
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  const actionsBlacklist = [];
  middlewares.push(createDebugger({actionsBlacklist}));
}

const App: () => Node = () => {
  return (
    <Provider store={createStore(rootReducer, applyMiddleware(...middlewares))} >
      <NavigationContainer>
        <MainTab/>
      </NavigationContainer>
    </Provider>
  )
};

const css = StyleSheet.create({

});

export default App;
