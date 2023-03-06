import AsyncStorage from "@react-native-async-storage/async-storage"

const getData = async(key)=>{
    try{
        const value = await AsyncStorage.getItem(key);
        if(value !== null){
            const data = JSON.parse(value);
            return data;
        }
    }catch(e){
        console.log(e.message);
    }
}

const storeData = async(key, value) =>{
    try{
        const stringValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, stringValue)
    }catch(e){
        console.error(e.message)
    }
}

export {getData, storeData}