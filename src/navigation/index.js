import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Layout, Text } from '@ui-kitten/components';
import TabBar from "../component/common/TabBar";
import Icon from 'react-native-vector-icons/Feather';
import { HomePageNavigator } from './stack/home';

const { Navigator, Screen } = createBottomTabNavigator();
const ROOT_ROUTES = ['Home', 'Blogs', 'Account'];

const isOneOfRootRoutes = (currentRoute) => {
  return ROOT_ROUTES.find(route => currentRoute.name === route) !== undefined;
};
const UsersScreen = (props) => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>USERS</Text>
  </Layout>
);

const OrdersScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category='h1'>ORDERS</Text>
  </Layout>
);

const tabBarIconCommon = (name) => (
  {
    tabBarIcon: ({ focused, color, size }) => (
      <Icon
        name={name}
        size={size ? size : 24}
        color={focused ? color : "#222222"}
        focused={focused}
        color={color}
      />
    ),
    tabBarVisible: false
  }
)


const TabNavigator = () => {
  const [count, setCount] = useState(true);
  return (
    <Navigator
      initialRouteName='Traing Test'
      screenOptions={({ route }) => {
        const currentRoute = route.state && route.state.routes[route.state.index];
        const isShow = currentRoute && isOneOfRootRoutes(currentRoute);
        if (isShow !== undefined) {
          setCount(isShow);
        }
      }}
      tabBarOptions={{
        activeTintColor: "#2F7C6E",
        inactiveTintColor: "#222222",
      }}
      tabBar={props => {
        return (
          <TabBar
            tabBarVisible={count}
            tabBarBackground={'#65C8D0'}
            activeColors={'#ffffff'} // or activeColors={'#e6b580'} or array follow sort index
            activeTabBackgrounds={'#2F7C6E'} // or activeTabBackgrounds={'#ede7e6'} or array follow sort index
            {...props}
          />
        )
      }}>
      <Screen
        name='Home'
        component={OrdersScreen}
        options={tabBarIconCommon('home')}
      />
      <Screen
        name='Traing Test'
        component={HomePageNavigator}
        options={tabBarIconCommon('edit')}
      />
      <Screen
        name='Book'
        component={OrdersScreen}
        options={tabBarIconCommon('book')}
      />
      <Screen
        name='Account'
        component={OrdersScreen}
        options={tabBarIconCommon('user')}
      />

    </Navigator>
  )
};

export const AppNavigator = () => (
  <NavigationContainer>
    <TabNavigator />
  </NavigationContainer>
);