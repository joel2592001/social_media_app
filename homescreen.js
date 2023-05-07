import React, { useState } from 'react'
import { View ,StyleSheet,Text, Platform,ScrollView,StatusBar, TouchableOpacity, Switch} from 'react-native'
import Navbar from './homescreen_compo/navbar';
import Story from './homescreen_compo/story';
import Feed from './homescreen_compo/feeds';
import Footer from './homescreen_compo/footer';

export default function Homescreen({navigation}){

  const [dark,setdark] = useState(false)
  //console.log(dark)

  return (
    <View style={styles.container}>
        <StatusBar  hidden = {false} backgroundColor = {dark ? 'black':"#FF3131"} translucent = {true}/>
        <Navbar state={dark}/>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Story state={dark}/>
          <Feed state={dark}/>
        </ScrollView>
        <View style={styles.switch}>
          <Switch value={dark} onValueChange={(value) => setdark(value)}/>
        </View>
        <TouchableOpacity style={[styles.add,{backgroundColor : dark ? 'black':'#FF3131'}]}>
            <Text style={{fontSize:50,marginBottom:5,color:'white'}}>+</Text>
        </TouchableOpacity>
        <Footer state={dark}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    },
    add:{
      position:'absolute',
      //backgroundColor:'#FF3131',
      borderWidth:0.2,
      borderColor:'grey',
      height:70,
      width:70,
      zIndex:100,
      left:146,
      top:650,
      borderRadius:50,
      alignItems:'center',
      justifyContent:'center',
      elevation:5,
    },
    switch:{
      //left:155,
      //top:100,
      position:'absolute',
      zIndex:100,
      right:100,
      bottom:655,
    }
})