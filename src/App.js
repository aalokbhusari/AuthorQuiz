import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Button = (props) => {
  return(
    <div>
      <button className='btn btn-primary' onClick={()=>props.createTask(props.taskName)}>
        Add Task
      </button>
    </div>
  );
};

const TaskList = (props) => {
  //props.createdTasks.length
  return(
    <div>
      <table className="table table-hover">
    <thead>
      <tr>
        <th>Sr. No.</th>
        <th>To Do</th>
        <th>Option</th>
      </tr>
    </thead>
    <tbody>
        {props.createdTasks.map((task,i) =>
        <tr key={i}>
          <td className="col-sm-2">{i+1}</td>
          <td className="col-sm-8">{props.createdTasks[i]}</td>
          <td className="col-sm-2"><button class="btn btn-danger" 
                                           onClick={() => props.removeTask(task)}>x
                                   </button></td>
        </tr>
        )}
    </tbody>
  </table>
      </div>
  );
};

const NoTask = (props) => {
  return(
  <div class="alert alert-success">
  <strong>Congratulations!!! </strong> You have no tasks in your backlog.
  </div>
  );
};


const TaskInput = (props) => {
  return(
    <div>
    <input type="text" 
           value={props.task} 
           onChange = {(event) => props.taskChange(event.target.value)} 
           className="form-control"></input>
    </div>
  );
};

class MainTaskList extends Component{
  static initialState = () => ({
    createdTasks: ["Task 1","Task 2","Task 3"],
    doneStatus: null,
    taskName: "",
  });
  
  state = MainTaskList.initialState();
 

  createTask = (enteredTask) => {
    this.setState(prevState => ({
      createdTasks: prevState.createdTasks.concat(enteredTask),
      taskName: ""
    }), this.updateDoneStatus);
  };

  removeTask = (task) =>{
    this.setState(prevState => ({
      createdTasks: prevState.createdTasks.filter(u => u !== task)
    }), this.updateDoneStatus);
  };

  taskChange = (taskValue) => {
    this.setState(prevState => ({
      taskName: taskValue
    }));
  };

  updateDoneStatus = () => {
    this.setState(prevState => {
      if(prevState.createdTasks.length === 0){
        return {doneStatus: 'Done. Nice!'};
      }
      else{
        return {doneStatus: null};
      }
    });
  };

  render() {
    return(
      <div className="container">
        <div className="col-sm-8">
          {this.state.doneStatus ? 
          <NoTask />
          :<TaskList createdTasks={this.state.createdTasks} removeTask={this.removeTask}/>
          }
        </div>
        
        <div className="col-sm-4">
          <TaskInput task={this.state.taskName} taskChange={this.taskChange}/><br/>
          <Button createdTasks={this.state.createdTasks} createTask={this.createTask} taskName={this.state.taskName}/>
        </div>
      </div>
    );
  }
};

class App extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron">
          <div className="container">
            <h3>Task Management</h3>
            <h6>Manage your todo list</h6>
          </div>
        </div>
        <MainTaskList />
        <div className="footer">
          <div className="container">
            <p className="text-muted credit"> Manage you task list in easiest way</p>
          </div>
        </div>
      </div>
    );
  }
};



export default App;
