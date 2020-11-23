import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer as UIDrawer,
  TouchableRipple,
  Switch,
  ActivityIndicator,
} from "react-native-paper";
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to details screen"
        onPress={() => navigation.navigate("Detail")}
      />
    </View>
  )
};
const ExploreScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Explor Screen</Text>
    </View>
  )
};
const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
    </View>
  )
};
const SettingsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Setting Screen</Text>
    </View>
  )
};
const AboutUsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>About us Screen</Text>
    </View>
  )
};
const DetailScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Detail Screen</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.goBack()}
      />
      <Button
        title="Go to home"
        onPress={() => navigation.navigate("Home")}
      />
      <Button
        title="Go to details again"
        onPress={() => navigation.push("Detail")}
      />
      <Button
        title="Go to first screen"
        onPress={() => navigation.popToTop()}
      />
    </View>
  )
};

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        }
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title: "Overview",
        headerLeft: () => (
          <Icon name="menu" size={25} backgroundColor="blue" color="white" style={{ padding: 10 }} onPress={() => navigation.openDrawer()} />
        ),
      }} />
    </HomeStack.Navigator>
  );
};

const DetailStackScreen = ({ navigation }) => {
  return (
    <DetailStack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: "blue",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        }
    }}>
      <DetailStack.Screen name="Detail" component={DetailScreen} options={{
        headerLeft: () => (
          <Icon.Button name="menu" size={25} backgroundColor="blue" onPress={() => navigation.openDrawer()} />
        ),
      }}/>
    </DetailStack.Navigator>
  );
};

const BottomTab = createMaterialBottomTabNavigator();

const MainTabScreen = (props) => {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeDrawer"
      activeColor="#fff"
    >
      <BottomTab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          // tabBarColor: "blue",
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Detail"
        component={DetailStackScreen}
        options={{
          tabBarLabel: 'Detail',
          tabBarIcon: ({ color }) => (
            <Icon name="bell" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name="account" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const DrawerContent = (props) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ paddingLeft: 20 }}>
          <View style={{ backgroundColor: "#f5f5f5", paddingTop: 10, paddingBottom: 10, flexDirection: "row", borderBottomColor: "#f4f4f4", borderBottomWidth: 1 }}>
            <View style={{ alignItems: "center"  }}>
              <Avatar.Image
                source={{
                  uri: "https://www.eguardtech.com/wp-content/uploads/2018/08/Network-Profile.png"
                }}
                size={50}
              />
            </View>
            <View style={{ justifyContent: "center"}}>
              <Text style={{ fontSize: 16, marginLeft: 20, fontWeight: "bold" }}>Anjo Tadena</Text>
            </View>
          </View>
          <DrawerItem
            icon={({ color, size}) => (
              <Icon
                name="home"
                color={color}
                size={size}
              />
            )}
            label={"Home"}
            onPress={() => props.navigation.navigate("HomeDrawer")}
          />
          <DrawerItem
            icon={({ color, size}) => (
              <Icon
                name="alert"
                color={color}
                size={size}
              />
            )}
            label={"Settings"}
            onPress={() => props.navigation.navigate("Settings")}
          />
          <DrawerItem
            icon={({ color, size}) => (
              <Icon
                name="information-variant"
                color={color}
                size={size}
              />
            )}
            label={"About us"}
            onPress={() => props.navigation.navigate("AboutUs")}
          />
        </View>
      </DrawerContentScrollView>
      <UIDrawer.Section style={{ marginBottom: 15, borderTopColor: "#f4f4f4", borderTopWidth: 1 }}>
        <DrawerItem
          icon={({ color, size}) => (
            <Icon
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          label={"Sign Out"}
          onPress={signOut}
        />
      </UIDrawer.Section>
    </View>
  );
};

const RootStack = createStackNavigator();

const SignInScreen = (props) => {
  const { signIn } = React.useContext(AuthContext);
  const [formValue, setFormValue] = React.useState({
    username: '',
    password: '',
  });

  const handleSignIn = () => {
    signIn(formValue.username, formValue.password);
  };

  const handleOnChangeText = (name, value) => {
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  }; 


  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 15, backgroundColor: "white" }}>
      <View style={{ alignItems: "center", padding: 50 }}>
        <Image
          source={require("../assets/logo-2.png")}
          resizeMode="stretch"
        />
      </View>

      <View>
        <Text>Username {formValue.username.toString()}</Text>
        <TextInput onChangeText={(text) => handleOnChangeText('username', text)} value={formValue.username} autoFocus style={{ borderRadius: 5, marginVertical: 5, borderColor: "gray", borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }} />
      </View>

      <View>
        <Text>Password {formValue.password.toString()}</Text>
        <TextInput onChangeText={(text) => handleOnChangeText('password', text)} secureTextEntry style={{ borderRadius: 2, marginVertical: 5, borderColor: "gray", borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }} />
      </View>

      <TouchableOpacity onPress={handleSignIn} style={{ backgroundColor: "blue", marginVertical: 5, padding: 10, borderRadius: 2 }}>
        <Text style={{ textAlign: "center", color: "white", textTransform: "uppercase" }}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')} style={{ borderColor: "blue", borderWidth: 1, backgroundColor: "white", marginVertical: 5, padding: 10, borderRadius: 2 }}>
        <Text style={{ textAlign: "center", color: "blue", textTransform: "uppercase" }}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUpScreen = (props) => {
  const [formValue, setFormValue] = React.useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = () => {
    console.log(formValue);
  };

  const handleOnChangeText = (name, value) => {
    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  }; 

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 15 }}>
      <View style={{ alignItems: "center", padding: 50 }}>
        <Text>Become a HUNTER!</Text>
      </View>

      <View>
        <Text>Username {formValue.username.toString()}</Text>
        <TextInput onChangeText={(text) => handleOnChangeText('username', text)} value={formValue.username} autoFocus style={{ borderRadius: 5, marginVertical: 5, borderColor: "gray", borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }} />
      </View>

      <View>
        <Text>Password {formValue.password.toString()}</Text>
        <TextInput onChangeText={(text) => handleOnChangeText('password', text)} secureTextEntry style={{ borderRadius: 2, marginVertical: 5, borderColor: "gray", borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }} />
      </View>

      <View>
        <Text>Confirm Passowrd {formValue.confirmPassword.toString()}</Text>
        <TextInput onChangeText={(text) => handleOnChangeText('confirmPassword', text)} secureTextEntry style={{ borderRadius: 2, marginVertical: 5, borderColor: "gray", borderWidth: 1, paddingVertical: 5, paddingHorizontal: 10 }} />
      </View>

      <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: "blue", marginVertical: 5, padding: 10, borderRadius: 2 }}>
        <Text style={{ textAlign: "center", color: "white", textTransform: "uppercase" }}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')} style={{ borderColor: "blue", borderWidth: 1, backgroundColor: "white", marginVertical: 5, padding: 10, borderRadius: 2 }}>
        <Text style={{ textAlign: "center", color: "blue", textTransform: "uppercase" }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-2.png")}
        resizeMode="stretch"
      />
    </View>
  );
};

