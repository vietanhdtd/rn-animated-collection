import React from 'react'
import 'react-native-gesture-handler'
import { StickyToolBar, Home, DynamicTabs } from 'screens'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

const options = {
  headerShown: false,
}
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          headerShown="none"
          name="StickyToolBar"
          component={StickyToolBar}
        />
        <Stack.Screen
          options={options}
          name="DynamicTabs"
          component={DynamicTabs}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App