
import React, { Component } from 'react';
import clipboard from './clipboard.svg';
import './App.css';

// Load Roboto typeface
import 'typeface-roboto';

/* anything you need to store goes in this state
because react components are listening to changes in the state */
class TodoList extends Component {
  state={
    list:[],
    inputValue:'',
  };

/*function sets the state with new json data that was fetched.
 .then is a promise that the data will be delivered at some time*/
componentDidMount=() => {
  fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response=> response.json())
    .then(data => this.setState({list:data}))
}

/*function makes shallow copy of list array in state. It toggles the
checked variable in state from True to False on every click     */
handleCheckItem=(value, index)=> {
  const anotherList=[...this.state.list];
  anotherList[index].checked = !anotherList[index].checked;
  this.setState({list:anotherList});
}

/*function takes the input value from user and assigns it to variable
in the state after setState executes  */
handleChange=(e)=> {
  this.setState({inputValue:e.target.value});
}

/* function makes copy of list array in state and assigns it to newList array.
It pushes title and checked variables with values to newList. It assigns
newList array to list and also clears the input box with ''   */
handleSubmit=(e)=> {
  e.preventDefault();
  const newList=this.state.list.slice();
  newList.push({title:this.state.inputValue, checked: false});
  this.setState({list:newList, inputValue:''});
}

/* function deletes the item from list by making copy of list array
in state assigning to newList array. Deletes item with splice method
and then updates the state after the deletion of item.   */
handleDeleteItem=(item,index) => {
  let newList=this.state.list.slice()
  newList.splice(index,1 );
  this.setState({list:newList});
}

/* function returns the html tags with the data to the page. Map function loops
through list array and checks for the events onChange and onClick to call their respective
functions handleCheckItem and handleDeleteItem */
renderList=()=> {

  /* variables used for styling the list items after handleCheckItem toggles the
   checked variable from True to False*/
  const checkedStyle={textDecoration:'line-through', color: 'red'};
  const uncheckedStyle={textDecoration:'none', color:'black'};

  return this.state.list.map((item, index)=>{
    return <form className="listItems">
             <label>
               <input type="checkbox" checked={item.checked} onChange={(e) => this.handleCheckItem(item,index)} />
               <span style={item.checked? checkedStyle : uncheckedStyle}> {item.title} </span>
             </label>
             <button type="button" className="btn-danger"
             onClick={(e)=>this.handleDeleteItem(item,index)}>X</button>
           </form>
  })
}

/* function renders the elements to the page. Also calls event functions handleSubmit and
handleChange when their event happens. Lastly, it calls the function renderList() which
renders the items from the list array on to the page */
render=() => {
  return (
    <div className="App">
      <h2>Teacher To Do List </h2>
      <div><img src={clipboard} className="clipboard" alt="clipboard" /></div>
      <form onSubmit={(e)=> this.handleSubmit(e)}  className="row" >
        <input value={this.state.inputValue} type="text" onChange={(e)=>this.handleChange(e)} />
        <button onClick={this.handleSubmit} className="bigButton"
        disabled={!this.state.inputValue}>{"Add Item #" + (this.state.list.length +1)}</button>
      </form>
      {this.renderList()}
    </div>
  );
}

}

export default TodoList;
