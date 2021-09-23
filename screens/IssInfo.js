import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, StatusBar, SafeAreaView, Alert} from 'react-native'
import axios from 'axios'

export default class Iss extends React.Component{
    
    constructor(){
        super();

        this.state = {
            location: {}
        }
    }

    getISSLocation = () => {
        axios.get("https://api.wheretheiss.at/v1/satellites/25544")

        .then(response => {
            this.setState({location : response.data});
        })
        .catch(error => {
            Alert.alert(error.message);
        });
    }
    
    componentDidMount()
    {
        try{
            this.getISSLocation();

            setInterval( async() => {
                this.getISSLocation();
            }, 5000);
        }
        catch(error){
            console.log(error);
        }
    }

    render()
    {
        
            if(Object.keys(this.state.location).length === 0)
            {
                return(
                    <View>
                        <Text>Looooading</Text>
                    </View>
                )
            }
            else{
                return(
                    <View style={styles.view}>
                        <Text>Latitude: {this.state.location.latitude}</Text>
                        <Text>Longitude: {this.state.location.longitude}</Text>
                        <Text>Altitude: {this.state.location.altitude}</Text>
                        <Text>Velocity: {this.state.location.velocity}</Text>
                    </View>
            )
        }
    }
}

const styles = StyleSheet.create({

    map: {
        width: "100%",
        height: "100%"
    },

    MapContainor: {
        flex: 0.5
    },

    view: {
        flex: 1
    },
    title:{
       fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },

    safeView: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },

    backImg: {
        resizeMode: 'cover',
        flex: 1
    },

    rootName: {
         flex: 0.25,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        borderRadius: 30,
        backgroundColor: 'white'
    }
})