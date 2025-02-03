import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { FC, useState } from 'react';
import { screenWidth } from '@utils/Constants';
import Carousel from 'react-native-reanimated-carousel';

const AdCarousal: FC<{ data: any }> = ({ data }) => {
  const [active, setActive] = useState(0);

  const baseOptions = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.8,
  };

  return (
    <View>
      <Carousel
        {...baseOptions}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        onSnapToItem={(index: number) => setActive(index)}
        data={data.data}
        renderItem={({ item }: any) => (
          <Pressable style={styles.imageContainer}>
            <Image source={item?.image_uri} style={styles.img} />
          </Pressable>
        )}
      />
      {active !== null && (
        <View style={styles.dots}>
          {data?.data?.map((_: any, index: number) => (
            <Text
              key={index}
              style={{
                color: index === active ? 'black' : 'gray', // Highlight active dot
                fontSize: 20,
                marginHorizontal: 5,
              }}
            >
              ●
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: 100,
    marginTop: 10,
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default AdCarousal;
