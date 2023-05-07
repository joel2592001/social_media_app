import React, { useEffect, useState } from "react";
import { ScrollView ,Image,StyleSheet ,View, TouchableOpacity,Text} from "react-native";
//import { useNavigation } from '@react-navigation/native';
import  Modal  from "react-native-modal";
//import { users } from "./users";

export default function Story({state}){
    const [data,setData] = useState([])
    const [single,setsingle] = useState()

    //const navigation = useNavigation();
    const [story,setstory] = useState(false);

    const getdata = () =>{
        fetch('http://192.168.0.102:5555/joefeeds')
        // http://192.168.1.20:5555/joefeeds => mykaasu5g
        // http://192.168.0.103:5555/joefeeds => room
        // http://192.168.3.187:5555/joefeeds => mobile
        // http://192.168.1.23:5555/joefeeds => renambl_guest
        .then(response => response.json())
        .then(json => setData(json))
    }
    
    useEffect(() => {
        getdata();
    },[])

    const viewstory=(ele,index)=>{
        setstory(true)
        setsingle(ele)
        setTimeout(() => {
            setstory(false)
        }, 2000);
    }
    //console.log(single)
    return (
        <View style={{backgroundColor : state ? 'black':'white'}}>
            <Modal isVisible={story} onBackdropPress={()=> setstory(false)} onBackButtonPress={()=> setstory(false)}
            animationIn='fadeIn' animationOut='fadeOut' >
                <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
                    <Image source={{uri:single}} style={{height:'100%',width:'100%'}}/>
                </View>
            </Modal>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                    {data.map((val,index) => {
                        return (
                            <TouchableOpacity key={index} onPress={viewstory.bind(this,val.story,index)}>
                                <Image source={{uri:val.profile}} style={styles.story}/>
                                <View style={{alignItems:'center',marginBottom:4,marginTop:-6,marginLeft:5}}>
                                    <Text style={{fontSize:12,color: state? 'white':'black'}}>{val.name}</Text>
                                </View>
                            </TouchableOpacity>
                    );
                    })}
            </ScrollView>
            <View>
                {state? <View style={{backgroundColor:'grey',width:'100%',height:0.2}}>
                </View>:<View></View>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    story:{
        width:75,
        height:75,
        borderRadius:50,
        //padding:20,
        marginLeft:8,
        marginTop:8,
        marginBottom:8,
        borderWidth:3,
        borderColor:'red',
    }
})