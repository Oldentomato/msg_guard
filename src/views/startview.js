import {useState, useEffect} from 'react';
import {Text, View} from 'react-native'


const StartView = () =>{

    const [isLoading, setisLoading] = useState(false);

    useEffect(()=>{
        
    },[])

    return(
        <>
            <Text>Start View</Text>
            {CheckLoading()}
        </>
    )
}

export default StartView