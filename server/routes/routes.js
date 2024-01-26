const express = require('express');
const router = express.Router();

const User = require('./../model/user');

router.get('/all/:userId',async(req,res)=>{
    const userId= req.params.userId;
    try{
       const response = await User.findOne({UserID:userId});
       if(!response)
       {
        return res.status(401).json({message:'unable to get the data'});
       }
       res.status(200).json(response);
    }catch(error)
    {
        console.log("Error occured from server",error);
    }
})




//route to add the Task 
router.post('/addTask/:userId',async(req,res)=>{
  const userId = req.params.userId;
  const {title,description,dueDate} = req.body;
  try{
       const response = await User.findOne({UserID:userId});
       if(!response)
       {
        return res.status(401).json({message:'unable to identify the user'});

       }
       const task= {
        Title:title,
        Description:description,
        DueData:dueDate
       }
      response.Task.push(task);
       await response.save();
       res.status(200).json({message:"Task added successfully"});
  }catch(error)
  {
    res.status(501).json({message:'Internal server Error while adding Task'});
    console.log(error);
  }
})


router.get('/deletetask',async(req,res)=>{
   const userId = req.query.userId;
   const index = req.query.index;

   try {
     const response = await User.findOne({UserID:userId});
     if(!response)
     {
      return res.status(501).json({message:"User not found"});

     }
     response.Task.splice(index,1);
     await response.save();
     res.status(200).json({message:'Task deleted successfully'});
   } catch (error) {
    
   }
})



router.put('/updateTask/:userId/:index', async (req, res) => {
  const userID = req.params.userId;
  const index = req.params.index;
  const { title, description, dueDate } = req.body;

  try {
    const tempdata = {
      Title: title,
      Description: description,
      DueData: dueDate,
    };

    const response = await User.findOne({ UserID: userID });

    if (!response) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the task at the specified index
    response.Task[index] = tempdata;

    // Save the updated user document
    await response.save();

    res.status(200).json({ message: 'Task data updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});































module.exports = router;