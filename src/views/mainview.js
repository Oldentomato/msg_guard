import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {getData} from '../components/json_handler'
import {useEffect, useRef} from 'react'
import {AppState} from 'react-native'
import SmsListener from "react-native-android-sms-listener";
import { PermissionsAndroid } from 'react-native';
import Msg_Predict from '../components/msgpredict'


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

const EVENT_SMS_RECEIVED = "android.provider.Telephony.SMS_RECEIVED";
const EVENT_MMS_RECEIVED = "com.samsung.android.chatplus.MMS_RECEIVED";

async function requestReadSmsPermission(){
    try {
        var granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS, {
            title: 'Auto Verification OTP',
            message: 'need access to read sms, to verify OTP'
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          alert('READ_SMS permissions granted', granted);
          console.log('READ_SMS permissions granted', granted);
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, {
              title: 'Receive SMS',
              message: 'Need access to receive sms, to verify OTP'
            }
          );
          
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            alert('RECEIVE_SMS permissions granted', granted);
            console.log('RECEIVE_SMS permissions granted', granted);
            granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECEIVE_MMS, {
                    title: 'Receive MMS',
                    message: 'Need access to receive mms, to verify OTP'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                alert('RECEIVE_MMS permissions granted', granted);
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

    const handleSmsReceived = (event) => {
        const smsData = event.body;
        console.log(`Received SMS: ${smsData}`)

    }

    const handleMmsReceived = (event) => {
        const mmsData = event.body;
        console.log(`Received SMS: ${mmsData}`)
    }

    useEffect(()=>{
        requestReadSmsPermission()
        const backgroundlis = AppState.addEventListener('change',handleAppStateChange);
        let listener = SmsListener.addListener((msg)=>{
            console.log(msg)
            const msg_data = {
                id: msg.sms_id,
                body: msg.body,
                eventtime: msg.timestamp
            }
            
            Msg_Predict(msg_data).then((result)=>{
                if(result == -1){
                    console.log("Error")
                }
                else{
                    if(result == 1){ //스팸
                        // storeData(getData('count')+1, msg_data)
                        SmsAndroid.delete(
                            msg.sms_id, 
                            (fail)=>{
                                console.log('Failed with this error: '+fail);
                            },
                            (success)=>{
                                console.log('SMS deleted successfully');
                            }
                        )
                    } 
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