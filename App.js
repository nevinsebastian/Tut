// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen';
import BookingScreen from './components/BookingScreen';
import TimeSlotSelection from './components/TimeSlotSelection';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="TimeSlotSelection" component={TimeSlotSelection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
