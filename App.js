import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {SplashScreen} from './screens/SplashScreen';
// import {darkTheme} from './themes/dark';
import {AuthContext} from './AuthContext';
import {UserContext} from './UserContext';
import {StatusBar} from 'react-native';
import { LoginScreen } from './screens/LoginScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={'LoginStack'}>
        {() => (
          <LoginStack.Navigator
            mode={'card'}
            screenOptions={{
              headerShown: false,
            }}
          >
            <LoginStack.Screen name={'Login'} component={LoginScreen} />
          </LoginStack.Navigator>
        )}
      </AuthStack.Screen>

      <AuthStack.Screen name={'Registration'} component={RegistrationScreen} />
    </AuthStack.Navigator>
  );
};

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

const ProductListScreen = () => {
  return (
    <View>
      <Text>PRODUCT LIST</Text>
    </View>
  );
};

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'ProductsList'}
        component={ProductListScreen}
        options={{
          title: 'Products List',
        }}
      />
    </MainStack.Navigator>
  );
}

export default function() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  function renderScreens() {
    if (loading) {
      return <RootStack.Screen name={'Splash'} component={SplashScreen} />;
    }
    // Alert.alert("USER");
    if (!user) {
      return <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />;
    }

    // Alert.alert("HAS USER");
    
    return (
      <RootStack.Screen name={'MainStack'}>
        {() => (
          <UserContext.Provider value={user}>
            <MainStackNavigator />
          </UserContext.Provider>
        )}
      </RootStack.Screen>
    );
  }

  return (
    <>
      <StatusBar />
      <AuthContext.Provider value={{}}>
        <NavigationContainer>
          <RootStack.Navigator
            screenOptions={{
              headerShown: false,
              animationEnabled: false,
            }}
          >
            {renderScreens()}
          </RootStack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </>
  );
}
