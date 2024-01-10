import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import FlatCards from './components/FlatCards'

const App = () => {
  return (
    <ScrollView>
    <View>
      <FlatCards/>
    </View>
    </ScrollView>
  )
}

export default App