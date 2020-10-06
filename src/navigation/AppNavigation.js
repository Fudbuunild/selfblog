import React from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {Platform} from 'react-native'
import {MainScreen} from "../screens/MainScreen";
import {PostScreen} from "../screens/PostScreen";
import {THEME} from "../theme";
import {createDrawerNavigator} from "react-navigation-drawer";
import {Ionicons} from "@expo/vector-icons";
import {AboutScreen} from '../screens/AboutScreen'
import {CreateScreen} from "../screens/CreateScreen";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {BookedScreen} from "../screens/BookedScreen";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

const navigatorOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
        },
        headerTintColor: Platform.OS === 'android' ? '#fff' : '#fff'
    }
}
const PostNavigator =  createStackNavigator(
    {
  Main: MainScreen,
  Post: PostScreen
  },
    navigatorOptions
 )

const BookedNavigator = createStackNavigator({
    Booked:BookedScreen,
    Post:PostScreen
},
    navigatorOptions
    )

const bottomTabsConfig = {
    Post:{
        screen:PostNavigator,
        navigationOptions:{
            tabBatLabel:'All',
            tabBarIcon: info => (
                <Ionicons name="ios-albums" size={25} color={info.tintColor}/>
            )
        }
    },
    Booked:{
        screen:BookedNavigator,
        navigationOptions:{
            tabBarLabel:'Favorites',
            tabBarIcon: info => (
                <Ionicons name='ios-star' size={25} color={info.tintColor}/>
            )
        }
    }
}

const BottomNavigator = Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(bottomTabsConfig,{
        activeTintColor:'#fff',
        shifting:true,
        barStyle:{
            backgroundColor:THEME.MAIN_COLOR
        }
    })
    : createBottomTabNavigator(
    bottomTabsConfig,
    {
    tabBarOptions:{
        activeTintColor:THEME.MAIN_COLOR
    }
})

const AboutNavigator = createStackNavigator({
    About:AboutScreen
},navigatorOptions)

const CreateNavigator = createStackNavigator({
    Create:CreateScreen
},navigatorOptions)


const MainNavigator = createDrawerNavigator({
    PostsTabs:{
        screen:BottomNavigator,
        navigationOptions:{
            drawerLabel:'Home'
        }
    },
    About:{
        screen:AboutNavigator,
        navigationOptions:{
            drawerLabel:'About us'
        }
    },
    Create:{
        screen:CreateNavigator,
        navigationOptions:{
            drawerLabel:'New Post'
        }
    }

},{
    contentOptions:{
        activeTintColor:THEME.MAIN_COLOR,
        labelStyle:{
            fontFamily:'open-bold'
        }
    }
})

export const AppNavigation = createAppContainer(MainNavigator)
