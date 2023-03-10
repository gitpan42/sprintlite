import { useEffect, useState } from 'react';
import {Link, useParams, useSearchParams} from 'react-router-dom';
import {db, globalAuth} from "../config/firebase";
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, addDoc,setDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';


export const Task = () => {
    const navigate = useNavigate();
    const { task_id } = useParams();
    const [cardTitle, setCardTitle ] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskOwner, setTaskOwner] = useState("");
    const [sprintName, setSprintName] = useState("");
    const [taskState, setTaskState] = useState("");
    const [users, setUsers] = useState([]);
    const [sprints, setSprints] = useState([]);
    const [states, setStates] = useState([]);

    const taskCollectionRef = collection(db, "tasks");
    const userCollectionRef = collection(db, "users");
    const sprintsCollectionsRef = collection(db, "sprints");
    const statesCollectionsRef = collection(db, "states");
    
    const getRelatedData = async () => {
        console.log("in get related data");
        const states_data = await getDocs(statesCollectionsRef);
        const sprints_data = await getDocs(sprintsCollectionsRef);
        const users_data = await getDocs(userCollectionRef);

        const users = users_data.docs.map(user => ({
            ...user.data()
        }));
        const states = states_data.docs.map(state => ({
            ...state.data()
        }));
        const sprints = sprints_data.docs.map((sprint)=> ({
            ...sprint.data()
        }));
        setUsers(users);
        setStates(states);
        setSprints(sprints);
        if (task_id === "new") {
            setSprintName(sprints[0].sprint_name);
            setTaskOwner(users[0].user_name);
            setTaskState("To Do");
        }
    }

    const getTask = async (taskId) => {
        console.log("in get task");
        const task_doc_ref = await doc(db, "tasks", taskId);
        const task_data = await getDoc(task_doc_ref);
        const task = task_data.data();

        setTaskName(task.task_name);
        setTaskOwner(task.owner);
        setTaskState(task.task_state);
        setSprintName(task.sprint_name);
    }

    const saveTask = async () => {
        console.log("here in save task");

            if(task_id != "new") {
                const task_doc_ref = await doc(db, "tasks", task_id);
                const updated_task = {
                    task_name: taskName,
                    owner: taskOwner,
                    task_state: taskState,
                    sprint_name: sprintName
                }
                console.log('trying to save existing task');
                await setDoc(task_doc_ref, updated_task)
                navigate("/tasks");
            
            } else {
                await addDoc(taskCollectionRef, {task_name: taskName,  owner: taskOwner, task_state: taskState, sprint_name: sprintName});
                navigate("/tasks");
            }
        
    }

    
    
    useEffect(() => {

        globalAuth.onAuthStateChanged(user => {
            if (!user) {
              navigate("/login");
            }
        });
        getRelatedData();
        console.log('in use effect');
        if (task_id != "new") {
            setCardTitle("Edit task");
            getTask(task_id);
        } else {
            setCardTitle("Add task");
        }
    }, []);
    return(<div className="flex flex-col justify-between h-screen px-5 py-5"> 
    <p>{cardTitle}</p>
    <div className="bg-white border-red-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-80">
        <div className="mb-4 w-80">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Task :
            </label> 
            <input  className="border: solid 10px" value={taskName} onChange={(e)=>setTaskName(e.target.value)} />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Owner
            </label>
            <select key="userList" value={taskOwner} onChange={(e)=>setTaskOwner(e.target.value)}>
                {users.map( (user) => (
                <option key={user.user_name} value={user.user_name}>{user.first_name}</option>
              ))}
            </select>
        </div>
        <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Status
                </label>
                <select key="stateList" value={taskState} onChange={(e)=> {console.log("changing state" + e.target.value); setTaskState(e.target.value); }}>
                    {states.map( (state) => (
                    <option key={state.state_name} value={state.state_name}>{state.state_name}</option>
                    ))}
                </select>
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
                Sprint 
            </label>
            <select key="sprintsList" defaultValue={sprintName} onChange={(e)=>setSprintName(e.target.value)}>
                {sprints.map( (sprint) => (
                <option key={sprint.sprint_name} value={sprint.sprint_name}>{sprint.sprint_name}</option>
                ))}
            </select>
        </div>
        <div className="mb-6">
            <button type="submit" onClick={saveTask} className="bg-green-400 w-11/12">Save</button>
        </div>
    </div>
    <Link to="/tasks">Back to tasks</Link>
    </div>)
}