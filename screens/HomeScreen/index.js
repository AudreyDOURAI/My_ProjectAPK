import {
  View,
  Text,
  Image,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './styles';
import articles from '../../data/articles.json';
import useInterval from '../../hooks/useInterval';
import {carrousel} from '../../data/carrousel';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const animation = useRef(new Animated.Value(0));
  const [currentImage, setCurrentImage] = useState(0);
  useInterval(() => handleAnimation(), 4000);

  const handleAnimation = () => {
    let newCurrentImage = currentImage + 1;

    if (newCurrentImage >= carrousel.length) {
      newCurrentImage = 0;
    }

    Animated.spring(animation.current, {
      toValue: -(Dimensions.get('screen').width * newCurrentImage),
      useNativeDriver: true,
    }).start();

    setCurrentImage(newCurrentImage);
  };
  return (
    <View style={styles.container}>
      <View>
        <Animated.View
          style={[
            styles.carrousel,
            {
              transform: [{translateX: animation.current}],
            },
          ]}>
          {carrousel.map(image => (
            <Image key={image} source={{uri: image}} style={styles.image} />
          ))}
        </Animated.View>
        <View style={styles.carrouselIndicator}>
          {carrousel.map((image, index) => (
            <View
              key={`${image}_${index}`}
              style={[
                styles.indicator,
                index === currentImage ? styles.activeInjdicator : undefined,
              ]}
            />
          ))}
        </View>
      </View>
      <View style={styles.links}>
        <TouchableOpacity
          onPress={navigation.navigate('ChaussureDetailsScreen')}>
          {/* onPress={()=>navigation.navigate('ChaussureDetailsScreen')}> */}
          <Image
            style={styles.categoriesImage}
            source={{uri: articles[0].image}}
          />
          <Text style={styles.text}>Chaussure</Text>
        </TouchableOpacity>
        <View>
          <Image
            style={styles.categoriesImage}
            source={{uri: articles[1].image}}
          />
          <Text style={styles.text}>Sac à main</Text>
        </View>
      </View>
      <View style={styles.links}>
        <View>
          <Image
            style={styles.categoriesImage}
            source={{uri: articles[2].image}}
          />
          <Text style={styles.text}>T-Shirt</Text>
        </View>
        <View>
          <Image
            style={styles.categoriesImage}
            source={{uri: articles[3].image}}
          />
          <Text style={styles.text}>Pantalon</Text>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
