import React, { Component } from 'react'
import Chronometer from "./components/Chronometer"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1c1c1c;
    color: purple;
    text-align: center;
  }
`

class App extends Component {
  render() {
    return(
      <>
        <GlobalStyle />
          <h1>Chronometer</h1>
        <Chronometer />
      </>
    )
  }
}

export default App;
