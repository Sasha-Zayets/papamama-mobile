import React, { Component } from 'react';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { Dimensions, StyleSheet,  View } from 'react-native';
import { app_styles } from '../../styles/app_styles';

const { width: screenWidth } = Dimensions.get('window');

export default class ParallaxImageSlider extends Component {

  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0,
    }
  }

  _renderItem ({item, index}, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{ uri: item.image }}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.4}
          {...parallaxProps}
        />
      </View>
    );
  }

  get pagination () {
    const { activeSlide } = this.state;
    const { entries = [], scales } = this.props;

    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{ marginTop: -(Math.round(scales.widthScale * 20)), marginBottom: 0}}
        dotStyle={{
          width: Math.round(scales.widthScale * 10),
          height: Math.round(scales.widthScale * 10),
          borderRadius: Math.round(scales.widthScale * 5),
          marginHorizontal: Math.round(scales.widthScale * 3),
          backgroundColor: app_styles(scales).colors.app.blue
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  render () {
    return (
      <View>
        <Carousel
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth}
          data={this.props.entries}
          renderItem={this._renderItem}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          hasParallaxImages={true}
        />
        { this.pagination }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth,
    height: screenWidth - 100,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
});
