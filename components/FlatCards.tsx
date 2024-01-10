import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCards() {
  return (
    <View>
      <Text style={styles.headingText}>FlatCards</Text>
        <View style={styles.container}>
          <View style={[styles.card,styles.card1]}>
            <Text>Red</Text>
          </View>
          <View style={[styles.card,styles.card2]}>
            <Text>Blue</Text>
          </View><View style={[styles.card,styles.card3]}>
            <Text>Green</Text>
          </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText:{
        fontSize:24,
        fontWeight:'bold',
        paddingHorizontal:8
    },
    container:{},
    card:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      width:100,
      height:100,
      borderRadius:4,
      margin:8
    },
    card1:{
      backgroundColor:'#EF5354'
    },card2:{
      backgroundColor:'#50DBB4'
    },card3:{
      backgroundColor:'#5DA3FA'
    },
})