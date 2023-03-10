import {Link,useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {db, globalAuth} from "../config/firebase";
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, query, where, addDoc,setDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { TaskCard } from './TaskCard';

export const Sprint = () => {
    const {sprint_name} = useParams();
    const [sprintName] = useState("");
    const [sprintDescription, setSprintDescription] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [stateTasksMap, setStateTasksMap] = useState({});

    const taskCollectionRef = collection(db, "tasks");
    const sprintsCollectionRef = collection(db, "sprints");
    const navigate = useNavigate();


    const addTask = () => {
        navigate("/tasks/new");
    }
      
    const getTasksForSprint = async () => {
        const states_task_map = { "To Do": [],
        "In Progress": [],
        "In Review": [],
        "Blocked": [],
        "Done": []};
        const allTasksData = await getDocs(taskCollectionRef);
        const filteredData = allTasksData.docs.map(doc => {
            let temp = doc.data();
            if (temp.sprint_name === sprint_name) {
                  return  {
                    ...temp, 
                    id: doc.id
                };
        }}).filter(el => typeof(el) !== "undefined");

        console.log(filteredData);

        filteredData.forEach((task) => {
            states_task_map[task.task_state].push(task);
            
        });
        setStateTasksMap(states_task_map);    
    }

    const getSprintInfo = async () => {
        try {
            const sprint_doc_ref =  collection(db, "sprints");
            const sprint_query = query(sprint_doc_ref, where("sprint_name", "==", sprint_name));
            
            const sprint_data = await getDocs(sprint_query);
            sprint_data.docs.forEach(sprint => console.log(" description is " + sprint.sprint_description)) 
            sprint_data.docs.forEach(sprint => setSprintDescription(sprint.data().sprint_description)) 
            
        }catch(exc) {
            console.error("Error while retrieving sprint description"+ exc);
        }

    }

    const callBackToRefresh = () => {
        getTasksForSprint();
    }

    const handleDragOver= (e) => {
        e.preventDefault();
    }

    const handleDrop = async (e, statusDropped) => {

        try {
            let taskId = e.dataTransfer.getData("taskId");
            let taskName = e.dataTransfer.getData("taskName");
            let owner = e.dataTransfer.getData("taskOwner");
            let sprintName= e.dataTransfer.getData("sprintName");
            console.log("Just dropped "+ taskId + " on " +statusDropped);
            const task_doc_ref = await doc(db, "tasks", taskId);
            const updated_task = {
                task_name: taskName,
                task_state: statusDropped,
                owner: owner,
                sprint_name: sprintName
            }
            await setDoc(task_doc_ref, updated_task);
            getTasksForSprint();
        } catch(ex) {
            console.error("An error occurred during drag and drop of task and/or its update "+ex);
        }
    }

    useEffect(() => {
        globalAuth.onAuthStateChanged(user => {
            if (!user) {
              navigate("/login");
            }
        });
        if (!isLoaded) {
            getSprintInfo();
            getTasksForSprint();
            setIsLoaded(true);
        }
    }, [])

    return(
    <>
        <div className="flex flex-col px-10 py-10">
            <div className="py-10 flex flex-row justify-center space-x-5 font-bold">
                <div className="text-lg font-bold">{sprint_name} </div>
                <div className="text-lg font-normal w-auto">{sprintDescription}</div>
            </div>
            <div className="flex flex-row items-start w-auto border-black">
                <div className="flex-auto"></div>
                <button className="px-4 bg-gray-100 w-auto " onClick={addTask}>Add task</button>
            </div>
            <table className="shadow-2xl font-small border-2 border-cyan-50 w-auto">
                <thead className="text-gray-700">
                    <tr>
                        <th className="px-3 py-3 bg-gray-200 text-center">To Do</th>
                        <th className="px-3 py-3 bg-gray-200 text-center">In Progress</th>
                        <th className="px-3 py-3 bg-gray-200 text-center">In Review</th>
                        <th className="px-3 py-3 bg-gray-200 text-center">Blocked</th>
                        <th className="px-3 py-3 bg-gray-200 text-center">Done</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr>
                        <td className="py-3 px-3 text-left" onDragOver={(e)=>handleDragOver(e)} onDrop={(e)=>handleDrop(e, "To Do")}>
                            {
                                stateTasksMap["To Do"] ? stateTasksMap["To Do"].map(task => <TaskCard callBackToRefresh={callBackToRefresh} taskId={task.id} status={task.task_state} taskName={task.task_name} userFirstName={task.owner} sprintName={task.sprint_name} />) : <></>
                            }
                            </td> 
                        <td className="py-3 px-3 text-left" onDragOver={(e)=>handleDragOver(e)} onDrop={(e)=>handleDrop(e, "In Progress")} >
                        {
                                stateTasksMap["In Progress"] ? stateTasksMap["In Progress"].map(task => <TaskCard callBackToRefresh={callBackToRefresh} taskId={task.id} status={task.task_state} taskName={task.task_name} userFirstName={task.owner} sprintName={task.sprint_name} />) : <></>
                        }
                        </td>
                        <td className="py-3 px-3 text-left" onDragOver={(e)=>handleDragOver(e)} onDrop={(e)=>handleDrop(e, "In Review")} >
                        {
                                stateTasksMap["In Review"] ? stateTasksMap["In Review"].map(task => <TaskCard callBackToRefresh={callBackToRefresh} taskId={task.id} status={task.task_state} taskName={task.task_name} userFirstName={task.owner} sprintName={task.sprint_name} />) : <></>
                        }   
                        </td>   
                        <td className="py-3 px-3 text-left" onDragOver={(e)=>handleDragOver(e)} onDrop={(e)=>handleDrop(e, "Blocked")}>
                        {
                                stateTasksMap["Blocked"] ? stateTasksMap["Blocked"].map(task => <TaskCard callBackToRefresh={callBackToRefresh} taskId={task.id} status={task.task_state} taskName={task.task_name} userFirstName={task.owner} sprintName={task.sprint_name} />) : <></>
                        }
                        </td>  
                        <td className="py-3 px-3 text-left" onDragOver={(e)=>handleDragOver(e)} onDrop={(e)=>handleDrop(e, "Done")}>
                        {
                                stateTasksMap["Done"] ? stateTasksMap["Done"].map(task => <TaskCard callBackToRefresh={callBackToRefresh} taskId={task.id} status={task.task_state} taskName={task.task_name} userFirstName={task.owner} sprintName={task.sprint_name} />)  : <></>
                        }
                        </td>      
                    </tr>
                </tbody>
            </table>
        </div>
    </>)
}