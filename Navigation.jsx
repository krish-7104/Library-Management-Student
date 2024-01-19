import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Dashboard from './Screens/Dashboard';
import Books from './Screens/Books';
import Wishlist from './Screens/Wishlist';
import Settings from './Screens/Settings';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Tab.Navigator initialRouteName="Dashboard">
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Books" component={Books} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default Navigation;
