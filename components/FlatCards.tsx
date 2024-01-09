import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlatCards() {
  return (
    <View>
      <Text style={styles.headingText}>FlatCards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText:{
        fontSize:24
    },
})