import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen';
import LeaderBoard from '../Screen/LeaderBoard';
import ProfileScreen from '../Screen/ProfileScreen';
import MyCourse from '../Screen/MyCourse';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import HomeScreenNavigation from './HomeScreenNavigation';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="home" component={HomeScreenNavigation} 
      options={{tabBarIcon:({color,size})=> (
        <Ionicons name='home' size={size} color={color}/>
      )}}
      />

      <Tab.Screen name="mycourse" component={MyCourse} 
      options={{tabBarIcon:({color,size})=> (
        <Ionicons name='book' size={size} color={color}/>
      )}}
      />

      <Tab.Screen name="leaderboard" component={LeaderBoard} 
      options={{tabBarIcon:({color,size})=> (
        <MaterialIcons name='book' size={size} color={color}/>
      )}}
      />

      <Tab.Screen name="profile" component={ProfileScreen} 
      options={{tabBarIcon:({color,size})=> (
        <MaterialIcons name='supervised-user-circle' size={size} color={color}/>
      )}}
      />
    </Tab.Navigator>
  )
}