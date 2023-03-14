import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useUserContext } from '../context/user';
import {Home, Login} from '../screens';
export function StackNavigator(): JSX.Element {
  const {isUser} = useUserContext();
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isUser && <Stack.Screen name="Home" component={Home} />} 
      {!isUser && <Stack.Screen name="Login" component={Login} />} 
    </Stack.Navigator>
  );
}
