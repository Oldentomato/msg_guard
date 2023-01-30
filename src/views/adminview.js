import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import { SendAllData } from '../components/senddata'

const styles = StyleSheet.create({
    button:{
        width: 100,
        marginTop: 50,
        backgroundColor: '#000000',
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 20,
        borderWidth: 3,
        borderColor: '#fff',
        borderRadius: 20
    },
})

const AdminView = () => {

    return(
        <>
            <TouchableOpacity style={styles.button} onPress={()=>{
                SendAllData();
            }} >
                <Text>Send Datas</Text>
            </TouchableOpacity>
        </>
    )
}

export default AdminView