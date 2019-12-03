import React, { Component } from 'react';
import {Image, View, Text, StyleSheet, AsyncStorage, Vibration, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import * as Google from 'expo-google-app-auth'

export default class HomeScreen extends Component {
	constructor(props) {
      super(props)
      this.state = {
        signedIn: false,
        name: "",
        userId: "",
        photoUrl: ""
      }
    }

    componentDidMount() {
        this.getItem();
    }
    
    getItem = async () => {
            const userName = await AsyncStorage.getItem('userName')
            const signedIn = await AsyncStorage.getItem('signedIn')
            const userId = await AsyncStorage.getItem('userId')
            const photoUrl = await AsyncStorage.getItem('photoUrl')

            this.setState({
                signedIn: signedIn,
                name: userName,
                userId: userId,
                photoUrl: photoUrl
            })
    }

    signOut = async() => {
    	Alert.alert('Signed out!');
        await AsyncStorage.removeItem('userId')
        await AsyncStorage.removeItem('userName')
        await AsyncStorage.removeItem('photoUrl')
        await AsyncStorage.setItem('signedIn', 'false')

        this.setState({
                    signedIn: "false",
                    name: "",
                    userId: "",
                    photoUrl: ""
        })

    }

    signIn = async () => {
        try {
            const result = await Google.logInAsync({
                iosClientId: "330751410618-vvv525kc1q8n8gken44a98ev385aqm6q.apps.googleusercontent.com",
                androidClientId: "330751410618-tecg453lp9johijaomt3g99el7tc3p74.apps.googleusercontent.com",
                scopes: ["profile", "email"]
            })

            if (result.type === "success") {
                await AsyncStorage.setItem('userId', result.user.id)
                await AsyncStorage.setItem('userName', result.user.name)
                await AsyncStorage.setItem('photoUrl', result.user.photoUrl)
                await AsyncStorage.setItem('signedIn', 'true')

                const userId = await AsyncStorage.getItem('userId')
                const userName = await AsyncStorage.getItem('userName')
                const signedIn = await AsyncStorage.getItem('signedIn')
                const photoUrl = await AsyncStorage.getItem('photoUrl')

                console.log(userId);
                console.log(userName);
                console.log(signedIn);
                console.log(photoUrl);
                console.log(result.user);
                this.setState({
                    signedIn: "true",
                    userId: result.user.id,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl
                })
            } else {
                console.log("cancelled");
            }
        } catch (e) {
            console.log("error", e);
        }
    }

    

    render() {
        
        return (
            <View style={styles.container}>
            	<View style={styles.topContainer}>
            		<View style={styles.nestedContainer}>
		                
		                { this.state.signedIn === "true" 
		                	?	<Image
				                    source={{url: this.state.photoUrl}}
				                    style={styles.image}
				                /> 
			                : 	null
			            }

			            { this.state.signedIn === "true" 
			            	? 	<Text 
			            			style={styles.text}>
			            			Study!!! {this.state.name}!
			            		</Text> 
			            	: 	<Text 
			            			style={styles.text2}>
			            			Sign in to Become One of Best Students!
			            		</Text>
			            }
			        </View>
	            </View>

	            <View style={styles.buttonContainer}>
	                <Image
	                    source={require('../assets/logo.jpeg')}
	                    style={styles.welcomeImage}
	                />

	                <Text style={styles.getStartedText}>STUDY "HARD"!</Text>

	                <Button 
	                    onPress={() => {this.props.navigation.navigate('GameScreen')}}
	                    buttonStyle={styles.styleButton}
	                    title='Study'
	                />

	                { this.state.signedIn === "true" 
	                	?   <Button 
				                onPress={() => Alert.alert(
				                    "Sign out?", "You will lose your current progress",
					                    [
						                    {text: 'Cancel', onPress: () => console.log('Canceled')},
						                    {text: 'Exit', onPress: () => this.signOut()},
					                    ]
				                )}
				                buttonStyle={styles.styleButton}
				                title='Sign out'
				            />
	                    : 	<Button 
		                        onPress={() => this.signIn()}
		                        buttonStyle={styles.styleButton}
		                        title='Sign in with Google'
		                    /> 
	                }	   

	                <Button
	                    buttonStyle={styles.styleButton}
	                    title="Best Students"
	                    onPress={() => {this.props.navigation.navigate('LeaderBoardScreen')}}
	                    //onPress={() => {Vibration.vibrate()}}
	                />
	            </View>

            </View>
        )
    }



}


const styles = StyleSheet.create({
	container: {
        height: '100%',
        padding: 25,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
	topContainer: {
        marginTop: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%',
    },
    nestedContainer: {
    	flexDirection: 'row',
    	justifyContent: 'center',
    	alignItems: 'center',
    	height: '20%',
    },
    buttonContainer: {
    	margin: 5,
    	padding: 5,
    	justifyContent: 'center',
    	alignItems: 'center',
    	height: '65%',
    },
	welcomeImage: {
	    margin: 10,
	    width: 200,
	    height: 180,
	    resizeMode: 'contain'
	},
	getStartedText: {
	    margin: 10,
	    fontSize: 28,
	    lineHeight: 28,
	    textAlign: 'center',
	},
	styleButton: {
	    margin: 10,
	    backgroundColor: '#169ff5',
	    width: 180
	},
	text: {
		fontWeight: 'bold',
		fontSize: 20
	},
	text2: {
		fontWeight: 'bold',
		fontSize: 18
	},
	image: {
	    margin: 10,
	    width: 80,
	    height: 80,
	    borderColor: "gray",
	    borderWidth: 1.5,
	    borderRadius: 40
	}
});