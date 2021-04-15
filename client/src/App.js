import React from 'react'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Title from './components/layout/Title'

import { Layout } from 'antd'
import AddPerson from './components/forms/AddPerson'
import AddBoat from './components/forms/AddBoat'
import Boats from './components/lists/Boats'
import './App.css'
import People from './components/lists/People'

const { Content } = Layout

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <div className='container'>
      <Content className='App'>
        <Title title={"People & Boats"} />
        <AddPerson />
        <People />
        <Title title={"BOATS"} />
        <AddBoat />
        <Boats />
      </Content>
    </div>
  </ApolloProvider>
)

export default App
