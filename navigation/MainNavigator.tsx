import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegistrosScreen';
import PerfilScreen from '../screens/PerfilScreen';
import JuegosScreen from '../screens/JuegosScreen';
import ListaScreen from '../screens/ListaScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
      />

      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
      />
    </Stack.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Juegos"
      screenOptions={{
        headerTransparent: true,
        headerTitle: '',
        headerShadowVisible: false,
        headerTintColor: '#FFFFFF',
      }}
    >
      <Drawer.Screen
        name="Juegos"
        component={JuegosScreen}
        options={{
          title: '🎯 Jugar',
        }}
      />

      <Drawer.Screen
        name="Ranking"
        component={ListaScreen}
        options={{
          title: '🏆 Ranking',
        }}
      />

      <Drawer.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: '👤 Perfil',
        }}
      />
    </Drawer.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}