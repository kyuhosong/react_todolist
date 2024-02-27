import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {

  const [todoList,setTodoList] = useState([])
  const [sequance,setSequance] = useState([null])
  const refTodoItem = useRef()

  useEffect(()=>{
    let sequance = window.localStorage.getItem("sequance")
    if(sequance === null){
      window.localStorage.setItem("sequance","0")
      sequance = 0
    }
    const handleSetInit = () => {
      window.localStorage.setItem("todolist","[]")
      return "[]"
    }
    let todo = JSON.parse(window.localStorage.getItem("todolist")??handleSetInit());
    setTodoList(todo)
    setSequance(Number(sequance))
  },[])  
  const handleTodoAdd = (item) => {
    if(item ===''){
      alert("할 일을 입력하세요1.")
      return;
    }
    if(item === null){
      alert("할 일을 입력하세요2.")
      return
    }
    let todo = [...todoList]

    todo.push({tf:false,id:sequance+1,text:item})
    
    window.localStorage.setItem("todoList",JSON.stringify(todo));
    window.localStorage.setItem("sequance",String(sequance+1));

    setTodoList(todo);
    setSequance(sequance+1)
    refTodoItem.current.value = ''

  }

  const handleTodoAdd2 = (item) => {
    if(item ===''){
      alert("할 일을 입력하세요1.")
      return;
    }
    if(item === null){
      alert("할 일을 입력하세요2.")
      return
    }
    let todo = [...todoList]

    todo.push({tf:false,id:sequance+1,text:item})
    
    window.localStorage.setItem("todoList",JSON.stringify(todo));
    window.localStorage.setItem("sequance",String(sequance+1));

    setTodoList(todo);
    setSequance(sequance+1)
    refTodoItem.current.value = ''

  }

  const handleTodoCheck = (tf,idx) => {
    let todo = [...todoList]
    todo[idx].tf = !tf

    window.localStorage.setItem("todoList",JSON.stringify(todo));
    setTodoList(todo)

  }

  const handleTodoDelete = (id) => {
    if(!window.confirm("삭제?")) return;
    
    let todo = [...todoList]

    todo = todo.filter((val)=>val.id !== id);

    window.localStorage.setItem("todolist",JSON.stringify(todo));
    setTodoList(todo)
  }

  const handleOnKeyUp = e => {
    if(e.key === 'Enter'){
      handleTodoAdd2(refTodoItem.current.value);
    }
  }

  return (
   <div>
    <div className='mainLayout'>
      <div className='todoLayout'>
        <div className='todoTop'>
          <div className='todoTitle'>
            To Do List
          </div>
          <div className='todoAdd'>
            <input type='text' placeholder='할 일을 입력하세요'ref={refTodoItem} onKeyUp={handleOnKeyUp}></input>
            <div onClick={()=>handleTodoAdd(refTodoItem.current.value)}>
              +
            </div>
          </div>
        </div>
        <div className='listLayout'>
          {todoList.map((val,idx)=>
            <div className='todoItem' key={idx}>
              <div className='todoCheckBox' onClick={() => handleTodoCheck(val.tf,idx)}>
                <div className='checkIcon'>
                  {val.tf?'✅':''}
                </div>
                <span>{val.text}</span>
              </div>
              <div className='deleteBox' onClick={()=>handleTodoDelete(val.id)}>
                x
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
   </div>
  );
}

export default App;
