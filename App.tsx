import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import FlatCards from './components/FlatCards'
import ElivatedCards from './components/ElivatedCards'

const App = () => {
  return (
    <SafeAreaView>
    <ScrollView>
      <FlatCards/>
    <ElivatedCards/>
    </ScrollView>
    </SafeAreaView>
  )
}

export default App