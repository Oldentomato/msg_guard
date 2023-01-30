import React from 'react';
import {
  View
} from 'react-native';

import MainView from './src/views/mainview';
import StartView from './src/views/startview';
import AdminView from './src/views/adminview'
import {NavigationContainer} from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Main" component={MainView} />
        <Stack.Screen name="Admin" component={AdminView} />
        <Stack.Screen name="Start" component={StartView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({

// });

export default App;
