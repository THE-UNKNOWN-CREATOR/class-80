import 'react-native-gesture-handler'
import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Platform, ImageBackground, Image} from 'react-native'

export default class Home extends React.Component{
    render()
    {
        return(
            <View style={styles.view}>
                <SafeAreaView style={styles.safeView}/>
                <ImageBackground source={require("../assets/bg_image.png")} style={styles.backImg}>
               <View>
                    <Text style={styles.title}>ISS Tracker</Text>
                </View>

                 <TouchableOpacity style={styles.rootName} onPress = { () => {
                    this.props.navigation.navigate('Iss Location')
                 }
                }>
                    <Image style={styles.iconImage} source={require('../assets/iss_icon.png')}></Image>
                    <Text style={styles.digitBIG}>1</Text>
                    <Text style={styles.titleThing}>Look At A SpaceShip</Text>
                    <Text style={styles.knowMore}>Know More</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rootName} onPress = { () => {
                        this.props.navigation.navigate('Meteor')
                    }
                }>
                    <Image style={styles.iconImage} source={require('../assets/meteor_icon.png')}></Image>
                    <Text style={styles.digitBIG}>2</Text>
                    <Text style={styles.titleThing}>Look At A Rock Floating In Space</Text>
                    <Text style={styles.knowMore}>Know More</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.rootName}>
                    <Text>Look At New Things</Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    },

    knowMore: {
        paddingLeft: 30,
        color: 'red',
        fontSize: 16
    },

    digitBIG: {
        position: 'absolute',
        color: 'lightyellow',
        fontSize: 150,
        zIndex: -1,
        bottom: -15,
        right: 20
    },

    iconImage: {
        position: 'absolute',
        height: 200,
        width: 200,
        resizeMode: 'contain',
        right: 20,
        top: -80
    },

    titleThing: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 75,
        paddingLeft: 30
    }
})