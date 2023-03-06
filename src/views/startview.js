import {useState, useEffect} from 'react';
import {Text, View} from 'react-native'
import {getData, storeData} from '../component/json_handler'

const StartView = () =>{

    const [isLoading, setisLoading] = useState(false);

    useEffect(()=>{
        if(getData('count') == null){
            storeData('count',0)
        }
    },[])

    return(
        <>
            <Text>Start View</Text>
            {CheckLoading()}
        </>
    )
}

export default StartView