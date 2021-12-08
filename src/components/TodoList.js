import React, { useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const TodoList = () => {
//sample api format
const data=[ {
  id:uuidv4(),
  task:"Make launch",
  isComplete:false
},{
  id:uuidv4(),
  task:"Go gym",
  isComplete:true
}]

const [value,setValue]=useState("")
const [todoList,setTodoList]=useState([])

//for initial fetch data
useEffect(() => {
  setTodoList(data)
},[])


 //To strikeout completed task
const checkCompleted=(taskId)=>{
   const newList=[...todoList]
  function check(item){
    if(item.id === taskId){
      item.isComplete=!item.isComplete
     }
  }
  newList.filter(check)
   setTodoList(newList)
  }
  //To delete Task
const deleteTask=(index)=>{
    const newTask=[...todoList]
    newTask.splice(index,1)
    setTodoList(newTask)
  }
//To store Input
const handleChange=(event)=>{
    setValue(event.target.value)
  }

//submit function
const handleSubmit=(event)=>{
    event.preventDefault();
   if(value!==""){
     const newValue={
       id:uuidv4(),
       task:value
     };
     const newList=[...todoList,newValue]
     setTodoList(newList)
     setValue("")
  }}

  return (
    <div className="container"> 
      <div className="add-list">  
      <form onSubmit={handleSubmit}> 
      <input type="text" placeholder="Add task..." value={value} onChange={handleChange} />
      <button type="submit"><span className="material-icons" >╇</span></button>
      </form>
       </div>
       {todoList.map((task,index)=>{  //map list value
        return(
        <div className="show-list" key={task.id}>
        {task.isComplete?
         <input type="checkbox" className="check" onClick={()=>checkCompleted(task.id)} checked/>:
         <input type="checkbox" className="check" onClick={()=>checkCompleted(task.id)} />
        }
          <span  className={task.isComplete ?"show completed" :"show"}  >
            {task.task}
          </span>
          <span className="material-icons" onClick={()=>deleteTask(index)}>❌</span>
        </div>
       )})}
      </div>
  )
}

export default TodoList;