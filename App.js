import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import 'react-native-gesture-handler'

import Home from './screens/Home';
import Iss from './screens/Iss';
import Meteor from './screens/Meteor';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName= "Home" screenOptions = {{
          headerShown: false
        }}>
          <Stack.Screen name = "Home" component = {Home} />
          <Stack.Screen name = "Iss Location" component = {Iss} />
          <Stack.Screen name = "Meteor" component = {Meteor} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
