import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ElivatedCards() {
  return (
    <View>
      <Text style={styles.headingText}>Elivated Cards</Text>
      <ScrollView style={styles.container}>
          <View>
              <Text style={[styles.card, styles.cardElivated]}>
                  Tap
              </Text>
          </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    headingText:{
        fontSize:24,
        fontWeight:'bold',
        paddingHorizontal:8
    },
    card:{},
    cardElivated:{},
    container:{
        flex:1,
        flexDirection:'row',
        padding:8
      },
})