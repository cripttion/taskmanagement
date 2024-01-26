import React, { useState, useEffect } from "react";
import { useLoginContext } from "../../states/UserLoginContext";
import axios from "axios";
import { useUserContext } from "../../states/UserDataContext";
import AddTask from "../../components/AddTask";
import { Clock } from "lucide-react";
import TaskAction from "../../components/TaskAction";
export const Home = () => {
  const { authenticationKey } = useLoginContext();
  const [data, setData] = useState([]);
  const { userData } = useUserContext();
   const [taskUpdateData, setTaskUpdateData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [isUpdate, setIsUpdate] = useState(
    data && data?.Task ? Array(data.Task.length).fill(false) : []
  );
  useEffect(() => {
    getData();
  }, []);
  const userID = sessionStorage.getItem("userId");
  const getData = async () => {
    try {
      const response = await axios.get(`/api/all/${userID}`, {
        withCredentials: true, // Include credentials (cookies) in the request
        headers: {
          "Content-Type": "application/json",
          // You can include other headers if needed
        },
      });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log("Internal server error");
    }
  };
  const handleAddTask = () => {
   
    getData();
  };
  const handleUpdateClick = async(index) => {
    try{
        const response = await axios.put(`/api/updateTask/${userID}/${index}`,taskUpdateData,{
            withCredentials: true, // Include credentials (cookies) in the request
        headers: {
          "Content-Type": "application/json",
        },
        });
        if(response.status===200)
        {
            alert('Task updated Successfully');
        }
        const updatedIsUpdate = [...isUpdate];
        updatedIsUpdate[index] = false;
        setIsUpdate(updatedIsUpdate);
        setTaskUpdateData({
          title:'',
          description:'',
          dueDate:''  
        })
    }catch(error)
    {
        alert("Unable to Update the Task");
    }
    getData();
  };
  const handleDeleteClick = () => {
    getData();
  };

 
  const isUpdateClicked = (data, index,task) => {
    const updatedIsUpdate = [...isUpdate];
    updatedIsUpdate[index] = data;
    setIsUpdate(updatedIsUpdate);
    setTaskUpdateData({
        title: task.Title,
        description: task.Description,
        dueDate: task.DueData,
      });
  };
  //  console.log(data);
  const onUpdateChange = (e, data) => {
 
    const { name, value } = e.target;
    setTaskUpdateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(taskUpdateData);
  return (
    <div className="pb-10">
      <AddTask addTask={handleAddTask} />
      <div>
        <div className=" flex flex-wrap gap-10  mx-2 lg:flex-row justify-around  mt-20">
          {data &&
            data?.Task?.map((task, index) => (
              <div className=" relative flex flex-col gap-5 bg-white lg:w-2/6 w-full upcard p-4">
                {isUpdate[index] ? (
                  <input
                    className="p-3  w-5/6 border"
                    placeholder={task.Title}
                    value={taskUpdateData.title}
                    name="title"
                    onChange={(e) => onUpdateChange(e, task)}
                  />
                ) : (
                  <div className="text-left lg:text-3xl text-normal text-blue-800 font-medium">
                    {task.Title}
                  </div>
                )}
                <div className="bg-blue-800" style={{ height: "1px" }}></div>
                {isUpdate[index] ? (
                  <textarea
                    rows={1}
                    type="text"
                    placeholder={task.Description}
                    className="border outline-none w-full p-4 mx-4 upcard"
                    onChange={(e) => onUpdateChange(e, task)}
                    name="description"
                    value={taskUpdateData.description}
                  />
                ) : (
                  <div className="text-justify text-lg lg:text-xl">
                    {task.Description}
                  </div>
                )}
                <div className="flex flex-row justify-between w-full gap-4 items-center">
                  <div className="bg-red-200 p-2 rounded-full">
                    <p>Due Date</p>
                  </div>
                  <div className="flex flex-row gap-4 items-center font-medium">
                    <Clock color="blue" />
                    {isUpdate[index] ? (
                      <input
                        type="text"
                        placeholder={task.DueData}
                        className="border outline-none w-full p-4 mx-4 upcard"
                        onChange={(e) => onUpdateChange(e, task)}
                        name="dueDate"
                        value={taskUpdateData.dueDate}
                      />
                    ) : (
                      task.DueData
                    )}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <TaskAction
                    onUpdate={()=>handleUpdateClick(index)}
                    onDelete={handleDeleteClick}
                    index={index}
                    updateClicked={(data) => isUpdateClicked(data, index, task)}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
