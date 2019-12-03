import React, { Component } from 'react';
import {Image, View, Text, StyleSheet, AsyncStorage, Alert, Vibration } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';

export default class GameScreen extends Component {
	constructor(props) {
      super(props)
      this.state = {
        signedIn: false,
        userId: "",
        name: "",
        photoUrl: ""
      }
    }

    componentDidMount() {
        this.getItem();
    }
    
    getItem = async () => {
            const userName = await AsyncStorage.getItem('userName')
            const userId = await AsyncStorage.getItem('userId')
            const signedIn = await AsyncStorage.getItem('signedIn')
            const photoUrl = await AsyncStorage.getItem('photoUrl')

            this.setState({
                signedIn: signedIn,
                name: userName,
                userId: userId,
                photoUrl: photoUrl
            })
    }

    addScore(userId, Name, photoUrl, Score) {
        if (userId !== "") {
            firebase.database().ref('/games/' + userId).set({
                userId,
                photoUrl,
                Name,
                Score
            }).then((data) => {
                console.log('data ', data);
            }).catch((error) => {
                console.log('error ', error)
            })
        } else {
            this.setState({fieldError: "Missing Technician Name"})
        }
    }

    render() {
        
        return (
            <View style={styles.container}>

                <Image
                  source={require('../assets/slap.png')}
                  style={styles.welcomeImage}
                />
                      
                <Text style={styles.getStartedText}>Study "Hard"!</Text>
                <Button 
                    onPress={() => Alert.alert(
                        "Give up studying?","You might get expelled from school",[
                        {text: 'Keep study', onPress: () => console.log('Canceled')},
                        {text: 'Go home', onPress: () => this.props.navigation.navigate('HomeScreen')},
                        ]
                    )}
                    buttonStyle={styles.styleButton}
                    title='Give up'
                />

                <Button
                      buttonStyle={styles.styleButton}
                      title="Study"
                      onPress={() => {Vibration.vibrate(0, 50)}}
                />

                <Button 
                    onPress={() => {this.addScore(this.state.userId, this.state.name, this.state.photoUrl, 2000)}}
                    buttonStyle={styles.styleButton}
                    title='Write in Database'
                />

            </View>
        )
    }



}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    margin: 30,
    padding: 30,
    alignItems: 'center',
  },
  welcomeImage: {
    margin: 10,
    width: 200,
    height: 180,
    resizeMode: 'contain'
  },
  getStartedText: {
    margin: 20,
    fontSize: 24,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  styleButton: {
    margin: 20,
    backgroundColor: '#169ff5',
    width: 180
  },
  image: {
    margin: 20,
    width: 80,
    height: 80,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 40
  }
});