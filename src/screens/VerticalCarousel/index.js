import React, { useRef } from 'react'
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  Animated,
  Text,
  StatusBar,
  SafeAreaView,
  Easing,
} from 'react-native'
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet'
const { width, height } = Dimensions.get('screen')

const ITEM_WIDTH = width
const ITEM_HEIGHT = height * 0.75
const DOT_SIZE = 8
const DOT_SPACING = 16
const DOT_INDOCATOR_SIZE = DOT_SIZE + DOT_SPACING

const images = [
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_1_1_1.jpg?ts=1606727905128',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_1_1.jpg?ts=1606727908993',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_2_1.jpg?ts=1606727889015',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_3_1.jpg?ts=1606727896369',
  'https://static.zara.net/photos///2020/I/1/1/p/6543/610/091/2/w/2460/6543610091_2_4_1.jpg?ts=1606727898445',
]

const product = {
  title: 'SOFT MINI CROSSBODY BAG WITH KISS LOCK',
  description: [
    'Mini crossbody bag available in various colours. Featuring two compartments. Handles and detachable crossbody shoulder strap. Lined interior. Clasp with two metal pieces.',
    'Height x Length x Width: 14 x 21.5 x 4.5 cm. / 5.5 x 8.4 x 1.7"',
  ],
  price: '29.99£',
}

export default function VerticalCarousel() {
  const scrollY = useRef(new Animated.Value(0)).current

  const renderItem = ({ item }) => {
    return (
      <View>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        // translucent
        // backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{ height: ITEM_HEIGHT, overflow: 'hidden' }}>
        <Animated.FlatList
          data={images}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          keyExtractor={(_, i) => i.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
        />
        <View style={styles.pagination}>
          {images.map((_, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    backgroundColor: scrollY.interpolate({
                      inputRange: [
                        ITEM_HEIGHT * (index - 1),
                        ITEM_HEIGHT * index,
                        ITEM_HEIGHT * (index + 1),
                      ],
                      outputRange: ['transparent', 'black', 'transparent'],
                    }),
                  },
                ]}
              />
            )
          })}
        </View>
      </View>
      <BottomSheet
        initialSapIndex={0}
        snapPoints={[height - ITEM_HEIGHT, height]}>
        <BottomSheetScrollView
          style={{ backgroundColor: 'white' }}
          contentContainerStyle={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              textTransform: 'uppercase',
            }}>
            {product.title}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginBottom: 16,
            }}>
            {product.price}
          </Text>
          {product.description.map((item, idx) => {
            return (
              <Text style={{ lineHeight: 24 }} key={idx}>
                {item}
              </Text>
            )
          })}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    resizeMode: 'cover',
  },
  pagination: {
    position: 'absolute',
    top: ITEM_HEIGHT / 2.5,
    left: 20,
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: DOT_SPACING,
  },
  dotIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE,
    backgroundColor: 'black',
    // borderWidth: 1,
    // borderColor: '#333',
    position: 'absolute',
    // top: -DOT_SIZE / 2,
    // left: -DOT_SIZE / 2,
  },
})
