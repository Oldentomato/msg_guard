import {Text, View, TouchableOpacity, StyleSheet} from 'react-native'
import {useEffect} from 'react'


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
    titlefont:{
        marginTop:15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    loadingfont:{
        fontSize: 30,
        fontWeight: 'bold'
    },
})

const MainView = ({navigation}) =>{


    return(
        <View>
            <TouchableOpacity style={styles.button} onPress={()=>{
                navigation.navigate("Admin")
            }} >
                <Text>Admin</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MainView