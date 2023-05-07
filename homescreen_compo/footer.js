import { Text, View,StyleSheet,Image, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Footer({state}){
    return(
        <>
            <View style={[styles.container,{backgroundColor : state ? 'black':'#FF3131'}]}>
                <TouchableOpacity>
                    <Image source={require('./logos/home.png')} style={{height:26,width:26}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('./logos/profile.png')} style={{height:30,width:30}}/>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'red',
        borderTopWidth:0.2,
        borderColor:'grey',
        height:55,
        alignItems:'center',
        justifyContent:'center',
        gap:200,
        flexDirection:'row',
    },
})