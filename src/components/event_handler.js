import { DeviceEventEmitter } from "react-native";
import Msg_Predict from "./msgpredict"
import SmsAndroid from 'react-native-get-sms-android'
import {getData, storeData} from '../components/json_handler'

const DeleteMsg = () =>{

}



DeviceEventEmitter.addListener('sms_onDelivery', (msg)=>{
    msg_data = {
        id: msg._id,
        body: msg.body 
    }
    result = Msg_Predict(msg_data)
    if(result == -1){
        console.log("Error")
    }
    else{
        if(result == 0){ //스팸
            storeData(getData('count')+1, msg_data)
            SmsAndroid.delete(
                msg._id,
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