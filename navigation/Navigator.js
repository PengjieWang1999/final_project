import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import HomeScreen from '../screens/HomeScreen.js'

import GameScreen from '../screens/GameScreen.js'

import LeaderBoardScreen from '../screens/LeaderBoardScreen.js'


const RootStack = createStackNavigator(
  {
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    GameScreen: {
        screen: GameScreen,
        navigationOptions: {
            header: null,
            gesturesEnabled: false
        }
    },
    LeaderBoardScreen: {
        screen: LeaderBoardScreen,
        navigationOptions: {
            
        }
    },
  },
  {
    initialRouteName: 'HomeScreen',
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;