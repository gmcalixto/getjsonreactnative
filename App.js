import React from "react";

import {
StyleSheet,
View,
Platform,
TextInput,
Keyboard,
Text,
TouchableWithoutFeedback,
TouchableOpacity,
ToastAndroid,
Alert,
ActivityIndicator
} from "react-native";

import User from './components/User';

//verifica se o dicionario está vazio
function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

//criar alerta para iOS
function createAlert() {
    Alert.alert(
      "Tarefa 1",
      "Informe um ID válido",
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
}

export default class ExemploGetJSON extends React.Component {
  


  constructor(props) {
      super(props);
  }

  state = {
        first_name: '',
        last_name: '',
        image_source: '',
        email: '',
        id: 1,
        animating: false
      };

  componentDidMount(){
    this.fetchJSON();

  }

  fetchJSON(){
    fetch("https://reqres.in/api/users/" + this.state.id)
    .then(response => response.json())
    .then((responseJson)=> {

      console.log(responseJson)

      if(isEmpty(responseJson)){
          if(Platform.OS === 'ios'){
            createAlert();
          }
          else{
            ToastAndroid.show("Infome um ID válido", ToastAndroid.SHORT);
          }
      }
      else{

        var first_name = responseJson['data']['first_name']
        var last_name = responseJson['data']['last_name']
        var image_source = { uri: responseJson['data']['avatar'] };
        var email = responseJson['data']['email']

        this.setState({first_name: first_name,
                    last_name: last_name,
                    image_source: image_source,
                    email: email})
      }

      this.setState({animating: false});

    
    })
    .catch(error=>console.log(error))
  }



render(){

  return( 
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.loader}>
        
        <User 
          first_name={this.state.first_name}
          last_name={this.state.last_name}
          image_source={this.state.image_source}
          email={this.state.email}/>

        <TextInput 
          autoCorrect = {false}
          keyboardType = 'number-pad'
          placeholder = "ID do usuário" 
          placeholderTextColor = "white" 
          style = {styles.textInput}
          clearButtonMode = "always"
          onChangeText={(value) => this.setState({ id: value })}
        />

        <TouchableOpacity
              onPress={
                ()=>{
                  this.setState({animating: true});
                  this.fetchJSON();
                }}>
                    <Text style={styles.button}>Buscar</Text>
        </TouchableOpacity>

        <ActivityIndicator 
          animating={this.state.animating}
          size="small" 
          color="#00ff00"/>


      </View>
    </TouchableWithoutFeedback>
)
}

}
const styles = StyleSheet.create({
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
  textInput: {
	    backgroundColor:'#666',
	    color:'white',
	    height: 40,
	    width: 200,
	    marginTop: 20,
	    marginHorizontal:20,
	    paddingHorizontal:10,
	    alignSelf: 'center'
},
button:{
    borderColor:'black',
    borderWidth: 1,
    fontSize: 20,
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto',
    marginTop: 20,
    backgroundColor: 'grey',
    textAlign: 'center'
  },
});
