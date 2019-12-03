import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, FlatList } from 'react-native';
import firebase from 'firebase';


export default class LeaderBoardScreen extends Component {

  static navigationOptions = {
        title: "Best Students",
        headerTintStyle: {
            fontWeight: 'bold',
        },
  }

	state = {
		games: []
	}

	componentDidMount() {
    
		firebase.database().ref("games/").on('value', (snapshot) => {
			var games = [];
  		snapshot.forEach((child) => {
  	    	games.push({
  		      name: child.val().Name,
            photoUrl: child.val().photoUrl,
  		      id: child.val().userId,
            score: child.val().Score
  		    });
    	});
      games.sort(function(a, b){
        if (a.score > b.score) {
          return -1;
        }
      });
    	this.setState({games})
  		console.log(games);
		});
	}

	renderItem({item}) {
    	return (
    		<View style={styles.row}>

          <Image
            source={{url: item.photoUrl}}
            style={styles.image}
          />

          <Text style={styles.text}>{item.name}</Text>
          
          <Text style={styles.text}>{item.score}</Text>
    		
    		</View>
    	)
    }

    render() {
      return (
        <FlatList style={styles.container}
        data={this.state.games}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        />
      );
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 0.6,
    borderColor: "#e3e1dc"
  },
  text: {
    flex: 1,
    color: 'black',
    fontWeight: 'bold'
  },
  image: {
      margin: 10,
      width: 80,
      height: 80,
      borderColor: "#e3e1dc",
      borderWidth: 1.5,
      borderRadius: 40
  }
});
