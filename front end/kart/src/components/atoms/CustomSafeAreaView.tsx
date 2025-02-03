import { View, Text, ViewStyle, StyleSheet } from 'react-native'
import React, { FC, ReactNode } from 'react'
import { Colors } from '@utils/Constants';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CustomSafeAreaViewProps{
    children:ReactNode;
    style?: ViewStyle;
}

const CustomSafeAreaView:FC<CustomSafeAreaViewProps> = ({children,style}) => {
  return (
    <View style={[styles.container,style]}>
        <SafeAreaView/>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.background
    }
})

export default CustomSafeAreaView