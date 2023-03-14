import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigation';
import 'react-native-gesture-handler';
import UserContextProvider from './src/context/user';
function App(): JSX.Element {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </UserContextProvider>
  );
}

export default App;
