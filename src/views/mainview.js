import {Text, View, TouchableOpacity, StyleSheet, Linking,Alert} from 'react-native'
import {getData} from '../components/json_handler'
import {useEffect, useRef, useState} from 'react'
import {AppState} from 'react-native'
import SmsListener from "react-native-android-sms-listener";
import { PermissionsAndroid } from 'react-native';
import FLY_URL from '../components/fly_url'
import SmsAndroid from 'react-native-get-sms-android';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#323232',
        alignItems: 'center',
    },
    statusfont:{
        fontSize: 15,
        color: '#0aff0a',
    },
    donefont:{
        fontSize: 15,
        color: '#0aff0a',
    },
    button:{
        width: 200,
        marginTop: 50,
        backgroundColor: '#000000',
        width: 350,
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 20,
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 20
    },
    versionfont:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000'
    },
    adminbtnfont:{
        marginTop:1,
        fontSize: 30,
        fontWeight: 'bold',
    },
    loadingfont:{
        fontSize: 30,
        fontWeight: 'bold'
    },
})


async function requestReadSmsPermission(){
    try {
        var granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS, {
            title: 'Auto Verification OTP',
            message: 'need access to read sms, to verify OTP'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //   alert('READ_SMS permissions granted', granted);
          console.log('READ_SMS permissions granted', granted);
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, {
              title: 'Receive SMS',
              message: 'Need access to receive sms, to verify OTP'
            }
          );
          
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // alert('RECEIVE_SMS permissions granted', granted);
            console.log('RECEIVE_SMS permissions granted', granted);
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECEIVE_MMS, {
                    title: 'Receive MMS',
                    message: 'Need access to receive mms, to verify OTP'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // alert('RECEIVE_MMS permissions granted', granted);
                console.log('RECEIVE_MMS permissions granted', granted);
            }
            else{
                alert('RECEIVE_MMS permissions denied');
                console.log('RECEIVE_MMS permissions denied');
            }
          } else {
            alert('RECEIVE_SMS permissions denied');
            console.log('RECEIVE_SMS permissions denied');
          }
        } else {
          alert('READ_SMS permissions denied');
          console.log('READ_SMS permissions denied');
        }
      } catch (err) {
        alert(err);
      }
}




const MainView = ({navigation}) =>{

    const appState = useRef(AppState.currentState);

    const handleAppStateChange = (nextAppState) => {
        if(appState.current.match(/inactive|background/)&&nextAppState==='active'){
            console.log('foreground');
        }
        else{
            console.log('background');

        }
        appState.current = nextAppState;
    }
    

    

    useEffect(()=>{
        requestReadSmsPermission()
        const backgroundlis = AppState.addEventListener('change',handleAppStateChange);
        let listener = SmsListener.addListener(async(msg)=>{
            console.log(msg)
            const msg_data = {
                id: msg.msg_id,
                body: msg.body,
                eventtime: msg.timestamp
            }

            await fetch(FLY_URL+'/predict',{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    id: msg_data.id,
                    msg_body: msg_data.body,
                    event_timestamp: msg_data.eventtime
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.success === "True"){
                    if(data.spam === 0){ //스팸
                        console.log(msg.msg_id)
                        // storeData(getData('count')+1, msg_data)
                        SmsAndroid.delete(
                            msg.msg_id, 
                            (fail)=>{
                                console.log('Failed with this error: '+fail);
                            },
                            (success)=>{
                                console.log('SMS deleted successfully');
                            }
                        )
                    } 
                }
                else{
                    console.log("Error")
                }
            })



        })
        // const count = getData('count')
        // for(var i=1;i<=count;i++){
        //     getData(i.toString())
        // }

        return () =>{
            backgroundlis.remove();
            listener.remove();
        };
        
    },[])


    return(
        <View>
            <Text style={styles.versionfont}>0.7</Text>
            <TouchableOpacity style={styles.button} onPress={()=>{
                navigation.navigate("Admin")
            }} >
                <Text style={styles.adminbtnfont}>Admin</Text>
                {}
            </TouchableOpacity>
        </View>
    )
}

export default MainView