const RootStackContainer = ({ navigation }) => (
  <RootStack.Navigator headerMode="none">
    {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} /> */}
    <RootStack.Screen name="SignIn" component={SignInScreen} />
    <RootStack.Screen name="SignUp" component={SignUpScreen} />
  </RootStack.Navigator>
);


function App(props) {
  const initilAuthState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [authState, dispatch] = React.useReducer(loginReducer, initilAuthState);

  const authContext = useMemo(() => ({
    signIn: async (userName, password) => {
      alert("SIGN IN");
      try {
        let userToken = null;

        if (userName === 'user' && password === '12345') {
          userToken = "TOKEN";

          await AsyncStorage.setItem('userToken', userToken);
        }

        dispatch({ type: "LOGIN", id: userName, token: userToken });
      } catch (err) {
        alert("Failed to login");
      }
    },
    signOut: async () => {
      alert("SIGN OUT");
      try {
        await AsyncStorage.removeItem('userToken');
        dispatch({ type: "LOGOUT" });
      } catch (err) {
        alert("Failed to logout");
      }
    },
    signUp: async () => {
      try {
        const userToken = "TOKEN";
        await AsyncStorage.setItem('userToken', userToken);
        dispatch({ type: "REGISTER", id: userName, token: userToken });
      } catch (err) {
        alert("Failed to signup");
      }
    },
  }), []);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');;

        dispatch({ type: "RETRIEVE_TOKEN", token });
      } catch (err) {
        alert("FAiled to get token");
      }
    }, 3000);
  }, []);

  if (authState.isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {authState.userToken !== null ? (
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
          </Drawer.Navigator>
        ) : <RootStackContainer />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default App;
