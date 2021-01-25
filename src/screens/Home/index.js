import React from 'react'
import { Text, View, StyleSheet, FlatList, Button } from 'react-native'

const listScreens = ['StickyToolBar', 'DynamicTabs', 'VerticalCarousel']

const Home = ({ navigation }) => {
  const title = 'home'
  const navigate = (to) => {
    navigation.navigate(to)
  }
  const renderItem = ({ item }) => {
    return (
      <View style={styles.button}>
        <Button color="teal" onPress={() => navigate(item)} title={item} />
      </View>
    )
  }

  return (
    <View style={[styles.home]}>
      <Text>{title}</Text>
      <FlatList
        keyExtractor={(_, i) => i.toString()}
        data={listScreens}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
    paddingVertical: 10,
  },
})

export default Home
