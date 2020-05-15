import React from "react";
import {
StyleSheet,
Text,
View
} from "react-native";


export default class ExemploGetJSON extends React.Component {
  


  constructor(props) {
      super(props);
      
      this.state = {
        first_name: '',
        last_name: '',
      };
  }

  componentDidMount(){
    this.fetchJSON();

  }

  fetchJSON(){
    fetch("https://reqres.in/api/users/1")
    .then(response => response.json())
    .then((responseJson)=> {

      var first_name = responseJson['data']['first_name']
      var last_name = responseJson['data']['last_name']

      this.setState({first_name: first_name,
                  last_name: last_name,})

    })
    .catch(error=>console.log(error))
  }



render(){

  return( 
    <View style={styles.loader}> 
      <Text>{this.state.first_name}</Text>
      <Text>{this.state.last_name}</Text>
    </View>
)
}

}
const styles = StyleSheet.create({
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   }
});