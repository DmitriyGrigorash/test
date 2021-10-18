import React, { Component } from 'react';

import {QuestionsBox} from "./components/questions-box";

import './App.css';

class App extends Component {
  render() {
    return (
      <main className="App">
        <QuestionsBox />
      </main>
    );
  }
}

export default App;
