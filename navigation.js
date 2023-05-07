import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Loginscreen from './loginscreen';
import Registerscreen from './registerscreen';
import Homescreen from './homescreen';
import Onboardingscreen from './onboardingscreen';
import Profilescreen from './homescreen_compo/profilescreen';
import Splashscreen from './splashscreen';


const stack = createStackNavigator();

export default function Navigat() {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='Loginscreen' screenOptions={{headerShown:false}}>
          <stack.Screen name="Onboarding" component={Onboardingscreen}/>
          <stack.Screen name="Loginscreen" component={Loginscreen} />
          <stack.Screen name="Registerscreen" component={Registerscreen}/>
          <stack.Screen name="Homescreen" component={Homescreen}/>
          <stack.Screen name="Profilescreen" component={Profilescreen}/>  
          <stack.Screen name="splash" component={Splashscreen}/> 
      </stack.Navigator>
    </NavigationContainer>
);
}