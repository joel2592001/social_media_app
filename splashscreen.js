import React from "react";
import { StyleSheet, Text ,StatusBar, Image} from "react-native";
import { View } from "react-native";
import Joefeeds from './assets/joefeeds.gif'

export default function Splashscreen({navigation}){

    setTimeout(() => {
        navigation.replace('Onboarding')
        }, 3950);

    return (
        <>
        {/* <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FF3131" translucent = {true}/> */}
        <View style={styles.container}>
            <Image source={require('./assets/joefeeds.gif')} style={{height:'75%',width:'90%'}}/>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    }
}) 