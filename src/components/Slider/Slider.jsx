import { FaTasks } from "react-icons/fa";
import style from "./style.module.css";
import { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useFormik } from "formik";
import PropTypes from "prop-types";

const { headerSlider, formContainer, buttonContainer, buttonForm, textAreaa } =
  style;

const Slider = ({ setTasks, tasks , name , desc , updateForm , setUpdateForm , data , setData , index}) => {
  const ref = useRef()

  const formik = useFormik({
    initialValues: {
      name: "",
      desc: ""
    },
    onSubmit: (values) => {
      if(updateForm){
        tasks[index].name = values.name
        tasks[index].desc = values.desc
        console.log(tasks);
        setTasks(tasks)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        setUpdateForm(false)
        setData(false)
        
      }
      else{
        const date = new Date()
        let hours = date.getHours().toString()
        let minutes = date.getMinutes().toString()
        let seconds = date.getSeconds().toString()
        let midday = null
        if(hours <12){
        midday = "AM"
        }
        else{
        midday = "PM"
        }
        let time = `${hours}:${minutes}:${seconds} ${midday}`
        let id = Math.floor(Math.random()*1000) 
        let newTask = { ...values , time , id}  ;
        setTasks([...tasks, newTask]);
        setData(false)
      }
     
     
      formik.resetForm();
    },
  });

  
 
 useEffect(()=>{
  if(tasks.length > 0){
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  if (name && updateForm && desc){
    formik.setValues({name: tasks[index].name, desc: tasks[index].desc})
  }

 },[tasks , name , desc , updateForm])

  return (
    <Container className="mt-3">
      <section className="mx-auto ">
        <header
          className={`${headerSlider} text-white  mx-auto px-3 py-2 fs-5 text-start`}
        >
          <button className="me-3" onClick={() => setData(!data)}>
            <FaTasks className=" mb-1 fs-4 " />
          </button>
          {updateForm ? "Update Task" :"Add Task"}
          
        </header>
        {data && (
          <form
            ref={ref}
            onSubmit={formik.handleSubmit}
            className={`${formContainer} p-3`}
          >
            <div className="mb-3">
              <label htmlFor="name" className="mb-3">
                Your Task
              </label>
              <input
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
                className="form-control"
                id="name"
                placeholder="Enter your Task"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="desc" className="mb-3">
                Task Description
              </label>
              <textarea
                value={formik.values.desc}
                onChange={formik.handleChange}
                name="desc"
                className={`form-control ${textAreaa}`}
                placeholder="Enter Your Description"
                id="desc"
              ></textarea>
            </div>

            <div className={buttonContainer}>
              
              <button type="submit" className={`btn ${buttonForm} py-2`}>
              {updateForm ? "Update" :"Add Task"} 
              </button>
            </div>
          </form>
        )}
      </section>
    </Container>
  );
};

Slider.propTypes = {
  setTasks: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  setUpdateForm: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  data: PropTypes.bool.isRequired,
  updateForm: PropTypes.bool.isRequired,
  index:PropTypes.number,
};

export default Slider;
