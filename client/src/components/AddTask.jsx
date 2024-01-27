import axios from "axios";
import { Plus } from "lucide-react";
import React, { useState } from "react";

function AddTask(props) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleClick = async () => {
    const userId = sessionStorage.getItem("userId");
    try {
      const response = await axios.post(
        `/addTask/${userId}`,
        taskData,
        {
          withCredentials: true, // Include credentials (cookies) in the request
          headers: {
            "Content-Type": "application/json",
            // You can include other headers if needed
          },
        }
      );
      if (response.status === 200) {
        alert("TaskAdded successfully");
        setTaskData({
          title: "",
          description: "",
          dueDate: "",
        });
        props.addTask();
      } else {
        alert("Unable to dd task");
      }
    } catch (error) {
      alert("unable to add Task");
    }
  };
  return (
    <div className="w-full flex flex-row items-center justify-center">
      <div className="flex flex-col md:flex-row lg:flex-row  lg:w-5/6 mt-10 gap-5 items-center justify-center">
        <input
          type="text"
          placeholder="Your task"
          className="border outline-none w-full p-4 mx-4 upcard "
          onChange={handleInput}
          name="title"
          value={taskData.title}
        />
        <textarea
          rows={1}
          type="text"
          placeholder="Task description"
          className="border outline-none w-full p-4 mx-4 upcard"
          onChange={handleInput}
          name="description"
          value={taskData.description}
        />
        <input
          type="text"
          placeholder="Due date ( dd-mm-yyyy )"
          className="border outline-none w-full p-4 mx-4 upcard"
          onChange={handleInput}
          name="dueDate"
          value={taskData.dueDate}
        />

        <button
          className="bg-blue-800 p-4 text-white upcard rounded-full "
          onClick={handleClick}
        >
          <Plus />
        </button>
      </div>
    </div>
  );
}

export default AddTask;
