import React from 'react';
import { Image, StyleSheet} from 'react-native';
import { createStackNavigator, createNavigator } from 'react-navigation';
                       
import Main from "./pages/Main";


export default createStackNavigator({
  Main,
}, {
  navigationOptions: {
    
    headerBackground: (
    
      <Image 
        style={StyleSheet.absoluteFill}
        source={{ uri: 'https://i.ibb.co/zJMLkVg/magic.jpg' }}
      />
    ),
    headerLayoutPreset: 'center',
    headerTitleStyle: { color: 'black' },
  }
});






