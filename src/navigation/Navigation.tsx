import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CityDetailScreen from '../screens/CityDetail/CityDetailScreen';
import { globalStyles } from '../constants/styles';

const Stack = createStackNavigator();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: globalStyles.cardBgColor, // Arka plan rengi
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: globalStyles.primaryText,
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Home',
          }} 
        />
        <Stack.Screen 
          name="CityDetail" 
          component={CityDetailScreen} 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
