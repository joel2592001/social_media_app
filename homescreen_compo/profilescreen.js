import React, { useState } from "react";
import { View ,Text,StatusBar,Platform,StyleSheet,Image,TouchableOpacity } from "react-native";
import  Modal  from "react-native-modal";

export default function Profilescreen({navigation,route,state}){

    const [follow,setFollow] = useState('red')
    const [followval,setFollowval] = useState('')
    const [profilemodal,setProfileModal] = useState(false)
    const [viewprofile,setviewprofile] = useState(false)

    const set=()=>{
        
        setFollow(!follow)
        let res = parseInt(route.params.val.followers) + 1;
        setFollowval(res)
    }

    const view=()=>{
        setviewprofile(true)
    }

    //console.log(route.params.state)
    return(
        <>
        <Modal isVisible={viewprofile} onBackdropPress={()=> setviewprofile(false)} animationIn='bounceIn' animationOut='zoomOutUp' onBackButtonPress={()=> setviewprofile(false)}>
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Image source={{uri:route.params.val.profile}} style={{height:'70%',width:'100%'}} />
            </View>
        </Modal>
        <Modal animationIn='slideInUp'  onBackdropPress={()=> setProfileModal(false)} onSwipeComplete={() => setProfileModal(false)}
            swipeDirection='down' onBackButtonPress={() => setProfileModal(false)} isVisible={profilemodal}>
            <View style={styles.modal}>
                <View style={[styles.innermodal,{backgroundColor:route.params.state?'#606060':'white'}]}>
                    {/* top slider */}
                    <View style={{alignItems:'center',backgroundColor:state?'white':'darkgrey',width:'10%',height:'2%',marginTop:8,elevation:3,borderRadius:20}}>
                    </View>
                    <View style={styles.editmodal}>
                        <TouchableOpacity>
                            <Text style={{color:route.params.state ? 'white' : 'black'}}>Report...</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{color:route.params.state ? 'white' : 'black'}}>Block</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{color:route.params.state ? 'white' : 'black'}}>Restrict</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{color:route.params.state ? 'white' : 'black'}}>Hide your story</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{color:route.params.state ? 'white' : 'black'}}>Copy profil URL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{color:route.params.state ? 'white' : 'black'}}>Share this profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
        <StatusBar hidden = {false} backgroundColor = {route.params.state ? 'black':"#FF3131"} translucent = {true}/>
        <View style={[styles.container,{backgroundColor: route.params.state ? 'black':"white"}]}>
            {/* nav bar */}
            <View style={[styles.nav,{backgroundColor: route.params.state ? 'black':"#FF3131"}]}>
                <View style={{marginLeft:10}}>
                    <TouchableOpacity onPress={() => navigation.navigate('Homescreen')}>
                        <Image source={require('./logos/backbutton.png')} style={{height:28,width:28,marginRight:12}}/>
                    </TouchableOpacity>
                </View>
                <View>
                    {route.params.state? <View style={{backgroundColor:'grey',width:'100%',height:0.3}}>
                    </View>:<View></View>}
                </View>
                <View style={{}}>
                    <Text style={{fontWeight:'bold',fontSize:20,color:'white'}}>{route.params.val.name}</Text>
                </View>
                <View style={{flex:1,flexDirection:'row-reverse'}}>
                    <TouchableOpacity onPress={() => setProfileModal(true)}>
                        <Image source={require('./logos/threedot.png')} style={{height:28,width:28,marginRight:12}}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('./logos/bell.png')} style={{height:30,width:30,marginRight:12}}/>
                    </TouchableOpacity>
                </View>
            </View>
            {/* profile bar */}
            <View style={{margin:17,backgroundColor: route.params.state ? 'black':"white"}}>
                {/* profil content */}
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity onPress={view}>
                            <Image source={{uri:route.params.val.profile}} style={{width:90,height:90,borderRadius:60,borderWidth:3,borderColor:'red',marginBottom:4}}/>
                        </TouchableOpacity>
                        <Text style={{fontWeight:'bold',color:route.params.state?'white':'black'}}>{route.params.val.name}</Text>
                    </View>
                    <View style={{justifyContent:'space-between',flex:1,flexDirection:'row',marginLeft:20,marginBottom:15}}>
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:route.params.state?'white':'black'}}>0</Text>
                            <Text style={{fontSize:14,fontStyle:'italic',fontWeight:300,color:route.params.state?'white':'black'}}>Posts</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',color:route.params.state?'white':'black'}}>{follow ? route.params.val.followers : followval}</Text>
                            <Text style={{fontSize:14,fontStyle:'italic',fontWeight:300,color:route.params.state?'white':'black'}}>Followers</Text>
                        </View>
                        <View style={{alignItems:'center'}}>
                            <Text style={{fontWeight:'bold',color:route.params.state?'white':'black'}}>{route.params.val.following}</Text>
                            <Text style={{fontSize:14,fontStyle:'italic',fontWeight:300,color:route.params.state?'white':'black'}}>Following</Text>
                        </View>
                    </View>  
                </View>
                {/* profile caption */}
                <View>
                    <Text style={{textAlign:'auto',color:route.params.state?'white':'black'}}>{route.params.val.discription}</Text>
                </View>
                {/* buttons */}
                <View style={{gap:18,flexDirection:'row',justifyContent:'center',marginTop:23}}>
                    <TouchableOpacity onPress={set} style={[styles.btn,{backgroundColor: follow ? 'red' : 'grey',}]}>
                        {follow ? <Text>Follow</Text> : <Text>UnFollow</Text>} 
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn,{backgroundColor:'red'}]}> 
                        <Text>Message</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* post bar */}
            <View style={[styles.profilebar,{backgroundColor:route.params.state?'#606060':'white'}]}>
                <TouchableOpacity>
                    {route.params.state ? <Image source={require('./dark/post.png')} style={{height:28,width:28,marginRight:12}}/> :
                    <Image source={require('./logos/post.png')} style={{height:28,width:28,marginRight:12}}/>}
                </TouchableOpacity>
                <TouchableOpacity>
                    {route.params.state ?<Image source={require('./dark/video.png')} style={{height:28,width:28,marginRight:12}}/> :
                    <Image source={require('./logos/video.png')} style={{height:28,width:28,marginRight:12}}/>}
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        paddingTop:Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    },
    nav:{
        backgroundColor:'red',
        flexDirection:'row',
        alignItems:'center',
        //justifyContent:'center',
        width:'100%',
        height:50,
    },
    btn:{
        // backgroundColor: follow ? 'red' : 'grey',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
        elevation:6,
        width:160,
        height:35,
    },
    profilebar:{
        flexDirection:'row',
        justifyContent:'center',
        gap:115,
        width:'100%',
        height:55,
        alignItems:'center',
        marginTop:10,
        //backgroundColor:'#E4E4E4',
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
        marginLeft:40,
        marginTop:30,
        //marginBottom:30,
        width:'100%'
    },
})