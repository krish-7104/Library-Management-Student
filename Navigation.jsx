import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from './Screens/Dashboard';
import Books from './Screens/Books';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyProfile from './Screens/My Profile';
import {accent} from './colors';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName;
          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'My Profile') {
            iconName = focused ? 'happy' : 'happy-outline';
          } else if (route.name === 'Books') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Bookmarks') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: accent,
        tabBarInactiveTintColor: 'gray',
        gestureEnabled: true,
        swipeEnabled: true,
        tabBarStyle: {
          height: 60,
          padding: 10,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
        },
      })}
      initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Books"
        component={Books}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="My Profile"
        component={MyProfile}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
