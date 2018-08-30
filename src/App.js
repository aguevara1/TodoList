
/*
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
*/


import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class TodoList extends Component {
  // anything you need to store goes in this state
  //because react components are listening to changes in the state
  state={
    list:[],
    inputValue:''
  };


  handleChange=(e)=>{
    this.setState({inputValue:e.target.value});
  }


 handleClear=(e)=>{
   this.setState({inputValue:''});
 }


 handleSubmit=(e) =>{
   e.preventDefault();
   console.log(this.state.inputValue)
   const newList=this.state.list.slice();
  // const newInputValue="";
   newList.push(this.state.inputValue);

   this.setState({list:newList, inputValue:''});

 }

 renderList=()=>{
    return this.state.list.map((item, idx) => {
        return <li>{idx}-{item}</li>;
    });
 }


  render() {
    return (
      <div text-align="center">
        <h2>Teacher Todo List </h2>
         <form onSubmit={(e)=> this.handleSubmit(e)}>

              <input value={this.state.inputValue} type="text" onChange={(e)=>this.handleChange(e)} />

              <button type="submit" value="submit">Enter</button>
        </form>
      </div>
    );
  }
}


export default TodoList;
