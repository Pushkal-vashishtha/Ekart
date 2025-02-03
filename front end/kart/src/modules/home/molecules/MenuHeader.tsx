import { View, Text, StyleSheet } from 'react-native'
import React, { FC, useState } from 'react'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { menuData } from '@utils/db';
import MenuItem from '../atoms/MenuItem';
import Icon from '@components/atoms/Icon';
import { RFValue } from 'react-native-responsive-fontsize';
import { Colors } from '@utils/Constants';

const MenuHeader:FC<{scrollY:any }> = ({scrollY}) => {


    const [focusedIndex,setFocusedIndex ] = useState(0);

    const opacityFadingStyles = useAnimatedStyle(()=>{
        const opacity = interpolate(scrollY.value,[0,80],[1,0])
            return{
                opacity
            }
    }) 
  return (
    <Animated.View style={[styles.container,]}>
        <SafeAreaView/>
        <View style={styles.flexRow}>
             { menuData.map((item,index)=>(
                <MenuItem
                    key={index}
                    item={item}
                    isFocused ={focusedIndex=== index}
                    onSelect={()=> setFocusedIndex(index)}
                />
             )) }
        </View>
        <View style={styles.addressContainer}>
            <Icon size={20} name='home' iconFamily='MaterialCommunityIcons'/>
            <Text style={styles.home}>Home</Text>
            <Text numberOfLines={1} style={styles.addressText}>211/40 prem nagar line par bly</Text>
            <Icon size={18} name='arrow-right-thin' iconFamily='MaterialCommunityIcons'/>

        </View>

    </Animated.View>
  )
}

const styles = StyleSheet.create({
    container:{
        padding:10
    },
    flexRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    addressContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:5
    },
    home:{
        marginHorizontal:5,
        fontWeight:'bold',
        fontSize:RFValue(16),
        color:Colors.text
    },
    addressText:{
        flex:1,
        fontSize:RFValue(12),
        color:Colors.text
    }
});

export default MenuHeader