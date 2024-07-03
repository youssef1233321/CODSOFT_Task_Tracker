import { Container , Table} from "react-bootstrap"
import style from "./style.module.css"
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const {line} = style

const TaskList = ({tasks ,   setTasks , setDesc , setName , setUpdateForm , setData , setIndex}) => {

  const ref = useRef()
  const [arrCompleted, setArrCompleted] = useState([])

  function completedRow ( id ){
   
    const index =  tasks.map(task=> task.id).indexOf(id)
    
    const collectionLength = ref.current.children[index].children.length-1
    const text = ref.current.children[index].children[collectionLength].textContent
  

    if (text === "incomplete"){
       ref.current.children[index].children[collectionLength].innerHTML = "completed"
       ref.current.children[index].children[4].children[0].textContent = "incomplete"
       ref.current.children[index].children[0].children[0].classList.remove("d-none")
       ref.current.children[index].children[5].children[0].setAttribute("disabled", "true")
      setArrCompleted(prev => [...prev,id])
      
    }
    else{
      ref.current.children[index].children[0].children[0].classList.add("d-none")
      ref.current.children[index].children[collectionLength].innerHTML = "incomplete"
      ref.current.children[index].children[4].children[0].textContent = "complete"
      ref.current.children[index].children[5].children[0].removeAttribute("disabled")
      setArrCompleted(arrCompleted.filter(i => i!== id)) 
      localStorage.removeItem("id")
    }
    
  }

  function deleteRow (i){
    const updatedTasks = tasks.filter((_, index) => index !== i);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks))
    setTasks(updatedTasks)  
  }


  function updateRow (name , desc , index){
    setName(name)
    setDesc(desc)
    setUpdateForm(true)
    setData(true)
    setIndex(index)
    
  }
  useEffect(()=>{
    for(let i = 0; i < tasks.length; i++){
      let id = parseInt(ref.current.children[i]?.children[0]?.children[0]?.id) 
      const collectionLength = ref.current.children[i]?.children?.length-1
      console.log("mra wa7da");
      if (arrCompleted.includes(id)) {
       ref.current.children[i].children[collectionLength].innerHTML = "completed"
       ref.current.children[i].children[4].children[0].textContent = "incomplete"
       ref.current.children[i].children[0].children[0].classList.remove("d-none");
       ref.current.children[i].children[5].children[0].setAttribute("disabled", "true")
        }
      else{
      ref.current.children[i]?.children[0]?.children[0]?.classList.add("d-none");
      ref.current.children[i].children[collectionLength].innerHTML = "incomplete"
      ref.current.children[i].children[4].children[0].textContent = "complete"
      ref.current.children[i].children[5].children[0].removeAttribute("disabled")
       }
     }
     if (arrCompleted.length > 0) {
      localStorage.setItem("id",JSON.stringify(arrCompleted))
     }

     
  },[tasks , arrCompleted ])
 
  useEffect(()=>{
    if(localStorage.getItem("id")){
      const ids = JSON.parse(localStorage.getItem("id"))
      setArrCompleted(ids)
    }
    
    
  },[])

  return (
    <Container>
        <Table striped bordered hover variant="dark" className="mt-3" responsive>
      <thead>
        <tr>
          <th>ID</th>
          <th>Task Name</th>
          <th>Desc.</th>
          <th>Created</th>
          <th>Complete</th>
          <th>Update</th>
          <th>Delete</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody ref={ref}>
       { tasks?.map((e , i)=>  <tr key={i} className="position-relative ">
            <td><span id={e.id} className={`${line} d-none`} ></span><div>{i + 1}</div></td>
            <td>{e.name}</td>
            <td>{e.desc}</td>
            <td>{e.time}</td>
            <td>
              <button className="btn btn-success position-relative z-3" onClick={()=>completedRow(e.id)} >Complete</button>
            </td>
            <td> <button className="btn btn-warning" onClick={()=>updateRow(e.name , e.desc , i)}>Update</button></td>
            <td> <button className="btn btn-danger position-relative z-3" onClick={()=>deleteRow(i)}>Delete</button></td>
            <td>incomplete</td>
          </tr>
          
          )
        }
      </tbody>
    </Table>

    </Container>
  )
}

TaskList.propTypes = {
  
  tasks: PropTypes.array.isRequired,
  setTasks: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  setDesc: PropTypes.func.isRequired,
  setUpdateForm: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setIndex: PropTypes.func.isRequired,
  
};

export default TaskList