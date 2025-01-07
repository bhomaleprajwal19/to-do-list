import { useState,useEffect } from "react";
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
  let todoString=localStorage.getItem("todos")
  if(todoString){
  let todos =JSON.parse(localStorage.getItem("todos"))
  setTodos(todos)}

  }, [])
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  


  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id==id)
    setTodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!=id
    });
    setTodos(newTodos)
    
  };

  const handleDelete = (e,id) => {
      let newTodos=todos.filter(item=>{
      return item.id!=id
    });
    setTodos(newTodos)
  };

  const handleAdd = () => {
    setTodos([...todos, { todo, id:uuidv4(),isCompleted:false }]);
    setTodo("");
    
  };

  const handleChange = (e) => {
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    
  };
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  

  return (
    <>
      <Navbar />
      <div className="container w-full mx-auto m-5 bg-violet-100 rounded-xl p-5 min-h-[80vh] ">
       <h1 className="font-bold text-center text-xl">myTask</h1>
        <div className="addTodo">
          <h2 className="text-lg font-bold mt-5 ">Add a todo</h2>
          <div className="flex">
          <input className="w-full rounded-xl max-h-12 mt-5" type="text" value={todo} onChange={(e) => setTodo(e.target.value)}/>
          <button onClick={handleAdd}  disabled={todo.length<=1} className="bg-violet-800 m-6 text-white rounded-md hover:bg-violet-950 hover:font-bold p-3 py-1 disabled:bg-violet-500">Save</button>
          </div>
        </div>
        <div className="finish flex">
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
        <label className='m-2' htmlFor="show">Show Finished</label> 
        </div>
        <div className="h-[1px] bg-black opacity-30 w-[90%] mx-auto "></div>
        <h1 className="text-xl font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length===0 && <div className="m-5"> No Todos to display </div> }
          {todos.map((t) => (
           (showFinished || !t.isCompleted) &&  <div key={t.id} className="flex my-3 justify-between ">
              <div className="flex  gap-5">
              <input type="checkbox" name={t.id} checked={t.isCompleted} onChange={handleChange}/>
              <div className="my-2 w-full max-w-full">
              <div className= {t.isCompleted?"line-through":""} >
                <p className="flex flex-wrap">{t.todo}</p></div>
              </div>
              </div>
              <div className="btn flex">
                <button onClick={(e)=>{ handleEdit(e,t.id)}} className="bg-violet-800 m-1 text-white rounded-md hover:bg-violet-950 hover:font-bold p-3 py-1 "><FaEdit />
                </button>
                <button onClick={(e)=>{ handleDelete(e,t.id)}} className="bg-violet-800 m-1 text-white rounded-md hover:bg-violet-950 hover:font-bold p-3 py-1 "  ><MdDeleteOutline /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;