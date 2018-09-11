
import React, { Component } from 'react';
import logo from './logo.svg';
import clipboard from './clipboard.svg';
import './App.css';
// Load Roboto typeface
//require('typeface-roboto');
import 'typeface-roboto';

class TodoList extends Component {
  // anything you need to store goes in this state
  //because react components are listening to changes in the state

  state={
    list:[],
    inputValue:'',

  };

  componentDidMount(){
      fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response=> response.json())
      .then(data => this.setState({list:data}))
  }




   handleCheckItem(value, index){
     console.log(value);
    // const anotherList=this.state.list.splice();
       const anotherList=[...this.state.list];
     anotherList[index].checked = !anotherList[index].checked;
     //this.state.list.forEach(item => {
      //   console.log(item.id);
    // if(item.id===value.id){
       this.setState({list:anotherList});
      // }
    // });

   }



  handleChange=(e)=>{
    this.setState({inputValue:e.target.value});
  }

 handleSubmit=(e) =>{
   e.preventDefault();
   console.log(this.state.inputValue);
   const newList=this.state.list.slice();

   //newList.push({list:this.state.inputValue, checked: false});
   newList.push({title:this.state.inputValue, checked: false});

   this.setState({list:newList, inputValue:''});

 }


  handleDeleteItem(item,index) {
    let newList=this.state.list.slice()
          newList.splice(index,1 );
          this.setState({list:newList});
  }

  renderList(){
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


  render() {
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
