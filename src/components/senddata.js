import SmsAndroid from 'react-native-get-sms-android';
import VERCEL_URL from './vercel_url'

const SendToDB = (url,msg_arr,count) =>{
    console.log('Sending to DB...'+count)
    fetch(url+'/api/SendAllData',{
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            msg_data: msg_arr,
            data_num: "20230131_data_1"
        })
    }).then(res=>res.json())
    .then(data=>{
        if(data.success){
            console.log("Success")
            
        }
        else{
            console.log("Failed")
        }
        
    })
}

const SendAllData = () =>{
    const URL = VERCEL_URL
    const LocalURL = 'http://localhost:3000'



    var filter = {
        box: 'inbox',
        indexFrom: 0
    }

    console.log('Collecting SMS...')

    SmsAndroid.list(
        JSON.stringify(filter),
        (fail)=>{
            console.log('Failed with this error: '+ fail);
            
        },
        async(count,smsList)=>{
            var arr = JSON.parse(smsList);
            var len_count = Math.floor(count / 100);
            var arr_len = 100;
            var j = 0;


            for(var i= 0; i<len_count; i++){
                var msg_arr = [];

                if((i+1) === len_count){
                    arr_len -= 100;
                    arr_len += (len_count * 100) - count;
                }

                //Promise는 forEach를 인지하지 못함 
                for(j;j<arr_len;j++){
                    msg_arr.push({"msg_date":arr[j].date,
                    "msg_body":arr[j].body,
                    "number":arr[j].address});
                }
                await SendToDB(URL,msg_arr,i);
                arr_len += 100;
            }



        }
    )
}

const SendData = () =>{

}

export {SendAllData, SendData}

