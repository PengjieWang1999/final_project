import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import firebase from 'firebase';

import AppContainer from './navigation/Navigator.js';

const config = {
    apiKey: "AIzaSyCQde61BIVXPE7S_UswRcy_VIGFD2vrKpE",
    authDomain: "acit3650-final-project-2d948.firebaseapp.com",
    databaseURL: "https://acit3650-final-project-2d948.firebaseio.com",
    projectId: "acit3650-final-project-2d948",
    storageBucket: "acit3650-final-project-2d948.appspot.com",
    messagingSenderId: "330751410618",
    appId: "1:330751410618:web:5be6d7bc2ff1d2b841dd83",
    measurementId: "G-C2ER74XYVL"
};

firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            name: "",
            photoUrl: ""
        }
    }

    componentDidMount() {
        this.getItem();
    }
    
    getItem = async () => {
            const userName = await AsyncStorage.getItem('userName')
            const signedIn = await AsyncStorage.getItem('signedIn')
            const photoUrl = await AsyncStorage.getItem('photoUrl')

            this.setState({
                signedIn: signedIn,
                name: userName,
                photoUrl: photoUrl
            })
    }

    render() {
      return (
          <View style={styles.container}>

              <AppContainer />

          </View>
      );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
