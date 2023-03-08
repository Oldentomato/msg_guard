import FLY_URL from './fly_url'

const Msg_Predict = (msg_data) => {
    fetch(FLY_URL+'/predict',{
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
        if(data.success){
            return data.spam
        }
        else{
            return -1
        }
    })
}

export default Msg_Predict