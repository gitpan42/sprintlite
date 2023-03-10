

import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import {db, globalAuth} from "../config/firebase";
import * as firebase from "firebase/app";
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, addDoc,deleteDoc, doc } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export const Sprints = () => {

    const [taskList, setTaskList] = useState([]);
    const [userList, setUserList] = useState([]);
    const [uiTasks,  setUITasks] = useState([]);
    const [sprintsList, setSprintsList] = useState([]);

    
    const sprintCollectionRef = collection(db, "sprints");
    const taskCollectionRef = collection(db, "tasks");
    const navigate = useNavigate();

    const getSprintsList = async () => {
        try {
          const data = await getDocs(sprintCollectionRef);
          const filteredData = data.docs.map(doc => ({
            ...doc.data(), 
            id: doc.id,
            sprint_link: `/sprints/${doc.data().sprint_name}`
          }));
          
          setSprintsList(filteredData);

          
      
        } catch(err) {
          console.error(err);
        }
     }

      
    useEffect(()=> {
        globalAuth.onAuthStateChanged(user => {
          if (!user) {
            navigate("/login");
          }
      });
         getSprintsList();
          
      }, []);
        
      
  
    return   (
    <>
        <div className="flex flex-col">
            <div className="flex w-auto py-5 border-black">
                <table className="shadow-sm font-medium border-2 border-cyan-50 w-screen">
                    <thead className="text-gray-700">
                        <tr>
                            <th className="py-3 bg-gray-200 text-left px-4 w-auto">Sprint name</th>
                            <th className="py-3 bg-gray-200 text-left px-4 w-auto">Sprint description</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                        sprintsList.map((sprint)=>(
                            <tr className="hover:bg-cyan-400 hover:scale-100">
                                <td className="py-3 px-6 text-left text-blue-600 w-auto"><Link to={sprint.sprint_link}>{sprint.sprint_name}</Link></td> 
                                <td className="py-3 px-6 text-left w-auto">{sprint.sprint_description}</td>
                        </tr>))
                        }
                    </tbody>
                </table>
            </div>
      </div>
    </>)
}



