import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, FlatList, ImageBackground, StatusBar, Platform} from 'react-native'
import axios from 'axios';

export default class Meteor extends React.Component{
    
    constructor()
    {
        super();

        this.state = {
            meteors: {}
        }
    }

    componentDidMount()
    {
        this.getMeteors();
    }

    getMeteors = () => {
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nlAdxlsH4tiBlMdYFgiySdLbgC1q9ZDQyZ73S5jJ")

        .then(response => {
            this.setState({meteors: response.data.near_earth_objects});
        })
        .catch(error => {
            Alert.alert(error);
        })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = (item) => {
        let meteor = item;
        var backGroundIMAGE, speed, size;

        if(meteor.threat_score < 30)
        {
            backGroundIMAGE = require('../assets/meteor_bg1.png');
            speed = require('../assets/meteor_speed1.gif');
            size = 100;
        }
        else if(meteor.threat_score <= 75)
        {
            backGroundIMAGE = require('../assets/meteor_bg2.png');
            speed = require('../assets/meteor_speed2.gif');
            size = 150;
        }
        else
        {
            
            backGroundIMAGE = require('../assets/meteor_bg3.png');
            speed = require('../assets/meteor_speed3.gif');
            size = 200;
            
        }

        return(
            <View>
                <ImageBackground source={backGroundIMAGE} style={styles.background}>
                    <Image source={speed} style={{width: size, height: size, alignSelf: 'center'}}></Image>
                    <View>
                        <Text style={[styles.text, {marginTop: 400, marginLeft: 200}]}>{item.name}</Text>
                        <Text>closest_to_earth: {item.close_approach_data[0].close_approach_date_full}</Text>
                        <Text>minimum_diameter(km): {item.estimated_diamater.kilometres.estimated_diameter_min}</Text>
                        <Text>maximum_diameter(km): {item.estimated_diamater.kilometres.estimated_diameter_max}</Text>
                        <Text>missing_earth_by(km): {item.close_approach_data[0].miss_distance.kilometres}</Text>
                    </View>
                </ImageBackground>
            </View>
        )
    }
    
    render()
    {
        if(Object.keys(this.state.meteors).length === 0)
        {
            return(
                <View>
                    <Text>Loaaaaaaading</Text>
                </View>
            )
        }
        else
        {   
            let meteor_array = Object.keys(this.state.meteors).map(meteor_date => {
                return this.state.meteors[meteor_date];
            });

            let meteors = [].concat.apply([], meteor_array);

            meteors.array.forEach(function(element) {
                var est = element.estimated_diameter.kilometres;
                let diameter = (est.estimated_diamater_min + est.estimated_diamater_max);
                let threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometres) * 1000000000;
                element.threat_score = threatScore;
            });

            meteors.sort( (a, b) => {
                return b.threat_score - a.threat_score;
            } )

            meteors = meteors.slice(0, 5);

            return(
                <View style={styles.view}>
                    <SafeAreaView style={styles.safeView}>
                        <FlatList keyExtractor={ this.keyExtractor } horizontal={true} renderItem={this.renderItem} data={meteors} />
                    </SafeAreaView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create( {
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

    background: {

    },

    text: {
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold'
    }
} )