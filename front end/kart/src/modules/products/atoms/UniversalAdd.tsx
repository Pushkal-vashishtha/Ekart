import Icon from '@components/atoms/Icon';
import { addItem, removeItem, selectItemCountById } from '@modules/cart/api/slice';
import { useAppDispatch, useAppSelector } from '@store/reduxHook';
import { Colors } from '@utils/Constants';
import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

const UniversalAdd :FC<{item:any}>= ({item}) => {

    const count = useAppSelector(selectItemCountById(item._id));
    const dispatch = useAppDispatch();
    return (
        <View style={[styles.container,{backgroundColor:count===0 ?'#fff':Colors.active }]}>
           {
            count === 0?(
                <TouchableOpacity onPress={()=>dispatch(addItem(item))} style={styles.add}>
                    <Text style={styles.addText}>ADD</Text>
                </TouchableOpacity>
            ):(
                <View style={styles.counterContainer}>
                    <TouchableOpacity onPress={()=>dispatch(removeItem(item))}>
                        <Icon color='#fff' name='minus' iconFamily='MaterialCommunityIcons' size={RFValue(12)} />
                    </TouchableOpacity>
                    <Text style={styles.text}>{count}</Text>
                    <TouchableOpacity onPress={()=>dispatch(addItem(item))}>
                        <Icon color='#fff' name='plus' iconFamily='MaterialCommunityIcons' size={RFValue(12)} />
                    </TouchableOpacity>
                </View>

            )
           }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor:Colors.active
    },
    add:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:4,
        paddingVertical:4
    },
    addText:{
        color:Colors.active
    },
    counterContainer:{
        flexDirection:'row',
        alignItems:'center',
        width:'80%',
        paddingHorizontal:4,
        paddingVertical:4,
        justifyContent:'space-between'
    },
    text:{
        color:'#fff',
        fontWeight:'500',
        fontSize:RFValue(12)
    },
});

export default UniversalAdd;