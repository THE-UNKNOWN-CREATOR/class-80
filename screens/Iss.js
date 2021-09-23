import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, SafeAreaView, Alert} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
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
                        <SafeAreaView style={styles.safeView}/>
                        <ImageBackground source={require("../assets/bg_image.png")} style={styles.backImg}>
                            <View>
                                <Text style={styles.title}>ISS Location</Text>
                            </View>

                            <View style={styles.MapContainor}>
                                <MapView style={styles.map} region={{
                                        latitude: this.state.location.latitude,
                                        longitude: this.state.location.longitude,
                                        latitudeDelta: 100,
                                        longitudeDelta: 100
                                    }}>
                                        <Marker coordinate={{
                                            latitude: this.state.location.latitude,
                                            longitude: this.state.location.longitude
                                        }}></Marker>
                                </MapView>
                            </View>
                        </ImageBackground>
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