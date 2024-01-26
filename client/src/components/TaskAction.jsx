import axios from 'axios';
import { PenBoxIcon, Save, Trash2Icon } from 'lucide-react'
import React,{useState} from 'react'

function TaskAction({onUpdate,onDelete,index,updateClicked}) {
   const userId = sessionStorage.getItem('userId');
    
  const[updateButtonClicked,setUpdateButtonClicked] = useState(false);
  const isUpdateClick =()=>{
        setUpdateButtonClicked(!updateButtonClicked);
        updateClicked(true);
  }
  const handleDeleteClick = async()=>{
     try{
        const response = await axios.get(`http://localhost:5000/deletetask?userId=${userId}&index=${index}`,{
            withCredentials: true, // Include credentials (cookies) in the request
        headers: {
          "Content-Type": "application/json",
        }});
        if(response.status===200)
        {
            alert("Task deleted successfullly");
        }
        onDelete();
    }catch(error)
     {
        alert('unable to delete the the Task');
     }
  }
  const handleSaveClick = ()=>{
    setUpdateButtonClicked(false);
    onUpdate();
  }
  return (
    <div>
        <div className='flex flex-row gap-4'>
           <button >{!updateButtonClicked?<PenBoxIcon color='green' onClick={isUpdateClick}/>:<Save color='blue' onClick={handleSaveClick}/>}</button> 
            <button onClick={handleDeleteClick}><Trash2Icon color='red' /></button>
        </div>
    </div>
  )
}

export default TaskAction