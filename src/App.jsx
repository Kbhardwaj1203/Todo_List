import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from 'uuid';


function App() {
   const[todo, setTodo] = useState("");
   const[todos, setTodos] = useState([]);
   const[showFinished , setshowFinished]=useState(true);
   useEffect(()=>
   {
          let todostring = localStorage.getItem("todos")
          if(todostring)
        {
           let todos = JSON.parse(localStorage.getItem("todos"))
         setTodos(todos)
        }
   }, [])
          //  Edit the Todo........
  const handleEdit= (e , id)=>
  {
    let t =todos.filter(i=> i.id===id)
     setTodo(t[0].todo)
     let newTodos = todos.filter(item =>
      {
            return item.id!==id
      });
    setTodos(newTodos);
    saveToLS();
  }
  //  Delete the Todo ........
  const handleDelete= (e , id)=>
  { 
      let newTodos = todos.filter(item =>
        {
              return item.id!==id
        });
      setTodos(newTodos);
      saveToLS();
  }
        // Add a new todo....... 
  const handleAdd= ()=>
  { 
  
  setTodos([...todos, { id: uuidv4() ,todo , isCompleted: false}]);
  setTodo("");
  saveToLS();
  }                                                                       
                                                  
  const handleChange= (e)=>
  {
       setTodo(e.target.value)
  }
    // Handle Toggling.........
  const handleCheckbox= (e)=>
  {
      let id = e.target.name
      let index = todos.findIndex(item =>
        {
          return item.id === id;
        })
        let newTodos =[...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted
        setTodos(newTodos);
        saveToLS();
  }
  //  Saving to Localstorage.....
  const saveToLS = () => {
     localStorage.setItem("todos" , JSON.stringify(todos))
  } 
    // Show and Hide showFinished.............
  const toggleFinished = (e) => {
      setshowFinished(!showFinished)
  }
  
  
  return (
    <>
     <Navbar/>
     <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-lime-300 min-h-[80vh] md:w-[35%]">
           <div className="addtodo my-5 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-center text-violet-700">Add A Todo</h1>
            <input onChange={handleChange} value={todo} type="text" className="w-full rounded-full bg-rose-100 px-5 py-1" />
            <button onClick={handleAdd} disabled={todo.length<=2} className="bg-rose-400 text-white hover:bg-indigo-950 p-3 py-1 rounded-lg font-bold disabled:bg-violet-700 text-xl">Add</button>
            </div>
            <input onChange={toggleFinished} type="checkbox" checked={showFinished}/>Show Finished
            <h2 className="text-lg font-bold">Your Todos</h2>
             <div className="todos">
              {todos.length===0 && <div className=" font-bold text-indigo-950 my-2 bg-rose-400 rounded-lg p-2 w-1/3 text-center">No Todos To Display </div>}
              {todos.map(item =>
                {
                return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between w-1/2 my-3">
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted} id="" />
             <div className={item.isCompleted ? "line-through": ""}>{item.todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e , item.id)}} className="bg-rose-400 text-white hover:bg-indigo-950 p-3 py-1 rounded-lg mx-1 font-bold">Edit</button>
                <button onClick={(e)=>{handleDelete(e , item.id)}} className="bg-rose-400 text-white hover:bg-indigo-950 p-3 py-1 rounded-lg mx-1 font-bold">Delete</button>
              </div>
              </div>
              })}
             </div>
     </div> 
    </>
  )
}

export default App
