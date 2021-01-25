import React, { useEffect, useRef, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Animated,
  Button,
  StatusBar,
  View,
  Dimensions,
  Text,
  Image,
  Alert,
} from 'react-native'
import { useHeaderHeight } from '@react-navigation/stack'
const { width, height } = Dimensions.get('screen')

const articleParagraphs = [
  'One advanced diverted domestic sex repeated bringing you old. Possible procured her trifling laughter thoughts property she met way. Companions shy had solicitude favourable own. Which could saw guest man now heard but. Lasted my coming uneasy marked so should. Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no listening of. Before nature his parish boy. ',
  'Folly words widow one downs few age every seven. If miss part by fact he park just shew. Discovered had get considered projection who favourable. Necessary up knowledge it tolerably. Unwilling departure education is be dashwoods or an. Use off agreeable law unwilling sir deficient curiosity instantly. Easy mind life fact with see has bore ten. Parish any chatty can elinor direct for former. Up as meant widow equal an share least. ',
  'Another journey chamber way yet females man. Way extensive and dejection get delivered deficient sincerity gentleman age. Too end instrument possession contrasted motionless. Calling offence six joy feeling. Coming merits and was talent enough far. Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard. ',
  'Village did removed enjoyed explain nor ham saw calling talking. Securing as informed declared or margaret. Joy horrible moreover man feelings own shy. Request norland neither mistake for yet. Between the for morning assured country believe. On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common. My little garret repair to desire he esteem. ',
  'In it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. ',
  'Had denoting properly jointure you occasion directly raillery. In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom gay nor design age. Am weather to entered norland no in showing service. Nor repeated speaking shy appetite. Excited it hastily an pasture it observe. Snug hand how dare here too. ',
  'Improve ashamed married expense bed her comfort pursuit mrs. Four time took ye your as fail lady. Up greatest am exertion or marianne. Shy occasional terminated insensible and inhabiting gay. So know do fond to half on. Now who promise was justice new winding. In finished on he speaking suitable advanced if. Boy happiness sportsmen say prevailed offending concealed nor was provision. Provided so as doubtful on striking required. Waiting we to compass assured. ',
]

const getImage = (i) =>
  `https://source.unsplash.com/600x${400 + i}/?blackandwhite`

const App = () => {
  const [bottomActions, setBottomActions] = useState(null)
  const headerHeight = useHeaderHeight()

  const scrollY = useRef(new Animated.Value(0)).current

  const topEdge =
    bottomActions?.y - height + bottomActions?.height + headerHeight

  const inputRange = [-1, 0, topEdge - 50, topEdge, topEdge + 1]

  const onLayout = (event) => {
    setBottomActions(event.nativeEvent.layout)
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true },
        )}
        style={{ paddingHorizontal: 20 }}>
        {articleParagraphs.map((item, index) => {
          return (
            <View key={index}>
              {index % 3 === 0 && (
                <Image
                  style={[styles.image]}
                  source={{ uri: getImage(index) }}
                />
              )}
              <Text style={[styles.paragraph]}>{item}</Text>
            </View>
          )
        })}
        <View
          onLayout={onLayout}
          style={[styles.bottomActions, { backgroundColor: 'green' }]}
        />
        <View>
          <Text style={[styles.featuredTitle]}>Feature</Text>
          {articleParagraphs.slice(0, 3).map((item, index) => {
            return (
              <View key={`feat-${index}`} style={{ flexDirection: 'row' }}>
                <Image
                  style={[styles.featuredImage]}
                  source={{ uri: getImage(index) }}
                />
                <Text numberOfLines={3} style={[styles.paragraph]}>
                  {item}
                </Text>
              </View>
            )
          })}
        </View>
      </Animated.ScrollView>
      {bottomActions && (
        <Animated.View
          style={[
            styles.bottomActions,
            {
              paddingHorizontal: 20,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              transform: [
                {
                  translateY: scrollY.interpolate({
                    inputRange,
                    outputRange: [0, 0, 0, 0, -1],
                  }),
                },
              ],
            },
          ]}>
          <View
            style={{
              flexDirection: 'row',
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          <View style={[styles.icon]}>
            <Button title="test111" />
          </View>
          <Animated.View
            style={[
              styles.icon,
              {
                transform: [
                  {
                    translateX: scrollY.interpolate({
                      inputRange,
                      outputRange: [100, 100, 100, 0, 0],
                    }),
                  },
                ],
              },
            ]}>
            <Button title="test2222" onPress={() => Alert.alert('press')} />
          </Animated.View>
          <View style={[styles.icon]}>
            <Button title="3333" />
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  featuredImage: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 20,
    borderRadius: 10,
  },
  bottomActions: {
    height: 80,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    width: '100%',
    height: height * 0.4,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: '800',
    marginVertical: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 30,
  },
  paragraph: {
    flex: 1,
    marginBottom: 10,
    // fontFamily: 'Georgia'
    fontSize: 14,
    lineHeight: 16 * 1.5,
  },
  icon: {
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
