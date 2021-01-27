import React, { useRef } from 'react'
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
const { width, height } = Dimensions.get('screen')

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/7003560/media/48d5ac3503d204751a2890ba82cc42ad.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
]

const imageW = width * 0.7
const imageH = imageW * 1.7

export default function BlurCarousel() {
  const scrollX = useRef(new Animated.Value(0)).current

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          height,
          width,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image style={[styles.image]} source={{ uri: item }} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <StatusBar hidden />
      {data.map((item, index) => (
        <View style={StyleSheet.absoluteFillObject} key={item}>
          <Animated.Image
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity: scrollX.interpolate({
                  inputRange: [
                    width * (index - 1),
                    width * index,
                    width * (index + 1),
                  ],
                  outputRange: [0, 1, 0],
                }),
              },
            ]}
            blurRadius={50}
            source={{ uri: item }}
          />
        </View>
      ))}
      <Animated.FlatList
        keyExtractor={(_, i) => i.toString()}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: imageH,
    width: imageW,
    resizeMode: 'cover',
    borderRadius: 20,
    shadowOffset: {
      width: 50,
      height: 50,
    },
    shadowColor: 'white',
    shadowRadius: 20,
    shadowOpacity: 1,
  },
})
