import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Header from './components/Header/Header'
import ListOfProjects from './components/ListOfProjects/ListOfProjects'
import Login from './components/Login/Login'

function App () {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Route exact path='/' component={ListOfProjects}/>
        <Route path='/login' component={Login}/>
      </div>
    </BrowserRouter>
  )
}

export default App
