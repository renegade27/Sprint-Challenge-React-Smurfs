import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import {Route} from 'react-router-dom';
import {NavLink} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:3333/smurfs').then(res => 
        this.setState({smurfs:res.data})).catch(err => console.log(err))
  }
  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  addSmurf = newSmurf => {
    axios.post('http://localhost:3333/smurfs', newSmurf)
      .then(res => this.setState({smurfs:res.data}))
      .catch(err => console.log(err))
  }
  
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/smurfs-form">Create New</NavLink>
          <NavLink to="/">Home</NavLink>
        </nav>
        <Route exact path="/smurfs-form" render={(props) => <SmurfForm {...props} addSmurf={this.addSmurf}/>}/>
        <Route path="/" render={(props) => <Smurfs {...props} smurfs={this.state.smurfs}/>}/>
      </div>
    );
  }
}

export default App;
