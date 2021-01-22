import React, { useEffect, useRef, useState, useCallback } from 'react'
import {
  Dimensions,
  Animated,
  Image,
  StyleSheet,
  Text,
  View,
  findNodeHandle,
  TouchableOpacity,
} from 'react-native'

const images = {
  man:
    'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  women:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  kids:
    'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  skullcandy:
    'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  help:
    'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
}
const data = Object.keys(images).map((i) => ({
  key: i,
  title: i,
  image: images[i],
  ref: React.createRef(),
}))

const { width, height } = Dimensions.get('screen')

// eslint-disable-next-line react/display-name
const Tab = React.forwardRef(({ item, onItemPress }, ref) => {
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View ref={ref}>
        <Text
          style={{
            color: 'white',
            fontSize: 84 / data.length,
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
})

const Indicator = ({ measures, scrollX }) => {
  const inputRange = data.map((_, i) => i * width)

  const indicatorWidth = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((m) => m.width),
  })

  const indicatorX = scrollX.interpolate({
    inputRange,
    outputRange: measures.map((m) => m.x),
  })

  return (
    <Animated.View
      style={{
        position: 'absolute',
        height: 4,
        width: indicatorWidth,
        left: indicatorX,
        backgroundColor: 'white',
        bottom: -10,
      }}
    />
  )
}

const Tabs = ({ scrollX, data, onItemPress }) => {
  const [measures, setMeasures] = useState([])
  const containerRef = useRef()

  useEffect(() => {
    let m = []
    data.forEach((item) => {
      item.ref.current.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          m.push({ x, y, width, height })
          if (m.length === data.length) setMeasures(m)
        },
      )
    })
  }, [])

  return (
    <View style={{ position: 'absolute', top: 100, width }}>
      <View
        ref={containerRef}
        style={{
          justifyContent: 'space-evenly',
          flexDirection: 'row',
          flex: 1,
        }}>
        {data.map((item, index) => (
          <Tab
            item={item}
            key={item.key}
            ref={item.ref}
            onItemPress={() => onItemPress(index)}
          />
        ))}
      </View>
      {measures.length > 0 && (
        <Indicator measures={measures} scrollX={scrollX} />
      )}
    </View>
  )
}

const DynamicTabs = () => {
  const scrollX = useRef(new Animated.Value(0)).current
  const ref = useRef()
  const onItemPress = useCallback(
    (itemIndex) => {
      ref.current?.scrollToOffset({
        offset: itemIndex * width,
      })
    },
    [ref.current],
  )

  const renderItem = ({ item }) => {
    return (
      <View style={{ width, height }}>
        <Image
          style={{ flex: 1, resizeMode: 'cover' }}
          source={{ uri: item.image }}
        />
        <View
          style={[
            StyleSheet.absoluteFillObject,
            {
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
          ]}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        data={data}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { x: scrollX } },
            },
          ],
          { useNativeDriver: false },
        )}
        keyExtractor={(i) => i.key}
      />
      <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default DynamicTabs
