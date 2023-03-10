
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {db, globalAuth} from "../config/firebase";
import * as firebase from "firebase/app";
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, addDoc,deleteDoc, doc } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export const  Tasks = () => {

    const [taskList, setTaskList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [uiTasks,  setUITasks] = useState([]);

    const taskCollectionRef = collection(db, "tasks");
    const userCollectionRef = collection(db, "users");
    const navigate = useNavigate();
  
    const addTask = () => {
      navigate("/tasks/new");
    }
    
    const getTaskList = async () => {
        try {
          const data = await getDocs(taskCollectionRef);
          const filteredData = data.docs.map(doc => ({
            ...doc.data(), 
            id: doc.id
          }));
          
          setTaskList(filteredData);
          prepareTaskListForUI();
      
        } catch(err) {
          console.error(err);
        }
      }
      
    const prepareTaskListForUI = async () => {
        const tasks = [];
        taskList.forEach(task => {
            const assigned_user = userList.filter((val, idx) => 
            { 
              return    val.user_name === task.owner
            }
            );
            tasks.push({
                task_name: task.task_name,
                owner: assigned_user ? assigned_user[0].first_name : "unknown_user",
                task_link: `/tasks/${task.id}`,
                task_state: task.task_state,
                task_sprint: task.sprint_name,
                sprint_link: `/sprints/${task.sprint_name}`
            })
        });
        setUITasks(tasks);
        
    }

    const getUserList = async () => {
      try {
        const data = await getDocs(userCollectionRef);
        const filtered_data = data.docs.map(doc => ({
          ...doc.data(),
        }));
        
        setUserList(filtered_data);
        
        
      } catch(e) {
        console.error(e);
      }
    }
    
    useEffect(()=> {
      globalAuth.onAuthStateChanged(user => {
        if (!user) {
          navigate("/login");
        }
    });
       
      getTaskList();
      getUserList();
        
    }, [getTaskList, getUserList]);
      
    
    return (
      <>
      <div className="flex flex-col">
        <div className="flex flex-col items-start w-screen border-black">
         <div className="flex-auto"></div>
          <button className="px-4 bg-gray-100 w-auto " onClick={addTask}>Add task</button>
      </div>
    <div className="flex w-auto py-5 border-black">
      <table className="shadow-sm font-medium border-2 border-cyan-50 w-screen">
        <thead className="text-gray-700">
          <tr>
          <th className="py-3 bg-gray-200 text-left px-4 w-auto">Task name</th>
          <th className="py-3 bg-gray-200 text-left px-4 w-auto">Owner</th>
          <th className="py-3 bg-gray-200 text-left px-4 w-auto">Status</th>
          <th className="py-3 bg-gray-200 text-left px-4 w-auto">Sprint</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {
            uiTasks.map((task)=>(
              <tr className="hover:bg-cyan-400 hover:scale-100">
                  <td className="py-3 px-6 text-left text-blue-600 w-auto"><Link to={task.task_link}>{task.task_name}</Link></td> 
                  <td className="py-3 px-6 text-left w-auto">{task.owner}</td>
                  <td className="py-3 px-6 text-left w-auto">{task.task_state}</td>   
                  <td className="py-3 px-6 text-left w-auto"><Link to={task.sprint_link}>{task.task_sprint}</Link></td>      
            </tr>))
          }
        </tbody>
        </table>
    </div>
    </div>
    </>)
}



