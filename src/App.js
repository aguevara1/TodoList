
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class TodoList extends Component {
  // anything you need to store goes in this state
  //because react components are listening to changes in the state

  state={
    list:[],
    inputValue:'',
  //  check: false,
  //  strike: 'none'
  };

   //this.state.strike = this.markItemCompleted.bind(this);

   handleItemCompleted(e){
/*
     this.setState({check: !this.state.check})
     if (this.state.strike === 'none'){
       this.setState({strike: 'line-through'})
     } else {
       this.setState({strike: 'none'})
     }
     */

   }


  handleChange=(e)=>{
    this.setState({inputValue:e.target.value});
  }

 handleSubmit=(e) =>{
   e.preventDefault();
   console.log(this.state.inputValue)
   const newList=this.state.list.slice();
  // const newInputValue="";
   newList.push(this.state.inputValue);

   this.setState({list:newList, inputValue:''});

 }
  // <button onClick={this.handleSubmit}>Submit</button>
  //{this.renderList()}
  handleDeleteItem(item) {
    this.setState({
   list: this.state.list.filter(el => el !== item)
})

  }

  render() {
    return (
      <div className="App">
        <h2>Teacher To Do List </h2>
           <div><img src={logo} className="App-logo" alt="logo" /></div>

         <form onSubmit={(e)=> this.handleSubmit(e)}  className="row" >

              <input value={this.state.inputValue} type="text" onChange={(e)=>this.handleChange(e)} />

                <button onClick={this.handleSubmit} className="bigButton"
                disabled={!this.state.inputValue}>{"Add Item #" + (this.state.list.length +1)}</button>

        </form>
        {this.state.list.map((item, index)=>
            <form className="listItems">
                <label>
                 <input name={item} id={index} type="checkbox"
                    onChange={(e) => this.handleItemCompleted(e)} />
                   <span> {item} </span>
                </label>
                  <button name={item} id={index} type="button" className="btn-danger"
                  onClick={(e)=>this.handleDeleteItem(item)}>X</button>

            </form>
              )

            }


      </div>
    );
  }
}


export default TodoList;
