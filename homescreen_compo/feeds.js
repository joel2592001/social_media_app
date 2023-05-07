import React, { useState,useEffect } from "react";
import {View,StyleSheet,Text,TouchableOpacity,Image,ActivityIndicator } from "react-native";
//import { users } from "./users";
import { useNavigation } from '@react-navigation/native';
import  Modal  from "react-native-modal";


export default function Feed({state}){

    const [like,setLike] = useState({})
    const [data,setData] = useState([])
    const [likecount,setlikecount] = useState({})
    const [bookmark,setbookmark] = useState({})
    const [modal,setModal] = useState(false)
    const [favorites,setfavorites] = useState({})
    const [load,setload] = useState(true)
    

    const navigation = useNavigation();

    const getdata = () =>{
        fetch('http://192.168.0.102:5555/joefeeds')
        // http://192.168.1.20:5555/joefeeds => mykaasu5g
        // http://192.168.0.103:5555/joefeeds => room
        // http://192.168.3.187:5555/joefeeds => mobile
        // http://192.168.1.23:5555/joefeeds => renambl_guest
        .then(response => response.json())
        .then(json => {
            if(json){
                setload(!load)
            }
            setData(json)
        })
    }
    
    useEffect(() => {
        getdata();
    },[])

    

    const like_unlike = (ele,index) => {
        setLike({ ...like, [index]: !like[index] });
        let sum = parseInt(ele.likes)+1;
        setlikecount({...likecount,[index] : sum})
        
    };
 //console.log(like)
    const mark_unmark = (ele,index) => {
        setbookmark({ ...bookmark, [index]: !bookmark[index]});
    }
      
    const fav_unfav = () => {
        setfavorites(!favorites)
    } 

    return(
        <>
            {/* loading modal */}
            <Modal isVisible={load}>
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                    <ActivityIndicator size="large" color="#CC0000" />
                </View>
            </Modal>
            {/* profile modal */}
            <Modal animationIn='slideInUp'  onBackdropPress={()=> setModal(false)} onSwipeComplete={() => setModal(false)}
            swipeDirection='down' onBackButtonPress={() => setModal(false)} isVisible={modal}>
                <View style={[styles.modal]}>
                <View style={[styles.innermodal,{backgroundColor:state?'#606060':'white'}]}>
                    {/* top slider */}
                    <View style={{alignItems:'center',backgroundColor:state?'white':'darkgrey',width:'10%',height:'2%',marginTop:8,elevation:3,borderRadius:20}}>
                    </View>
                    <View style={styles.editmodal}>
                        <TouchableOpacity onPress={fav_unfav} style={{flexDirection:'row',alignItems:'center'}}>
                            {/* <Image source={require('./logos/unfav.png')} style={{height:30,width:30}}/> */}
                            {favorites ?
                            state ? <Image source={require('./dark/unfav.png')} style={{height:30,width:30}}/>:
                            <Image source={require('./logos/unfav.png')} style={{height:30,width:30}}/> :
                            state ? <Image source={require('./dark/fav.png')} style={{height:30,width:30}}/>:
                            <Image source={require('./logos/fav.png')} style={{height:30,width:30}}/>
                            }
                            <Text style={{marginLeft:17,color:state?'white':'black'}}>Add to favorites</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                            {state ? <Image source={require('./dark/unfriend.png')} style={{height:30,width:30}}/>:
                            <Image source={require('./logos/unfriend.png')} style={{height:30,width:30}}/>}
                            <Text style={{marginLeft:17,color:state?'white':'black'}}>UnFollow</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                            {state ? <Image source={require('./dark/ibutton.png')} style={{height:28,width:28}}/>:
                            <Image source={require('./logos/ibutton.png')} style={{height:28,width:28}}/>}
                            <Text style={{marginLeft:17,color:state?'white':'black'}}>Why you're seeing this post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                            {state ? <Image source={require('./dark/hide.png')} style={{height:30,width:30}}/>:
                            <Image source={require('./logos/hide.png')} style={{height:30,width:30}}/>}
                            <Text style={{marginLeft:17,color:state?'white':'black'}}>Hide</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={require('./logos/report.png')} style={{height:31,width:31}}/>
                            <Text style={{marginLeft:17,color:'#CC0000',color:state?'white':'black'}}>Report</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
            {/* maping data from json */}
            {data.map((val,index) => {
                return (
                    <View style={[styles.container,{backgroundColor:state?'black':'white'}]} key={index}>
                        {/* post header */}
                        <View style={[styles.profilecontainer,{backgroundColor : state ? 'black':'white'}]}>
                            <TouchableOpacity style={{alignItems:'center',flexDirection:'row'}} onPress={()=> navigation.navigate('Profilescreen',{val,state})}>
                                <Image source={{uri:val.profile}} style={styles.profile}/>
                                <Text style={{marginLeft:9,fontWeight:700,color: state ? 'white':'black'}}>{val.name}</Text>
                            </TouchableOpacity>
                            <View style={styles.dot}>
                                <TouchableOpacity onPress={() => setModal(true)}>
                                    <Text style={{fontWeight:800,fontSize:30,color: state ? 'white':'black'}}>...</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* post */}
                        <View>
                            <Image source={{uri:val.post}} style={styles.postcontainer}/>
                        </View>
                        {/* post footer */}
                        <View style={{marginBottom:20,padding:10,backgroundColor:state?'black':'white'}}>
                            <View style={{flexDirection:'row',marginBottom:6,backgroundColor:state?'black':'white'}}>
                                <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
                                    <TouchableOpacity onPress={like_unlike.bind(this,val,index)}>
                                    {like[index] ?
                                    <Image source={require('./logos/liked.png')} style={{height:25,width:25.5}}/> :
                                    state ? <Image source={require('./dark/like.png')} style={{height:25,width:25.5}}/> : 
                                    <Image source={require('./logos/like.png')} style={{height:25,width:25.5}}/>
                                    }
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        {state ? <Image source={require('./dark/comment.png')} style={{height:27,width:28,marginLeft:15}}/> : 
                                        <Image source={require('./logos/comment.png')} style={{height:27,width:28,marginLeft:15}}/>}
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        {state ? <Image source={require('./dark/share.png')} style={{height:26,width:26,marginLeft:15,marginTop:1}}/> :
                                        <Image source={require('./logos/share.png')} style={{height:26,width:26,marginLeft:15,marginTop:1}}/>} 
                                    </TouchableOpacity> 
                                </View>
                                <View style={{flexDirection:'row-reverse',flex:1,}}>
                                    <TouchableOpacity onPress={mark_unmark.bind(this,val,index)}>
                                        {bookmark[index] ?
                                        state ? <Image source={require('./dark/mark.png')} style={{height:27,width:27}}/> :
                                        <Image source={require('./logos/mark.png')} style={{height:27,width:27}}/> :
                                        state ? <Image source={require('./dark/unmark.png')} style={{height:27,width:27}}/> :
                                        <Image source={require('./logos/unmark.png')} style={{height:27,width:27}}/>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* likes */}
                            <View style={{marginLeft:3,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontSize:13,color:state?'white':'black'}}>Liked by</Text>
                                <Text style={{fontWeight:800,color:state?'white':'black'}}> {val.likedby} </Text>
                                <Text style={{color:state?'white':'black'}}>and </Text>
                                <Text style={{fontWeight:800,color:state?'white':'black'}}>{like[index] ? likecount[index] : val.likes  } others</Text>
                            </View>
                            {/* caption */}
                            <View style={{marginLeft:3,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{fontWeight:800,color:state?'white':'black'}}>{val.name} : </Text>
                                <Text style={{color:state?'white':'black'}}>{val.caption}</Text>
                            </View>
                            <View style={{marginLeft:3}}>
                                <TouchableOpacity>
                                    <Text style={{fontStyle:'italic',fontWeight:300,color:state?'white':'black'}}>view all comment</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            {state? <View style={{backgroundColor:'grey',width:'100%',height:0.3}}>
                            </View>:<View></View>}
                        </View>
                    </View>
            );
            })} 
        </>
    ) 
}

