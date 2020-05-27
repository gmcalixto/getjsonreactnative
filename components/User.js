import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, Platform} from 'react-native';
import PropTypes from 'prop-types';

export default class User extends React.Component {

  //construtor para uso do props
  constructor(props){
    super(props);
  }

  //renderização do componente
  render(){
    return(
      <View style={styles.loader}>
        <Image
            style={styles.tinyLogo}
            source={this.props.image_source}
          />
          <Text style={styles.info}>Name: {this.props.first_name} {this.props.last_name}</Text>
          <Text style={styles.info}>E-mail: {this.props.email}</Text>
      </View>

    );


  }
}

const styles = StyleSheet.create({
   loader:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
   tinyLogo: {
    width: 100,
    height: 100,
    marginBottom: 30
  },
  info: {
    margin: 5,
    fontFamily: Platform.OS==='ios'?'AvenirNext-Regular':'Roboto'
  }
});

User.propTypes = {image_source: PropTypes.string.isRequired,
                           first_name: PropTypes.string.isRequired,
                           last_name: PropTypes.string.isRequired,
                           email: PropTypes.string.isRequired};