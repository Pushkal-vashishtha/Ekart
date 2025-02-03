import { View, Text } from 'react-native'
import React from 'react'
import Navigation from '@navigation/Navigation'
import { Provider } from 'react-redux'
import { store } from '@store/store'

const App = () => {
  return (
    <Provider store={store}>
    <Navigation/>
    </Provider>
  )
}

export default App