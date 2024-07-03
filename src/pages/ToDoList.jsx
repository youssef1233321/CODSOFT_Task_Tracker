import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Slider from "../components/Slider/Slider";
import TaskList from "../components/TaskList/TaskList";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);

  const [data, setData] = useState(false);
  //update form
  const [updateForm, setUpdateForm] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [index, setIndex] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("tasks")) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
    }
  }, []);

  return (
    <>
      <Header />
      <Slider
        setTasks={setTasks}
        index={index}
        tasks={tasks}
        name={name}
        desc={desc}
        updateForm={updateForm}
        setUpdateForm={setUpdateForm}
        data={data}
        setData={setData}
      />
      
      <TaskList
        tasks={tasks}
        setIndex={setIndex}
        setTasks={setTasks}
        setName={setName}
        setDesc={setDesc}
        setUpdateForm={setUpdateForm}
        setData={setData}
      />
    </>
  );
};

export default ToDoList;