const styles = StyleSheet.create({
    container:{
        //backgroundColor:'white',
        // borderTopLeftRadius:30,
        // borderTopRightRadius:30,
        width:'100%',
        borderTopEndRadius:0.2,
        borderColor:'grey',
        //height:100,
        elevation:19,
    },
    profilecontainer:{
        backgroundColor:'white',
        flexDirection:'row',
        height:55,
        width:'100%',
        alignItems:'center',
        
    },
    profile:{
        width:40,
        height:40,
        borderRadius:30,
        marginLeft:8,
        borderWidth:2,
        borderColor:'#FF3131',
    },
    postcontainer:{
        backgroundColor:'blue',
        width:'100%',
        height:350,
    },
    dot:{
        flex:1,
        flexDirection:'row-reverse',
        marginLeft:20,
        alignContent:'center',
        marginBottom:20,
    },
    modal:{
        margin:0,
        //backgroundColor: 'rgba(0,0,0,0.5)',
    },
    innermodal:{
        backgroundColor:'white',
        alignItems:'center',
        height:'65%',
        width:'111%',
        right:17,
        top:290,
        borderTopEndRadius:40,
        borderTopLeftRadius:40,
    },
    editmodal:{
        //flex:1,
        justifyContent:'center',
        rowGap:18,
        marginLeft:60,
        marginTop:30,
        //marginBottom:30,
        width:'100%'
    },
})