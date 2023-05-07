import { useState } from "react";
import  Modal  from "react-native-modal";
import { Text, View,StyleSheet,Image, TouchableOpacity } from "react-native";
import { users } from "./users";
import { useNavigation } from "@react-navigation/native";

export default function Navbar({state}){
    
    const navigation = useNavigation();

    const [modal,setModal] = useState(false)
    
    return(
        <>
            <Modal animationIn='slideInLeft' style={styles.modal} animationOut='slideOutLeft' animationInTiming={700} animationOutTiming={600}
             onBackdropPress={()=> setModal(false)} onBackButtonPress={() => setModal(false)} isVisible={modal}>
                <View style={[styles.innermodal,{backgroundColor: state ? 'black':'white'}]}>
                    <View style={{height:100,width:'100%',backgroundColor:'#E4E4E4',marginBottom:50}}>
                        {/* inner card */}
                        <View style={[styles.profilecard,{backgroundColor: state ? 'black':'red'}]}>
                            <TouchableOpacity>
                                <Image source={{uri:users[0].profile}}  style={{height:50,width:50,borderRadius:40,marginLeft:15,borderWidth:1,borderColor:'white'}}/>
                            </TouchableOpacity>
                            <Text style={{fontSize:17,marginRight:15,color:'white'}}>Bushra</Text>
                        </View>
                    </View>
                    {/* settings option */}
                    <View style={{justifyContent:'center',flex:1,alignItems:'center',justifyContent:'center'}}>
                        <View>
                            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',gap:10}} onPress={() => navigation.replace('Loginscreen')}>
                                <Image source={require('./logos/logout.png')}  style={{height:24.5,width:28.9}}/>
                                <Text style={{color:'#CC0000'}}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <View style={[styles.container,{backgroundColor : state ? 'black':'#FF3131'}]}>
                <TouchableOpacity onPress={() => setModal(true)}>
                    <Image source={require('./logos/logo1.png')}  style={{height:20,width:50,marginLeft:15}}/>
                </TouchableOpacity>
                <View style={{flex:1,flexDirection:'row-reverse',alignItems:'center'}}>
                    <TouchableOpacity>
                        <View style={styles.notification}>
                            <Text style={{fontSize:10}}>10</Text>
                        </View>
                        <Image source={require('./logos/message.png')}  style={{height:25,width:25,marginRight:17}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('./logos/bell.png')} style={{height:27,width:27,marginRight:12}}/>
                        {/* <Image source={require('./bell.png')} style={{height:35,width:35}}/> */}
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'#FF3131',
        height:50,
        alignItems:'center',
        flexDirection:'row',
    },
    modal:{
        margin:0,
    },
    innermodal:{
        backgroundColor:'white',
        width:'70%',
        height:'100%',
        flex:1,
    },
    notification:{
        backgroundColor:'yellow',
        position:'absolute',
        left:15,
        bottom:15,
        width:20,
        height:15,
        alignItems:'center',
        justifyContent:'center',
        //paddingBottom:3,
        borderRadius:20,
        zIndex:100,
    },
    profilecard:{
        backgroundColor:'#FF3131',
        flexDirection:'row',
        borderWidth:0.4,
        borderColor:'grey',
        height:80,
        width:'80%',
        left:23,
        gap:10,
        bottom:-36,
        position:'absolute',
        borderRadius:10,
        elevation:20,
        alignItems:'center',
        justifyContent:'center',
    },
})